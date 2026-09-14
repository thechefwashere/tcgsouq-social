-- 0001_capture_layer.sql
-- PokéSouq hub — capture layer.
--
-- Purpose: start archiving perishable data now, before the publishing tool exists.
-- Three things cannot be recovered later and are the reason this runs early:
--   1. WhatsApp delivered/read receipts — the basis of the only causal inference available here.
--   2. Instagram Story insights — 24 hours and gone.
--   3. Store open/closed state — nothing records it, and its absence already caused one
--      wrong reading of the store's own numbers (see docs/social-hub/BASELINE-2026-09-14.md).
--
-- Conventions, all deliberate:
--   * Every instant is timestamptz. Never a wall-clock string. Where local time is meaningful,
--     an IANA zone is stored alongside it.
--   * Metrics are SNAPSHOTS, not facts. A post's reach grows for days; rows carry captured_at
--     and we keep the series rather than overwriting.
--   * Upserts are keyed on natural keys so a re-run repairs rather than duplicates.
--   * Secrets are never stored here. Connections hold a REFERENCE to where the secret lives.

create extension if not exists btree_gist;

-- ---------------------------------------------------------------------------
-- Accounts: the tool targets accounts, never platforms. A second Instagram is a row.
-- ---------------------------------------------------------------------------

create table accounts (
  id            bigint generated always as identity primary key,
  platform      text not null check (platform in (
                  'instagram','facebook','threads','tiktok','youtube','x',
                  'snapchat','google_business','fairdrop','whatsapp','shopify','blog')),
  handle        text not null,                 -- @pokesouq, channel name, WABA number
  external_id   text,                          -- platform's own id once known
  display_name  text,
  is_active     boolean not null default true,
  -- Brand profile lives here rather than globally: voice, pillar mix, template set.
  -- Deliberately jsonb — it is not yet earned as columns.
  brand_profile jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  unique (platform, handle)
);

comment on table accounts is
  'One row per connected account. Snorbasaur, when it exists, is a row — not a schema change.';

-- Credential *pointers*. The secret itself lives in the host environment, never in Postgres.
create table connections (
  id             bigint generated always as identity primary key,
  account_id     bigint not null references accounts(id) on delete cascade,
  secret_ref     text not null,                -- e.g. 'env:IG_TOKEN', 'vault:wati/readonly'
  scopes         text[],
  expires_at     timestamptz,                  -- IG long-lived 60d, Threads 60d, TikTok ~24h
  last_ok_at     timestamptz,
  last_error     text,
  status         text not null default 'unknown'
                   check (status in ('ok','expiring','expired','error','unknown')),
  unique (account_id, secret_ref)
);

comment on column connections.expires_at is
  'Drives the re-auth alert. Threads tokens expire permanently if unused for 60 days.';

-- ---------------------------------------------------------------------------
-- Store state — the series that did not exist, and without which every chart lies.
-- ---------------------------------------------------------------------------

create table store_state (
  id         bigint generated always as identity primary key,
  state      text not null check (state in ('open','password','maintenance','partial_stockout')),
  during     tstzrange not null,
  note       text,
  created_at timestamptz not null default now(),
  -- Two states cannot overlap; an open range (upper null) means "still in this state".
  exclude using gist (during with &&)
);

comment on table store_state is
  'Password-only periods, planned closures, category-wide stock-outs. Analyses must EXCLUDE
   these ranges rather than average through them.';

-- Known history. 17 Jul – 7 Sep 2026 the storefront was password-protected except two days.
insert into store_state (state, during, note) values
  ('password',
   tstzrange('2026-07-17 00:00+04', '2026-09-07 00:00+04', '[)'),
   'Storefront password-protected. Opened on two days at random; exact dates not recorded. '
   'Owner-reported 14 Sep 2026. Do not read July-September trading figures as demand.'),
  ('open',
   tstzrange('2026-09-07 00:00+04', null, '[)'),
   'Reopened.');

-- ---------------------------------------------------------------------------
-- Shopify — daily rollups. Cheap, and the primary success metric lives here.
-- ---------------------------------------------------------------------------

create table shopify_daily (
  day                    date primary key,
  sessions               integer,
  orders                 integer,
  new_customers          integer,
  returning_customers    integer,
  total_sales            numeric(12,2),
  average_order_value    numeric(12,2),
  conversion_rate        numeric(8,6),
  currency               text not null default 'AED',
  captured_at            timestamptz not null default now()
);

comment on table shopify_daily is
  'new_customers is the primary success metric for the social tool. Post-level revenue
   attribution is structurally impossible; this is not.';

create table shopify_referrer_daily (
  day              date not null,
  referrer_source  text not null,     -- direct | search | social | email | paid | unknown
  sessions         integer,
  orders           integer,
  total_sales      numeric(12,2),
  captured_at      timestamptz not null default now(),
  primary key (day, referrer_source)
);

comment on table shopify_referrer_daily is
  'Last-non-direct attribution. The social row is a FLOOR, not a measurement — customers
   see a post and arrive direct, so influence lands in the direct bucket.';

-- Orders, minimal, for the WhatsApp inference join. Not a replica of Shopify.
create table orders (
  shopify_order_id   bigint primary key,
  shopify_customer_id bigint,
  phone_e164         text,
  placed_at          timestamptz not null,
  total              numeric(12,2),
  currency           text not null default 'AED',
  is_first_order     boolean,
  captured_at        timestamptz not null default now()
);

create index on orders (phone_e164, placed_at);
create index on orders (placed_at);

-- ---------------------------------------------------------------------------
-- Social post metrics — snapshots over time, never overwritten.
-- ---------------------------------------------------------------------------

create table platform_posts (
  id             bigint generated always as identity primary key,
  account_id     bigint not null references accounts(id) on delete cascade,
  external_id    text not null,            -- IG media id, YouTube video id, TikTok video id
  permalink      text,
  media_type     text,                     -- IMAGE | CAROUSEL | REELS | STORY | SHORT | TEXT
  caption        text,
  published_at   timestamptz,
  -- Populated when the hub itself published it; null for posts we merely observe.
  hub_post_id    bigint,
  captured_at    timestamptz not null default now(),
  unique (account_id, external_id)
);

create table post_metrics (
  id                  bigint generated always as identity primary key,
  platform_post_id    bigint not null references platform_posts(id) on delete cascade,
  captured_at         timestamptz not null default now(),
  reach               integer,
  impressions         integer,
  likes               integer,
  comments            integer,
  saves               integer,
  shares              integer,
  -- The two that actually matter for growth, per the measurement audit.
  non_follower_reach  integer,
  profile_visits      integer,
  link_clicks         integer,
  video_views         integer,
  avg_watch_seconds   numeric(10,3),
  extra               jsonb not null default '{}'::jsonb,
  unique (platform_post_id, captured_at)
);

comment on table post_metrics is
  'Snapshots. Reach grows for days after publish, so the series matters, not a final value.
   Compare saves and shares as RATIOS of reach — reach variance is the dominant noise term.';

create table account_metrics_daily (
  account_id    bigint not null references accounts(id) on delete cascade,
  day           date not null,
  followers     integer,
  follows_gained integer,
  follows_lost  integer,
  reach         integer,
  profile_views integer,
  extra         jsonb not null default '{}'::jsonb,
  captured_at   timestamptz not null default now(),
  primary key (account_id, day)
);

-- ---------------------------------------------------------------------------
-- WhatsApp — the only channel where influence can be inferred rather than guessed.
-- ---------------------------------------------------------------------------

-- E.164, digits only with leading +. The canonical join key to Shopify customers.
create table wa_contacts (
  phone_e164    text primary key check (phone_e164 ~ '^\+[1-9][0-9]{7,14}$'),
  wati_id       text,
  display_name  text,
  attributes    jsonb not null default '{}'::jsonb,
  first_seen_at timestamptz,
  last_seen_at  timestamptz,
  captured_at   timestamptz not null default now()
);

create table wa_broadcasts (
  id              text primary key,          -- Wati broadcast/campaign id
  name            text,
  template_name   text,
  started_at      timestamptz,
  total_sent      integer,
  total_delivered integer,
  total_read      integer,
  total_replied   integer,
  total_failed    integer,
  captured_at     timestamptz not null default now()
);

-- The inference table. One row per message per recipient, with the four timestamps.
create table wa_messages (
  id             text primary key,           -- provider message id
  phone_e164     text not null references wa_contacts(phone_e164),
  broadcast_id   text references wa_broadcasts(id),
  template_name  text,
  direction      text not null check (direction in ('outbound','inbound')),
  sent_at        timestamptz,
  delivered_at   timestamptz,
  read_at        timestamptz,
  failed_at      timestamptz,
  failure_reason text,
  captured_at    timestamptz not null default now()
);

create index on wa_messages (phone_e164, sent_at);
create index on wa_messages (broadcast_id);
create index on wa_messages (read_at) where read_at is not null;

comment on table wa_messages is
  'The causal instrument. Read-versus-delivered-unread within one broadcast is close to a
   natural control group: same list, same message, same moment, one group opened it.';

-- Append-only. A legal artefact under UAE PDPL — never updated, never deleted.
create table consent_events (
  id           bigint generated always as identity primary key,
  phone_e164   text not null,
  event        text not null check (event in ('opt_in','opt_out','verified')),
  source       text not null,               -- 'wati_import' | 'checkout' | 'whatsapp_reply' | ...
  occurred_at  timestamptz not null,
  evidence     jsonb not null default '{}'::jsonb,
  recorded_at  timestamptz not null default now()
);

create index on consent_events (phone_e164, occurred_at);

comment on table consent_events is
  'Append-only. Consent records exist in Wati alone today, with no export tooling anywhere,
   and Wati goes away before its August 2027 renewal. This is where they land.';

-- Links a WhatsApp identity to a Shopify customer. Phone is the key; confidence is recorded
-- because normalisation is not always unambiguous.
create table identity_links (
  phone_e164          text not null,
  shopify_customer_id bigint not null,
  confidence          text not null default 'exact'
                        check (confidence in ('exact','normalised','manual','uncertain')),
  linked_at           timestamptz not null default now(),
  primary key (phone_e164, shopify_customer_id)
);

-- ---------------------------------------------------------------------------
-- Ingestion bookkeeping — so a silent failure is visible.
-- ---------------------------------------------------------------------------

create table ingest_runs (
  id           bigint generated always as identity primary key,
  source       text not null,              -- 'shopify_daily' | 'wati_messages' | 'ig_insights'
  started_at   timestamptz not null default now(),
  finished_at  timestamptz,
  status       text not null default 'running'
                 check (status in ('running','ok','partial','failed')),
  rows_written integer,
  cursor       text,                       -- resume point for paginated sources
  error        text
);

create index on ingest_runs (source, started_at desc);

comment on table ingest_runs is
  'Every job writes a row. FairDrop taught the lesson: failures get swallowed and converted
   into plausible-looking data. A source with no recent ok row is broken, not quiet.';

-- ---------------------------------------------------------------------------
-- Helper: trading days only. Every analysis should read through this, not shopify_daily.
-- ---------------------------------------------------------------------------

create view shopify_daily_trading as
select d.*
from shopify_daily d
where not exists (
  select 1 from store_state s
  where s.state <> 'open'
    and s.during @> (d.day::timestamptz + interval '12 hours')
);

comment on view shopify_daily_trading is
  'shopify_daily with closed periods removed. Use this for any trend, average or baseline.';

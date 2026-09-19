-- 0002_ops_hub.sql
-- PokéSouq hub — the operational layer: what exists, what it is connected to, and what
-- happened to it. Spec: docs/hub/OPS-HUB.md. Decision: docs/domain/CHARTER.md, D8.
--
-- Deliberately small. 0001 already models accounts, credential pointers, store state, job
-- history and the trading view; this adds only what has nowhere to live yet — the projects
-- themselves, a general timeline, recorded deviations, and what each session did.
--
-- Conventions inherited from 0001 and kept exactly:
--   * Every instant is timestamptz; every interval is a tstzrange.
--   * Natural keys, so a re-run repairs rather than duplicates.
--   * Secrets are NEVER stored here. connections (0001) holds a reference; so does this.

-- ---------------------------------------------------------------------------
-- Projects: the things being built and run. 0001 models accounts and data; nothing
-- modelled the work itself, which is what the owner actually checks on a phone.
-- ---------------------------------------------------------------------------

create table projects (
  id          bigint generated always as identity primary key,
  slug        text not null unique,
  name        text not null,
  kind        text not null check (kind in ('store','app','service','data','integration','infrastructure')),
  status      text not null check (status in ('live','building','scoping','dormant','retired')),
  repo        text,                         -- owner/name on GitHub, null where there is none
  url         text,                         -- where it runs, if it runs
  summary     text not null,
  blocked_on  text,                         -- the single thing standing in its way, if any
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table projects is
  'One row per thing being built or run. status is what it IS, blocked_on is what it WAITS ON —
   keeping them separate stops "building" from silently meaning "stalled".';

-- ---------------------------------------------------------------------------
-- Which project uses which credential. The map, not the keys.
-- ---------------------------------------------------------------------------

create table project_connections (
  project_id      bigint not null references projects(id) on delete cascade,
  connection_id   bigint not null references connections(id) on delete cascade,
  intended_access text not null check (intended_access in ('read','write')),
  note            text,
  primary key (project_id, connection_id)
);

comment on table project_connections is
  'Intended access, so observed scopes can be compared against it. A hub holding finance-shaped
   scopes is visible here as a difference rather than as folklore.';

-- ---------------------------------------------------------------------------
-- Timeline. store_state (0001) already covers open/closed as intervals; this covers
-- everything else, including work not yet done.
-- ---------------------------------------------------------------------------

create table events (
  id         bigint generated always as identity primary key,
  during     tstzrange not null,           -- a point is an empty-ish range: [t, t]
  kind       text not null check (kind in ('milestone','launch','incident','decision','planned')),
  title      text not null,
  detail     text,
  project_id bigint references projects(id) on delete set null,
  source     text,                          -- where the date came from; 'owner' is a valid answer
  created_at timestamptz not null default now()
);

create index on events using gist (during);
create index on events (kind);

comment on table events is
  'Milestones, launches, incidents, decisions and planned work. Deliberately NOT store open/closed —
   that lives in store_state, and the timeline view unions the two rather than copying.';

comment on column events.source is
  'How the date is known. An owner-recalled date is legitimate and should say so, because a
   remembered date and a queried one deserve different confidence.';

-- ---------------------------------------------------------------------------
-- Deviations: where practice knowingly differs from a recorded rule.
-- ---------------------------------------------------------------------------

create table deviations (
  id            bigint generated always as identity primary key,
  rule          text not null,              -- 'D7', 'R4', ...
  project_id    bigint references projects(id) on delete set null,
  connection_id bigint references connections(id) on delete set null,
  what          text not null,
  why           text not null,
  mitigations   text,
  fix           text not null,              -- what closing it looks like
  opened_at     timestamptz not null default now(),
  closed_at     timestamptz
);

comment on table deviations is
  'A deviation nobody wrote down is how the OTO token uncertainty happened. Recording it with
   its reason and its fix keeps it visible until it is closed, rather than until it is forgotten.';

-- ---------------------------------------------------------------------------
-- What a session did. The other half of the docs/database split: docs hold decisions and
-- change by PR; this holds state and changes constantly.
-- ---------------------------------------------------------------------------

create table session_log (
  id         bigint generated always as identity primary key,
  session_id text,
  at         timestamptz not null default now(),
  project_id bigint references projects(id) on delete set null,
  kind       text not null check (kind in ('change','finding','decision','deferral')),
  summary    text not null,
  refs       text[]                          -- PR urls, commit shas, doc paths
);

create index on session_log (at desc);

comment on table session_log is
  'One row per meaningful thing a session did. Not a transcript — what changed and where to look.
   Written so the next session does not have to re-read a conversation to find the state.';

-- ---------------------------------------------------------------------------
-- The timeline as one shape, so store state appears without being duplicated.
-- ---------------------------------------------------------------------------

create view timeline as
  select 'event'::text as source_table, e.id, e.during, e.kind, e.title, e.detail, e.project_id
    from events e
  union all
  select 'store_state', s.id, s.during, 'store_state', s.state, s.note, null::bigint
    from store_state s;

comment on view timeline is
  'Read this, not events, for anything chronological. store_state rows are the most valuable
   series in the database and must never be absent from a chart of what happened.';

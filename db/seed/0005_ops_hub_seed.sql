-- 0005_ops_hub_seed.sql
-- Seeds the ops layer with what is already known and verified. Idempotent: re-running
-- repairs rather than duplicates.
--
-- Deliberately incomplete. Dates that exist only in the owner's memory — the first Korean
-- product, the first 100k, when the business became profitable, when Instagram advertising
-- was switched off — are NOT here, because a guessed milestone is worse than a missing one.
-- They need an interview; see docs/hub/OPS-HUB.md §10. The store's own launch date is absent
-- for the same reason: pokesouq.com was registered 2021-06-14, which is not the same fact.

insert into projects (slug, name, kind, status, repo, url, summary, blocked_on) values
  ('pokesouq-store', 'PokéSouq store', 'store', 'live',
   'thechefwashere/tcgsouq-shopify', 'https://pokesouq.com',
   'The Shopify storefront. Stays customer-facing on pokesouq.com until the SEO plan and the trade licence are both ready (charter §1).',
   null),

  ('fairdrop', 'FairDrop', 'app', 'live',
   null, 'https://apps.apple.com/app/id6771429581',
   'Own anti-bot drop app, iOS and Android. Limited and hyped drops happen here only.',
   'Discovery brief unanswered: backend, host, repo, push provider and API are all unknown.'),

  ('packproof', 'PackProof', 'service', 'dormant',
   'thechefwashere/packproof-backend', null,
   'Packing-proof photos from the staff app to a Drive shared folder, via a Node/Express backend.',
   'Railway trial ended and was not upgraded. Nothing live depends on it, so it is a rebuild rather than a migration — straight onto api.tcgsouq.com inside the tcgsouq.com Cloud org.'),

  ('codex', 'TCGSouq Codex', 'data', 'live',
   'thechefwashere/tcgsouq-codex', 'https://tcgsouq-codex.vercel.app',
   'Canonical multi-game card database and the curation pipeline that feeds it. The only service in the family already deployed.',
   null),

  ('curation-legacy', 'Codex curation app (legacy)', 'data', 'retired',
   'thechefwashere/tcgsouq-curation', null,
   'The earlier React curation app on the previous Supabase project. Superseded by the curation app inside tcgsouq-codex.',
   null),

  ('social-hub', 'Social hub', 'service', 'building',
   'thechefwashere/tcgsouq-social', null,
   'Replaces Later.com: create content once, adapt per channel, schedule, publish, measure. Its capture layer has been archiving perishable data since 14 Sep.',
   'Railway service and hub.tcgsouq.com do not exist yet.'),

  ('whatsapp', 'WhatsApp inbox and broadcasts', 'service', 'scoping',
   'thechefwashere/tcgsouq-whatsapp', null,
   'Replaces Wati on Meta''s WhatsApp Cloud API: inbox PWA, templates including carousel, segmented broadcasts, consent.',
   'New business number and the Meta app are not yet obtained.'),

  ('finance', 'Finance automation', 'data', 'scoping',
   'thechefwashere/tcgsouq-finance', null,
   'Bookkeeping automation over Gmail, Drive, Sheets and Shopify. Money data lives in Sheets, never in the repo.',
   'Process not yet designed — the first-session interview has not happened and docs/DECISIONS.md does not exist.'),

  ('domain-identity', 'Domain and identity', 'infrastructure', 'live',
   'thechefwashere/tcgsouq-social', 'https://tcgsouq.com',
   'tcgsouq.com at Porkbun, DNS as code, Google Workspace, and the Cloud organisation the platform identity hangs off.',
   null)
on conflict (slug) do update set
  status = excluded.status, blocked_on = excluded.blocked_on,
  summary = excluded.summary, url = excluded.url, updated_at = now();

-- ---------------------------------------------------------------------------
-- Events. Every date below was verified against a primary source during the work,
-- not recalled: RDAP for the registrations and the transfer, public DNS for the
-- delegation, a received message's headers for mail authentication.
-- ---------------------------------------------------------------------------

insert into events (during, kind, title, detail, project_id, source)
select v.during, v.kind, v.title, v.detail, p.id, v.source
from (values
  (tstzrange('2021-06-14 11:33+00','2021-06-14 11:33+00','[]'), 'milestone',
   'pokesouq.com registered', 'Registry creation date. Not the store''s launch date, which is not yet recorded.',
   'pokesouq-store', 'RDAP'),

  (tstzrange('2025-03-27 13:41+00','2025-03-27 13:41+00','[]'), 'milestone',
   'tcgsouq.com registered', 'Registry creation date.', 'domain-identity', 'RDAP'),

  (tstzrange('2026-09-14 00:00+04','2026-09-14 00:00+04','[]'), 'launch',
   'Capture layer live', 'Began archiving perishable data — WhatsApp receipts, Instagram Story insights, store state — before the publishing tool exists.',
   'social-hub', 'repo history'),

  (tstzrange('2026-09-17 20:17+00','2026-09-17 20:17+00','[]'), 'milestone',
   'tcgsouq.com transferred to Porkbun', 'Away from Domain.com. Expiry extended to 2036-03-27; registry delete and transfer locks on.',
   'domain-identity', 'RDAP'),

  (tstzrange('2026-09-17 20:55+00','2026-09-17 20:55+00','[]'), 'milestone',
   'DNS delegated to Porkbun', 'Zone came up empty. Confirmed by an NXDOMAIN probe returning an SOA from curitiba.ns.porkbun.com, not merely by a resolver agreeing.',
   'domain-identity', 'public DNS'),

  (tstzrange('2026-09-18 02:08+04','2026-09-18 02:08+04','[]'), 'milestone',
   'Google Workspace live and mail authenticating', 'Bought direct from Google. A message to an external mailbox returned spf=pass, dkim=pass (2048-bit, selector google), dmarc=pass.',
   'domain-identity', 'message headers'),

  (tstzrange('2026-09-18 02:27+04','2026-09-18 02:27+04','[]'), 'milestone',
   'Google Cloud organisation created', 'tcgsouq.com, with admin@tcgsouq.com as Organization Administrator. Projects from this domain now land inside a governable org.',
   'domain-identity', 'Cloud console'),

  (tstzrange('2026-09-19 00:00+04','2026-09-19 00:00+04','[]'), 'decision',
   'Domain charter merged', 'Two domains two jobs, rules R1-R10, decision register D1-D8. The file other repos point at.',
   'domain-identity', 'repo history'),

  (tstzrange('2026-10-01 00:00+04','2026-10-01 00:00+04','[]'), 'planned',
   'Tighten DMARC to p=reject', 'Read the aggregate reports collected at p=none, then climb via p=quarantine. A scheduled routine fires for this.',
   'domain-identity', 'owner'),

  (tstzrange('2026-10-02 00:00+04','2026-10-02 00:00+04','[]'), 'planned',
   'Workspace trial converts to paid', 'Payment method already in place; no action expected.',
   'domain-identity', 'Workspace billing'),

  (tstzrange('2026-11-01 00:00+04','2026-11-01 00:00+04','[]'), 'planned',
   'Verisign .com price rise', 'Deadline for transferring pokesouq.com to Porkbun at the current rate. Deferred by the owner on 18 Sep.',
   'pokesouq-store', 'registrar research')
) as v(during, kind, title, detail, project_slug, source)
left join projects p on p.slug = v.project_slug
where not exists (select 1 from events e where e.title = v.title);

-- ---------------------------------------------------------------------------
-- Known deviations. One, and it is live.
-- ---------------------------------------------------------------------------

insert into deviations (rule, project_id, what, why, mitigations, fix)
select 'D7', p.id,
  'The hub''s capture layer authenticates to Shopify with the Finance Extract token — the same credential the bookkeeping spreadsheet uses.',
  'Shopify no longer permits new admin-created custom apps. That app already held read access to everything, and the alternative was blocking the build on a Dev Dashboard app nobody had yet worked out how to issue. Chosen deliberately with the owner.',
  'The hub''s Shopify client refuses to send any mutation regardless of what the token permits (src/lib/shopify.js), and the token is read-only in practice. Neither is the fix.',
  'Create the Dev Dashboard app for the hub, point SHOPIFY_ADMIN_TOKEN at it, and leave Finance Extract to finance alone.'
from projects p
where p.slug = 'social-hub'
  and not exists (select 1 from deviations d where d.rule = 'D7' and d.closed_at is null);

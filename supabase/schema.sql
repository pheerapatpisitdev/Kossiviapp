-- Supabase / Postgres schema for membership system
-- Assumes Supabase `auth.users` is used for authentication.

-- 1) Plans: monthly / yearly (or more in the future)
create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  code text not null unique, -- e.g. 'monthly', 'yearly'
  name text not null,        -- display name
  price_cents integer not null, -- price in smallest currency unit (e.g. satang)
  currency text not null default 'thb',
  interval text not null check (interval in ('month', 'year')),
  omise_plan_id text,        -- plan id in Omise dashboard
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_timestamp_plans
before update on public.plans
for each row
execute procedure public.set_current_timestamp();


-- 2) Subscriptions: link auth.users to a plan
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null references auth.users (id) on delete cascade,
  plan_id uuid not null references public.plans (id),

  status text not null check (status in ('active', 'canceled', 'past_due', 'incomplete')),

  current_period_start timestamptz,
  current_period_end timestamptz,

  omise_customer_id text,      -- customer id in Omise
  omise_subscription_id text,  -- subscription id in Omise

  canceled_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_subscriptions_user_id
  on public.subscriptions (user_id);

create index if not exists idx_subscriptions_omise_subscription_id
  on public.subscriptions (omise_subscription_id);

create trigger set_timestamp_subscriptions
before update on public.subscriptions
for each row
execute procedure public.set_current_timestamp();


-- 3) Helper view for current active subscription per user
create or replace view public.v_current_subscriptions as
select
  s.*
from public.subscriptions s
where
  s.status = 'active'
  and (s.current_period_end is null or s.current_period_end >= now();


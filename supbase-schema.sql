-- Run this in Supabase SQL Editor. Add products and order schema.
create extension if not exists pgcrypto;
create table if not exists public.products (
 id uuid primary key default gen_random_uuid(),
 name text not null,
 slug text unique,
 description text,
 category text not null check (category in ('Shoes','Bags')),
 price integer not null check (price >= 0),
 sale_price integer,
 image_url text,
 images jsonb not null default '[]'::jsonb,
 variants jsonb not null default '[]'::jsonb,
 is_featured boolean not null default false,
 is_published boolean not null default false,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create table if not exists public.orders (
 id uuid primary key default gen_random_uuid(),
 order_number text unique not null,
 customer_name text not null,
 phone text not null,
 wilaya text,
 commune text,
 address text,
 notes text,
 items jsonb not null,
 total integer not null check (total >= 0),
 status text not null default 'new',
 google_sync_status text not null default 'pending',
 created_at timestamptz not null default now()
);
alter table public.products enable row level security;
alter table public.orders enable row level security;
-- Public can read published products only. Writes should be performed by trusted server/admin.
create policy "Published products are visible" on public.products for select using (is_published = true);
-- No public order read policy. Service role API writes orders server-side.
-- Create a Storage bucket named product-images and configure public read access.

-- Storage setup (run separately if needed):
-- Create a PUBLIC bucket named product-images in Supabase Storage.
-- Keep uploads restricted: only admin API (service role) uploads images.

ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS status text DEFAULT 'new';
ALTER TABLE public.orders ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

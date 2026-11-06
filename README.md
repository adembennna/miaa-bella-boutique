# MIA BELLA BOUTIQUE
Premium fashion storefront starter built with Next.js 14, TypeScript and Tailwind CSS.

## Run locally
1. Install Node.js 20+
2. `npm install`
3. `npm run dev`
4. Open http://localhost:3000

## Current status
This starter includes the branded responsive homepage and sample product cards. Checkout, Supabase inventory/admin, Google Sheets order sync and notifications are not connected yet; they require backend credentials and implementation before production use.

## Phase 3 — Supabase and Google Sheets
- Copy `.env.example` to `.env.local` and fill credentials.
- Run `supabase/schema.sql` in Supabase SQL Editor.
- Install dependencies with `npm install`.
- Configure Google Sheets following `GOOGLE_SHEETS_SETUP.md`.
- Orders submit through `/api/orders`; Supabase is source of truth and Sheets sync is optional.
**Important:** Admin pages are still a UI prototype; production admin authentication and secure CRUD must be implemented before public launch.


## Phase 4 — Admin products (connected)
1. Copy `.env.example` to `.env.local` and fill Supabase URL, anon key, service-role key, and `ADMIN_EMAIL`.
2. In Supabase Authentication, create a user whose email exactly matches `ADMIN_EMAIL`, then set a strong password.
3. Run `supabase/schema.sql` in Supabase SQL Editor.
4. In Storage, create a **public** bucket named `product-images` (public read; uploads are server-side).
5. Run `npm install` then `npm run dev`; open `/admin/login`.
6. Sign in, then Manage products to add products, upload images, publish/hide and delete.

Security notes:
- Service-role key must remain server-only and never use a `NEXT_PUBLIC_` prefix.
- Admin API checks a Supabase access token and the exact `ADMIN_EMAIL` allowlist.
- Orders admin screen is still a local demo; production order management/status updates are a separate remaining step.


## Phase 5 — Real order management
- `/admin/orders` reads orders from Supabase and allows status updates: new, confirmed, preparing, shipped, delivered, cancelled.
- Admin API checks Supabase session token + `ADMIN_EMAIL`.
- Re-run the added SQL lines in `supabase/schema.sql` if your orders table already existed.


## Phase 7 — Deployment
See `DEPLOYMENT_GUIDE.md` for GitHub → Vercel deployment, environment variables, custom domain, and pre-launch checklist.

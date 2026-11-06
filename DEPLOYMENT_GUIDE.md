# Phase 7 — Deploy Mia Bella Boutique

## Important
This project is a Next.js app. You can deploy it to Vercel, but production deployment requires valid Supabase settings and testing first. Do not publish the Supabase service-role key in client code or a public repository.

## A. Prepare environment variables
1. Rename `.env.example` to `.env.local` for local testing.
2. Fill:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server only; never NEXT_PUBLIC)
   - `ADMIN_EMAIL`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits only, international format; Algeria example starts with 213)
   - Google Sheets variables only if you use Sheets.
3. In Supabase, run `supabase/schema.sql`, create a public Storage bucket `product-images`, and create the admin user in Authentication with email matching `ADMIN_EMAIL`.

## B. Deploy on Vercel
1. Create a GitHub repository and upload the project source (not `.env.local`).
2. Sign in at https://vercel.com and choose **Add New → Project**.
3. Import the GitHub repository.
4. In Project → Settings → Environment Variables, add the same variables from `.env.local` (Production, Preview only if needed).
5. Click Deploy. Wait for the build to finish.
6. Open the generated `*.vercel.app` URL and test the store.

## C. Connect a custom domain
1. Buy a domain from a registrar (for example `miabellaboutique.com`, if available).
2. Vercel → Project → Settings → Domains → add your domain.
3. Copy the DNS records Vercel shows into the domain registrar's DNS settings. Do not guess the records.
4. Wait until Vercel verifies the domain and SSL is active.

## D. Before accepting real orders
- Test checkout with a test order and confirm it appears in Supabase.
- Confirm Google Sheets sync if configured.
- Test admin login, adding a product, uploading a product image, hiding/deleting a product, and updating an order status.
- Confirm shipping fees, delivery zones, returns policy, privacy policy, and customer contact details.
- Use a real WhatsApp number and a strong admin password.
- Do not use fake/test product images or placeholder product content.
- Back up your database and keep service-role credentials private.

## Common troubleshooting
- `npm install` then `npm run build` to catch build errors before deployment.
- If Vercel says an environment variable is missing, add it under Settings → Environment Variables and redeploy.
- If product images fail, check the Storage bucket name is exactly `product-images` and its public URL setting.
- If admin API returns 401, log in again and ensure the account email matches `ADMIN_EMAIL`.

# Google Sheets order integration setup
1. Create a Google Cloud project and enable Google Sheets API.
2. Create a Service Account and generate a JSON key.
3. Share the target spreadsheet with the service-account email as Editor.
4. Create a tab named Orders and headers: Order ID | Date | Customer | Phone | Wilaya | Commune | Address | Products | Total | Payment | Status | Notes.
5. Put spreadsheet ID in GOOGLE_SHEET_ID and service account email/private key in .env.local.
6. Never expose credentials in browser code or commit .env.local.
Orders save to Supabase first. Sheets sync is optional.

/* =========================================================================
   CLOUD SYNC CONFIGURATION

   Leave both values empty and the tracker runs exactly as before: everything
   saves in this browser only, and Export / Import is how you move it around.

   Fill them in and the tracker syncs across every device you sign in on.
   See SUPABASE-SETUP.md in this repo for the 15-minute walkthrough.

   Is it safe to commit these to a public repo?  Yes — the anon key is a
   *publishable* key. It identifies the project, it does not grant access.
   Every table is protected by row-level security, so the key alone lets a
   stranger do nothing at all. Never put the `service_role` key here.
   ========================================================================= */

window.FT_CONFIG = {
  // e.g. "https://abcdefghijklmnop.supabase.co"
  SUPABASE_URL: "",

  // the "anon" / "publishable" key from Settings → API
  SUPABASE_ANON_KEY: ""
};

# Setting up cloud sync

One-time job, roughly 15 minutes. Once done, you sign in on any device — laptop,
phone, tablet — and the tracker is the same everywhere. Free tier is far more than
this needs.

Until you finish this, the tracker still works: it saves in whatever browser you're
using, and Export / Import moves it around. Nothing breaks if you never do it.

---

## 1. Create the project

1. Go to [supabase.com](https://supabase.com) and sign up.
2. **New project**. Name it whatever you like. Pick a region near Utah —
   `West US (North California)` is the closest.
3. Set a database password and save it in your password manager. You won't need it
   for this, but you'll want it later.
4. Wait a minute or two for the project to finish provisioning.

## 2. Create the tables

Open **SQL Editor** in the left sidebar, click **New query**, paste all of this, and
click **Run**. It's safe to run more than once.

```sql
-- ---------------------------------------------------------------
-- Food Truck Launch Tracker — schema
-- A "plan" owns the tracker state. People are members of a plan.
-- Built for one user now, extra people later without a rewrite.
-- ---------------------------------------------------------------

create table if not exists public.plans (
  id          uuid primary key default gen_random_uuid(),
  name        text not null default 'Food Truck Plan',
  created_by  uuid not null references auth.users(id) on delete cascade,
  created_at  timestamptz not null default now()
);

create table if not exists public.plan_members (
  plan_id   uuid not null references public.plans(id) on delete cascade,
  user_id   uuid not null references auth.users(id) on delete cascade,
  role      text not null default 'owner',
  added_at  timestamptz not null default now(),
  primary key (plan_id, user_id)
);

create table if not exists public.plan_state (
  plan_id     uuid primary key references public.plans(id) on delete cascade,
  data        jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now(),
  updated_by  uuid references auth.users(id)
);

alter table public.plans        enable row level security;
alter table public.plan_members enable row level security;
alter table public.plan_state   enable row level security;

-- Membership test used by the policies below. SECURITY DEFINER so the policy
-- can read plan_members without tripping over plan_members' own policy.
create or replace function public.is_plan_member(p uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.plan_members m
    where m.plan_id = p and m.user_id = auth.uid()
  );
$$;

drop policy if exists "members read plans"      on public.plans;
drop policy if exists "read own membership"     on public.plan_members;
drop policy if exists "members read state"      on public.plan_state;
drop policy if exists "members update state"    on public.plan_state;
drop policy if exists "members insert state"    on public.plan_state;

create policy "members read plans" on public.plans
  for select using (public.is_plan_member(id));

create policy "read own membership" on public.plan_members
  for select using (user_id = auth.uid());

create policy "members read state" on public.plan_state
  for select using (public.is_plan_member(plan_id));

create policy "members update state" on public.plan_state
  for update using (public.is_plan_member(plan_id))
              with check (public.is_plan_member(plan_id));

create policy "members insert state" on public.plan_state
  for insert with check (public.is_plan_member(plan_id));

-- Stamp who saved and when, server-side, so clocks can't be fudged.
create or replace function public.touch_plan_state()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end $$;

drop trigger if exists trg_touch_plan_state on public.plan_state;
create trigger trg_touch_plan_state
  before insert or update on public.plan_state
  for each row execute function public.touch_plan_state();

-- Called by the page on sign-in. Returns your plan, creating it the first time.
create or replace function public.ensure_plan()
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare pid uuid;
begin
  select m.plan_id into pid
    from public.plan_members m
   where m.user_id = auth.uid()
   order by m.added_at
   limit 1;

  if pid is null then
    insert into public.plans (created_by) values (auth.uid()) returning id into pid;
    insert into public.plan_members (plan_id, user_id, role) values (pid, auth.uid(), 'owner');
    insert into public.plan_state (plan_id, data, updated_by) values (pid, '{}'::jsonb, auth.uid());
  end if;

  return pid;
end $$;

revoke all on function public.ensure_plan() from public, anon;
grant execute on function public.ensure_plan() to authenticated;
```

You should see **Success. No rows returned**.

## 3. Nothing to do here — but read this

**If the email template editor is read-only, that's expected. Skip ahead.**

On 3 June 2026 Supabase stopped letting free-tier projects created after that date
customise their auth email templates, after people abused free projects to send
phishing mail. Existing free projects and all paid plans kept the ability. A project
created today on the free tier cannot edit templates, full stop.

This costs you nothing. The default email sends a **magic link**, the tracker signs
you in when you click it, and because the page uses the implicit auth flow a link
requested on your laptop still works when opened on your phone. The 6-digit code box
in the sign-in dialog is only useful if your template happens to include a code — if
your email has just a link, ignore the box and click the link.

### Two limits on the built-in email service, worth knowing now

1. **It only delivers to your project's team members.** Any other address gets
   *"Email address not authorized"*. Your own Supabase account email works
   immediately. To add your business partner, either invite them to the project's
   organisation under **Organization → Team**, or set up custom SMTP (below).
2. **Roughly 2 emails per hour.** Fine in practice — sessions persist and refresh
   themselves, so you sign in on a device once and stay signed in for a long time.
   You'll only notice it if you're testing repeatedly.

### Custom SMTP — optional, and the fix for both limits

Not needed to get going. Do it when you want to add someone outside your Supabase
org, or when the 2/hour limit starts annoying you:

1. Sign up with an email provider — [Resend](https://resend.com) is the usual pick at
   this size; Postmark, SendGrid and Amazon SES all work too.
2. **Project Settings → Authentication → SMTP Settings**, enable custom SMTP, and
   paste in the host, port, username and password your provider gives you.
3. Sending opens up to any address, the initial cap becomes 30/hour (adjustable under
   Rate Limits), and template editing comes back — so if you later want the 6-digit
   code, add this to the Magic Link template:

   ```html
   <p>Or enter this code: <strong>{{ .Token }}</strong></p>
   ```

## 4. Allow your site's URL

**Authentication → URL Configuration**:

- **Site URL**: `https://praneetharra.github.io/foodtruck-tracker/`
- **Redirect URLs**: add the same URL. Add `http://localhost:*` too if you ever
  open the files locally.

Without this, sign-in links bounce.

## 5. Point the tracker at your project

**Project Settings → API**. Copy the **Project URL** and the **anon / publishable**
key — *not* the `service_role` key, which must never leave the dashboard.

Edit `assets/config.js` in this repo:

```js
window.FT_CONFIG = {
  SUPABASE_URL: "https://YOUR-PROJECT-REF.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOi...your anon key..."
};
```

Commit and push:

```bash
git add assets/config.js
git commit -m "Configure cloud sync"
git push origin main
```

**Committing the anon key to a public repo is fine and intended.** It identifies the
project; it grants nothing. Every table above has row-level security, so the key on
its own lets a stranger read and write precisely nothing. The `service_role` key is
the dangerous one — it bypasses RLS, and it belongs nowhere near this repo.

## 6. Sign in

Reload the site (hard-refresh: Cmd-Shift-R). The top-bar chip now reads
**Sign in to sync**. Click it, enter the email address on your Supabase account, and
click **Email me a sign-in link**. Open the email, click the link, and you land back
on the tracker signed in — the chip turns green.

Then do the same on your phone with the same email address. Both devices now share
one plan, and everything you'd already entered in either browser gets merged rather
than overwritten.

---

## Adding your business partner later

First make sure email can actually reach them: either invite them to the project's
organisation under **Organization → Team**, or set up custom SMTP (step 3). Without
one of those, the built-in email service refuses to deliver to their address.

Then have them open the site and sign in once with their own email — that creates
their account and, harmlessly, an empty plan of their own. Then in **SQL Editor**:

```sql
-- Find the two ids you need
select id, email from auth.users;                    -- their user id
select plan_id, user_id from public.plan_members;    -- your plan id

-- Add them to your plan
insert into public.plan_members (plan_id, user_id, role)
values ('YOUR-PLAN-ID', 'THEIR-USER-ID', 'editor');
```

Their next sign-in picks up your plan instead of their empty one, because
`ensure_plan()` returns the oldest membership. Both of you then edit the same tracker,
with the same merge behaviour that already handles your own two devices.

---

## Troubleshooting

**Chip stays on "Local only"** — `assets/config.js` is still empty, or the push
hasn't gone live yet. Hard-refresh (Cmd-Shift-R).

**"Could not load the Supabase library"** — network blocked the CDN. Your work is
still saved locally.

**"Email address not authorized"** — the built-in email service only delivers to your
project's team members. Use the address on your Supabase account, add the person under
**Organization → Team**, or set up custom SMTP.

**No email arrives at all** — you've likely hit the ~2 per hour cap on the built-in
service. Wait, or set up custom SMTP.

**The email has no 6-digit code** — normal. Free projects created after 3 June 2026
can't customise templates. Click the link instead; the code box is optional.

**Sign-in link does nothing / bounces to an error** — step 4's Redirect URLs don't
match your site exactly, trailing slash included. It must be
`https://praneetharra.github.io/foodtruck-tracker/`.

**Signed in on the laptop but the phone won't take the link** — the link is
single-use and expires (about an hour by default). Request a fresh one from the
phone itself.

**Chip says "Offline"** — pushes are failing. Your data is safe in the browser and
will sync when the connection returns. If it persists, check the browser console; an
RLS error usually means the SQL in step 2 didn't all run.

**Starting over** — `delete from public.plan_state where plan_id = 'YOUR-PLAN-ID';`
clears the cloud copy. Local browser copies are untouched, and the next save from any
signed-in device repopulates it.

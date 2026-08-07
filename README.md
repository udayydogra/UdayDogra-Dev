# Uday Dogra — AppSec Portfolio

A minimal, typography-driven portfolio (Brittany-Chiang-style split layout) built as a
**security knowledge base**. The `/labs` section is backed by a Notion database of documented
web-security labs — each with vulnerability class, root cause, exploitation path, and remediation.

Built with Next.js 15 (App Router), Tailwind CSS, and shadcn/ui.

## Structure

- `app/page.tsx` — homepage (server component, fetches labs, renders the split layout)
- `components/portfolio/*` — sidebar + homepage sections (About, Skills, Experience, Projects, Writing, Contact, Footer)
- `components/labs/*` — lab cards, filterable explorer, Notion block renderer
- `app/labs` — labs index (search + filter) and `app/labs/[slug]` writeup detail pages
- `lib/site.ts` — all personal content & config (edit this to update your bio, links, projects)
- `lib/notion.ts` — Notion data layer (fetch-based, no SDK); `lib/labs-fallback.ts` — sample data
- `app/sitemap.ts`, `app/robots.ts` — SEO (includes every lab slug)

## Local development

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
```

Without Notion credentials the site builds and renders using a local sample dataset
(`lib/labs-fallback.ts`), so nothing is blocked on setup.

## Connecting your Notion labs database

1. Create an **internal integration** at https://www.notion.so/my-integrations and copy its
   *Internal Integration Secret*.
2. Open your **Mastered Labs** database in Notion → `•••` → **Connections** → add the integration
   so it can read the database.
3. Copy `.env.local.example` to `.env.local` and fill in:
   ```
   NOTION_TOKEN=secret_xxx
   NOTION_DATABASE_ID=3138241e0c8d80038497d45a9cc296d9
   ```
4. Restart `npm run dev`. The homepage teaser, `/labs`, sitemap, and every writeup page now render
   live from Notion (revalidated hourly via ISR).

On Vercel, add the same two variables under **Project → Settings → Environment Variables**.

## Personalizing

Edit `lib/site.ts` for name, role, bio, emails, social links, projects, experience, education, and
certifications. Placeholder social URLs are marked with `// TODO`. Set `SITE_URL` to your real
domain so canonical/OG/sitemap URLs are correct.

# Manoja P — Portfolio

A multi-page personal portfolio. No build step, no dependencies — plain HTML,
CSS and JavaScript.

Content is taken from `resume_manoja.pdf`.

## Pages

| File | Page | What's on it |
|---|---|---|
| `index.html` | Home | Hero, highlights, and links into the four inner pages |
| `about.html` | About | Intro, soft skills, quick facts, résumé download |
| `skills.html` | Skills | Programming, web technologies, database, tools |
| `projects.html` | Projects | Both projects with bullet-point detail |
| `education.html` | Education | Academic timeline, certifications and awards |
| `contact.html` | Contact | Email, phone, links and the contact form |

Every page shares the header and footer, so the visitor can reach any page from
any other in one click.

## Run it

Just open `index.html` in a browser (double-click it). The links between pages
work fine over `file://`.

If you prefer a local server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Files

```
index.html · about.html · skills.html · projects.html
education.html · contact.html     the six pages
assets/css/base.css               theme tokens, reset, layout, header
assets/css/sections.css           hero, about, project cards
assets/css/extras.css             timeline, contact, footer, responsive
assets/js/main.js                 interactions (shared by all pages)
assets/Manoja-P-Resume.pdf        the résumé linked from the About page
assets/img/avatar.svg             placeholder portrait (replace with your photo)
assets/img/og-cover.png           social preview card (1200x630) for shared links
assets/favicon.svg                browser tab icon
```

## Updating the content

Each page is a normal HTML file — find the text you want and edit it in place.
Nothing else needs to change.

**The header and footer are repeated in all six files.** If you change a nav
label or add a page, update every file (a find-and-replace across `*.html`
handles it). The current page's nav item is marked with `class="active"` and
`aria-current="page"` — copy that onto the right link if you add pages.

A few things worth knowing:

- **Photo.** Replace `assets/img/avatar.svg` with your own picture
  (`assets/img/avatar.jpg` also works — then update the `<img src>` in the hero
  on `index.html`). A square image around 800×800 looks best. Until then a
  generic placeholder is shown.
- **Project links.** Both project cards on `projects.html` point at your GitHub
  profile, because the résumé doesn't include repository URLs. Once a project
  has its own repo (or a live demo), update the `href` on the "View on GitHub"
  link.
- **Résumé.** The About page links to `assets/Manoja-P-Resume.pdf`. Replace that
  file when your résumé is updated, or rename it and update the `href`.
- **Contact form.** It has no backend — on submit it opens the visitor's email
  app addressed to `ceitmanoja26@gmail.com` (set by `data-mailto` on the
  `<form>`). To collect messages without a backend, sign up for a form service
  (e.g. Formspree, Netlify Forms) and point the form's `action` at it instead —
  see the comment in `assets/js/main.js`.
- **Recolouring.** `--accent` and `--accent-2` at the top of `base.css` control
  the whole colour scheme, across every page.

## Publishing it online

This is a static site — no server, no database, no build step — so any static
host will serve it. The site is already pushed to the repository
**MANOJA-P/portfolio**, so all that is left is to publish it: either switch GitHub
Pages on (Step 2 below) or drag the folder onto Netlify.

### Fastest route: Netlify Drop (about 2 minutes, no account needed to start)

1. Unzip `portfolio-site.zip` on your computer.
2. Go to <https://app.netlify.com/drop>.
3. Drag the **folder that directly contains `index.html`** onto the page.
4. You get a live link in a few seconds, like
   `https://cheerful-panda-1a2b3c.netlify.app`.
5. Sign in with a free account to keep it permanently and rename it
   (Site configuration → Change site name) to something like
   `manoja-p.netlify.app`.

To update the site later, drag the folder onto the same site's Deploys tab again.

### GitHub Pages (the repo is already created)

**Step 1 — get the files into the repo (already done).** The six pages, the assets
folder and this README are in **MANOJA-P/portfolio** on the `main` branch. The two
options below are kept in case you ever want to re-upload them from elsewhere:

- **Upload in the browser:** open <https://github.com/MANOJA-P/portfolio>, click
  **Add file → Upload files**, then drag in the six `.html` files, `README.md`
  and the `assets` folder. Commit.
  *Drag the files themselves, not the folder that holds them*, or the site ends
  up one level too deep.
- **From your own computer**, if you have Git installed:

  ```bash
  git clone https://github.com/MANOJA-P/portfolio.git
  cd portfolio
  # copy the site files into this folder, then:
  git add . && git commit -m "Add portfolio site" && git push
  ```

**Step 2 — switch Pages on.** In the repo: **Settings → Pages** → under *Build
and deployment* set **Source** to `Deploy from a branch`, **Branch** to `main`,
folder `/ (root)`, and Save. About a minute later the site is live at:

**https://manoja-p.github.io/portfolio/**

All the links in the site are relative, so it works whether it sits at a domain
root or in a subfolder like `/portfolio/`.

### Link previews

The site is set up to publish at **https://manoja-p.github.io/portfolio/** and
the social preview tags already point there, using
`assets/img/og-cover.png` — a 1200×630 card with your name, degree and skills.

**If you rename the repository or move to another domain**, update the four
absolute URLs in the `<head>` of each of the six pages (search for `SITE_URL`
in the comment above them) to your new address, or previews will point at the
old one.

Then paste your link into a chat or a LinkedIn post and it will show the card.

### Other hosts

Vercel, Cloudflare Pages and Firebase Hosting all work the same way — connect
the GitHub repo or drag the folder in. Just keep `index.html` at the root.

### Sharing without a host

You can also just send someone the ZIP or the folder itself: opening
`index.html` in a browser works offline, and the links between the six pages
still work. It's fine for a quick look, but recruiters are far more likely to
click a link than to unzip a file.

## Notes

- Dark theme by default; the toggle top-right remembers the choice across pages.
- Respects `prefers-reduced-motion` and includes a skip link and visible focus
  styles on every page.
- The nav collapses into a menu button below 900px, since six items need the room.

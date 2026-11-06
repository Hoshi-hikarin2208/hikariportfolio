# Renze Daneille P. Rivero — Portfolio

React + Vite + Tailwind CSS v4 + Framer Motion + Lucide icons.
Dark cinematic style with crimson accents, inspired by your reference video.

## Run it

```bash
npm install
npm run dev        # open the address it prints (usually http://localhost:5173)
npm run build      # production build -> dist/
npm run preview    # test the production build
```

## The golden rule

**Everything you will ever edit is in `src/data/portfolio.js`**, and every picture goes in `public/images/`.
You never have to touch the components to change content.

## Debugging (when something looks wrong)

1. Press **Ctrl + Shift + D** on the site (or open `http://localhost:5173/?debug=1`).
   The debug panel lists: missing images, bad links, empty fields, invalid colors, wrong birthday format.
2. Open the browser console (F12). Problems are also printed there, e.g.
   `Image not found: public/images/project2.png -> using fallback`.
3. If one section shows a red box, that section crashed. The message tells you which one;
   it is almost always a typo in `portfolio.js` (a missing comma, quote or bracket).
4. Blank white page? Look at the terminal where `npm run dev` runs, since syntax errors show there first.

Common mistakes
| Symptom | Fix |
|---|---|
| Photo shows a grey silhouette | File name in `portfolio.js` doesn't match the file in `public/images/` (names are case-sensitive on hosting) |
| Project button missing | `github` / `demo` is `""` (that hides the button on purpose) |
| Icon looks like a sparkle | Icon name isn't registered, so add it in `src/utils/icons.js` |
| Colors didn't change | Use a hex code like `#e5322d`, with the `#` and quotes |

## How to…

### 1. Change your profile picture
Put your photo in `public/images/` named `profile.jpg` (replace the file) — or save it under another name
and set `profile.picture: 'images/my-photo.png'`. Best: a portrait ~1000×1250 px. It is auto-cropped.
The About picture uses `about.picture` (`images/about.jpg`) and falls back to your profile photo.

### 2. Edit personal information
Open `src/data/portfolio.js` → `profile` block: `fullName`, `displayName` / `displaySurname` (big hero text),
`birthday` (`'2005-01-08'`), `age` (`'auto'` recalculates every year, or type a number), `course`, `role`,
`typedSkills` (the typing animation), `tagline`. About text is in the `about` block. Website title/SEO is in `site`.

### 3. Add a new skill
In `skills: [ ... ]` copy an object and edit it:
```js
{ title: 'Version Control', icon: 'GitBranch', level: 70, description: 'Git workflows.', items: ['Git', 'GitHub'] },
```
`level` is the progress bar (0–100). Icons available are listed in `src/utils/icons.js`; to add one, import it from `lucide-react` there.

### 4. Add a new project
1. Save a screenshot as `public/images/project4.png` (16:9 works best).
2. In `projects: [ ... ]` add:
```js
{
  title: 'My New App',
  description: 'What it does in one or two sentences.',
  image: 'images/project4.png',
  tech: ['React', 'Node.js'],
  github: 'https://github.com/you/my-new-app',
  demo: '',          // "" hides the button
  year: '2026',
},
```
There is no limit. Cards are numbered automatically.

### 5. Change the website colors
`theme` block in `portfolio.js`. `accent` is the red used everywhere; change it to any hex
(e.g. `'#2563eb'` for blue). `dark` and `light` hold background/text colors for each mode.

### 6. Add a new section
1. Copy `src/sections/About.jsx` to `src/sections/MySection.jsx` and edit it (it receives `cfg` and `number`).
2. In `src/sections/index.js` import it and add `mysection: MySection`.
3. In `portfolio.js` → `sections` add `{ id: 'mysection', label: 'My Section', enabled: true }`.
It appears in the navbar and page automatically. Reorder the `sections` list to reorder the page;
set `enabled: false` to hide one.

## More things you can change
- **Education / certificates**: `education: [...]`, each school has `achievements` and `certificates` lists.
- **Social links**: `contact.socials` (empty `url` hides that icon). Email and phone in `contact`.
- **CV download**: replace `public/cv/Renze-Rivero-CV.pdf` with your real CV (same name), or change `profile.cvFile`.
- **Contact form**: by default it opens the visitor's email app. To receive messages directly, make a free
  form at formspree.io and paste its URL into `contact.formEndpoint`.
- **Effects**: `effects` block turns the intro curtain, floating cursors and scroll line on or off.
- **Scrolling word strip**: `marquee: [...]`.
- **Fonts**: edit the Google Fonts link in `index.html` and `--font-*` in `src/index.css`.

## Project map
```
public/images/        <- all pictures (profile.jpg, project1.png, background.jpg, placeholder.svg ...)
public/cv/            <- your CV pdf
src/data/portfolio.js <- ALL your content, theme, links
src/sections/         <- Hero, About, Skills, Projects, Education, Contact (+ index.js registry)
src/components/       <- Navbar, SafeImage, Reveal, DebugPanel, ErrorBoundary, extras
src/utils/            <- icons, helpers, seo, theme, validate (the debug checks)
```

## Deploy
`npm run build`, then upload `dist/` to Netlify / Vercel / GitHub Pages (`base: './'` is already set).
Set `site.url` in `portfolio.js` after you know your address.

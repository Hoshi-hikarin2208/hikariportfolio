# Hi, I'm Renze Rivero 👋

I'm a Bachelor of Science in Information Technology (BSIT) student from the Philippines and an aspiring developer. I enjoy learning how websites, backend systems, games, and online worlds work by building projects of my own.

I'm especially interested in frontend and backend development, game development, and Minecraft servers, mods, and plugins. This portfolio is a place to share what I'm learning, the projects I'm working on, and where I hope to go next.

## About this website

This is my personal portfolio website. It introduces me, highlights my skills and projects, shares my education and experience, and provides ways to connect with me. It has a responsive layout, dark and light themes, animated details, and sections visitors can explore from the navigation.

### How it works

- **React** builds the page from reusable components and sections.
- **Vite** runs the development server and bundles the site for production.
- **Tailwind CSS** styles the layout and visual design.
- **Framer Motion** powers animations and transitions.
- **Lucide React** provides icons.
- Most of the portfolio's content, including profile details, skills, projects, theme, and enabled sections, is configured in [`src/data/portfolio.js`](./src/data/portfolio.js).
- Page sections are implemented in `src/sections/` and connected to their IDs through [`src/sections/index.js`](./src/sections/index.js).
- Static files such as profile photos and the CV go in `public/`. They are copied into the production site when it is built.
- GitHub Actions builds the site and publishes the generated `dist/` folder to GitHub Pages when changes are pushed to `main`.

The browser downloads the built HTML, CSS, and JavaScript from GitHub Pages. JavaScript starts the React app, reads the portfolio content, and renders the page. The site uses relative asset paths so it can also load correctly at the repository's GitHub Pages URL.

## Run it locally

You need Node.js and npm installed.

```bash
npm ci
npm run dev
```

Open the local address Vite prints in the terminal. To build and preview the production version:

```bash
npm run build
npm run preview
```

The production files are generated in `dist/`. You do not need to commit that folder; GitHub Actions builds it during deployment.

## Update the portfolio

Most content can be changed in [`src/data/portfolio.js`](./src/data/portfolio.js):

- Edit your name, role, introduction, and profile image in `profile`.
- Update the About section in `about`.
- Add or change skill cards in `skills`.
- Add projects in `projects`.
- Reorder sections or hide one by setting `enabled: false` in `sections`.
- Change the theme colors in `theme`.

Put images in `public/images/` and refer to them with paths such as `images/profile.jpg`. Put a replacement CV in `public/cv/`, or update the `cvFile` setting to match its filename. Keep filenames and paths' letter casing the same; GitHub Pages is case-sensitive.

To add a new page section, create a component in `src/sections/`, register it in `src/sections/index.js`, and add its ID to the `sections` list in `src/data/portfolio.js`.

## Publish with GitHub Pages

1. In the GitHub repository, open **Settings → Pages**.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. Push your changes to the `main` branch.
4. Follow the workflow in the **Actions** tab. When deployment finishes, GitHub Pages will show your website URL.

The workflow is defined in [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml).

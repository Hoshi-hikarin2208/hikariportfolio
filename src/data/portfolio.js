/**
 * ============================================================
 *  PORTFOLIO CONFIG  —  the ONLY file you need to edit
 * ============================================================
 *  Everything on the website is read from this file.
 *  - Images: put files in  public/images/  and write the path as  "images/<file>"
 *  - Leave a value as ""  to hide it (e.g. a project with no "demo" hides the Demo button)
 *  - Something looks wrong?  Open the site and press  Ctrl + Shift + D  (or add ?debug=1 to the URL)
 *    to see a list of problems found in this file (missing images, empty fields, bad links).
 */

const portfolio = {
  /* ---------------------------------------------------------
   * 1. SITE / SEO
   * --------------------------------------------------------- */
  site: {
    title: 'Renze Daneille P. Rivero | Aspiring Developer', // browser tab title
    description:
      'Portfolio of Renze Daneille P. Rivero, BSIT student and aspiring frontend, backend and game developer.',
    logoText: 'RENZE', // wordmark top-left of the navbar
    favicon: 'images/favicon.svg',
    url: '', // your deployed URL, e.g. 'https://renze.vercel.app' (used for SEO tags)
    footerNote: 'Built with React, Vite & Tailwind.',
  },
  musicFile: 'audio/portfolio.mp3', // add your MP3 at public/audio/portfolio.mp3; visitors choose when to play it

  /* ---------------------------------------------------------
   * 2. THEME COLORS  (change a hex code, the whole site updates)
   * --------------------------------------------------------- */
  theme: {
    defaultMode: 'dark', // 'dark' | 'light'  (visitor's choice is remembered)
    accent: '#b94d77', // anime sakura rose
    accentSoft: '#cfb7f4', // moonlit lavender
    dark: {
      bg: '#090a12',
      surface: '#12131d',
      text: '#f1eadf',
      muted: '#aaa4a1',
      border: 'rgba(207,183,244,0.18)',
    },
    light: {
      bg: '#f2eee7',
      surface: '#faf7f0',
      text: '#1b1820',
      muted: '#716b70',
      border: 'rgba(119,87,135,0.18)',
    },
  },

  /* ---------------------------------------------------------
   * 3. EFFECTS  (turn features on/off)
   * --------------------------------------------------------- */
  effects: {
    preloader: true, // red curtain intro
    floatingCursors: false, // the moon and orbit animations provide the ambient motion
    scrollLine: true, // thin red progress line on the left edge
    cursorLabels: ['THE MYSTIC', 'THE MAKER', 'THE FOOL'],
  },

  /* ---------------------------------------------------------
   * 4. NAVIGATION / SECTIONS
   *    - "id" must match a key in src/sections/index.js
   *    - set enabled:false to hide a section everywhere
   *    - reorder the list to reorder the page
   * --------------------------------------------------------- */
  sections: [
    { id: 'home', label: 'Home', enabled: true },
    { id: 'about', label: 'About', enabled: true },
    { id: 'skills', label: 'Skills', enabled: true },
    { id: 'projects', label: 'Projects', enabled: true },
    { id: 'education', label: 'Education', enabled: true },
    { id: 'experience', label: 'Experience', enabled: true },
    { id: 'socials', label: 'Socials', enabled: true },
    { id: 'contact', label: 'Contact', enabled: true },
  ],

  /* ---------------------------------------------------------
   * 5. PERSONAL INFO
   * --------------------------------------------------------- */
  profile: {
    fullName: 'Renze Daneille P. Rivero',
    displayName: 'RENZE', // big hero name
    displaySurname: 'RIVERO', // second line (leave '' for a single line)
    birthday: '2005-01-08', // YYYY-MM-DD
    age: 'auto', // 'auto' = calculated from birthday, or type a number like 21
    course: 'BSIT (Bachelor of Science in Information Technology)',
    role: 'BSIT Student · Aspiring Developer',
    location: 'Philippines', // edit or set ''
    picture: 'images/profile.jpg', // <- replace this file to change your photo
    heroBackdropWord: 'DREAMER', // giant word behind your name
    greeting: 'A student with a dream,',
    tagline:
      'BSIT student exploring web development, backend systems, game creation, and Minecraft servers one project at a time.',
    typedSkills: ['BSIT Student', 'Web Development', 'Minecraft Plugins', 'Game Development'],
    cvFile: 'cv/Renze-Rivero-CV.pdf', // put your real CV PDF here (same name or change this)
    heroButtons: { primary: 'View Projects', secondary: 'Contact Me', cv: 'Download CV' },
  },

  /* ---------------------------------------------------------
   * 6. ABOUT
   * --------------------------------------------------------- */
  about: {
    heading: 'Who is behind the code.',
    picture: 'images/about.jpg', // falls back to profile picture if missing
    paragraphs: [
      'I am a BSIT student who enjoys turning ideas into working software. My curiosity about how websites, games, and online worlds work keeps growing with every project I take on.',
      'I like the full picture: designing an interface, exploring how the backend works, and adding the fun of game mechanics. I have also handled Minecraft servers and made mods and plugins, and I am excited to keep learning as I build.',
    ],
    interests: ['Web apps', 'Game design', 'Clean UI', 'Open source', 'Learning new tech'],
    goals: [
      'Graduate with honors in BSIT',
      'Build and launch a full-stack product',
      'Publish a polished indie game',
      'Land a developer role and keep growing',
    ],
    // Shown as big animated numbers. Use a number in "value" and optional "suffix".
    stats: [
      { value: 3, suffix: '', label: 'Areas explored' },
      { value: 1, suffix: '', label: 'BSIT student' },
      { value: 4, suffix: '', label: 'Areas of curiosity' },
    ],
  },

  /* ---------------------------------------------------------
   * 7. SKILLS  — add a new object to add a new skill card
   *    icon names: see src/utils/icons.js (Code2, Server, Gamepad2, Database, Palette, Wrench, ...)
   *    level: 0-100 (progress bar)
   * --------------------------------------------------------- */
  skills: [
    {
      title: 'Frontend Development',
      icon: 'Code2',
      level: 75,
      description: 'Responsive, accessible interfaces with modern tooling.',
      items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
    },
    {
      title: 'Backend Development',
      icon: 'Server',
      level: 60,
      description: 'APIs, databases and server logic.',
      items: ['Node.js', 'PHP', 'MySQL', 'REST APIs'],
    },
    {
      title: 'Game Development',
      icon: 'Gamepad2',
      level: 55,
      description: 'Gameplay systems, mechanics and level design.',
      items: ['Unity', 'C#', 'Roblox / Luau', 'Game Design'],
    },
    // Example of adding another skill — copy, paste, edit:
    // { title: 'Version Control', icon: 'GitBranch', level: 70, description: '', items: ['Git', 'GitHub'] },
  ],

  // Scrolling strip under the hero. Add or remove words freely.
  marquee: ['BSIT STUDENT', 'WEB DEVELOPMENT', 'MINECRAFT SERVERS', 'PLUGINS & MODS', 'GAME DEVELOPMENT', 'JAVASCRIPT', 'REACT', 'MYSQL', '✿', 'LEARNING BY BUILDING'],

  /* ---------------------------------------------------------
   * 8. PROJECTS — add a new object to add a new project (no limit)
   *    image: put the file in public/images/ (project1.png, project2.png, ...)
   *    github / demo: leave "" to hide that button
   * --------------------------------------------------------- */
  projectsHeading: 'Learning by building.',
  projects: [
    {
      title: 'Minecraft Server Operations',
      description: 'Hands-on experience handling Minecraft servers and keeping online game worlds running.',
      image: 'images/placeholder.svg',
      tech: ['Minecraft', 'Server Management'],
      github: '',
      demo: '',
      year: '',
    },
    {
      title: 'Custom Minecraft Mods & Plugins',
      description: 'Created custom mods and plugins to extend and personalize Minecraft gameplay.',
      image: 'images/placeholder.svg',
      tech: ['Minecraft', 'Mods', 'Plugins'],
      github: '',
      demo: '',
      year: '',
    },
  ],

  /* ---------------------------------------------------------
   * 9. EDUCATION — add a new object for each school / level
   *    certificates: optional list shown under each school
   *    (put certificate images in public/images/certs/ and set "image", or leave "")
   * --------------------------------------------------------- */
  education: [
    {
      school: 'Current Studies',
      degree: 'Bachelor of Science in Information Technology',
      years: 'In progress',
      description: 'Currently studying information technology and building skills through hands-on projects.',
      achievements: [],
      certificates: [],
    },
  ],

  /* ---------------------------------------------------------
   * 10. CONTACT & SOCIALS
   *     Leave a value "" to hide that link.
   *     formEndpoint: paste a Formspree URL (https://formspree.io/f/xxxx) to receive messages
   *     in your inbox. If left empty, the form opens your email app instead.
   * --------------------------------------------------------- */
  contact: {
    heading: "Let's work together.",
    blurb: 'Have an opportunity, a project idea or just want to say hi? My inbox is open.',
    email: 'dondonrivero26@gmail.com',
    phone: '',
    formEndpoint: '',
    socials: [
      { name: 'GitHub', icon: 'Github', url: '' },
      { name: 'LinkedIn', icon: 'Linkedin', url: '' },
      { name: 'Facebook', icon: 'Facebook', url: '' },
      { name: 'Instagram', icon: 'Instagram', url: '' },
      { name: 'Twitter / X', icon: 'Twitter', url: '' },
      { name: 'YouTube', icon: 'Youtube', url: '' },
    ],
  },
}

export default portfolio

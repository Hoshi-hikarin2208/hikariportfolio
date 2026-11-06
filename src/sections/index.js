import Hero from './Hero'
import About from './About'
import Skills from './Skills'
import Projects from './Projects'
import Education from './Education'
import Experience from './Experience'
import Socials from './Socials'
import Contact from './Contact'

/**
 * SECTION REGISTRY
 * The "id" of each entry in portfolio.js -> sections[] is looked up here.
 * To add a new section:
 *   1. create src/sections/MySection.jsx   (copy About.jsx as a template; it receives { cfg, number })
 *   2. import it here and add  mysection: MySection
 *   3. add { id: 'mysection', label: 'My Section', enabled: true } to sections[] in portfolio.js
 */
const registry = {
  home: Hero,
  about: About,
  skills: Skills,
  projects: Projects,
  education: Education,
  experience: Experience,
  socials: Socials,
  contact: Contact,
}

export default registry

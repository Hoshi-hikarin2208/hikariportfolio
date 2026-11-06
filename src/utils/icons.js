import {
  Code2, Server, Gamepad2, Database, Palette, Wrench, Globe, Smartphone, Cpu, Cloud,
  GitBranch, Terminal, Layers, Brain, Shield, Github, Linkedin, Facebook, Instagram,
  Twitter, Youtube, Mail, Link as LinkIcon, Phone, Sparkles,
} from 'lucide-react'

/**
 * Icon registry: the string you write in portfolio.js (e.g. icon: 'Server')
 * is looked up here. To allow a new icon: import it above and add it to the map.
 * Browse names at https://lucide.dev/icons
 */
const icons = {
  Code2, Server, Gamepad2, Database, Palette, Wrench, Globe, Smartphone, Cpu, Cloud,
  GitBranch, Terminal, Layers, Brain, Shield, Github, Linkedin, Facebook, Instagram,
  Twitter, Youtube, Mail, Link: LinkIcon, Phone, Sparkles,
}

export function getIcon(name) {
  const Icon = icons[name]
  if (!Icon && name) console.warn(`[portfolio] Unknown icon "${name}". Add it to src/utils/icons.js`)
  return Icon || Sparkles
}

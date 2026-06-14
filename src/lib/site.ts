/**
 * Central place for school details and navigation.
 * Edit these values once and they update across the whole site
 * (header, footer, contact page, etc.).
 */
export const siteConfig = {
  name: "Kids Planet School",
  tagline: "Play. Learn. Grow.",

  // TODO: replace these placeholders with the school's real details
  email: "hello@kidsplanetschool.in",
  phone: "+91 6006720690",
  address: "123 Garden Road, Indiranagar, Bengaluru, Karnataka 560038",
  // Used to embed a Google Map on the Contact page
  mapQuery: "Indiranagar, Bengaluru, Karnataka",

  social: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
  },

  // Main navigation links (shown in the header and footer)
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/admissions", label: "Admissions" },
    { href: "/events", label: "Events" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

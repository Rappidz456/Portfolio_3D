/**
 * Site-wide brand and contact details — single source for Navbar, Contact, Footer.
 */
export const site = {
  name: "Muhammad Ali",
  role: "Full Stack Software Engineer",
  email: "mohammadali6918773@gmail.com",
  phone: "+92 331 4835133",
  phoneHref: "tel:+923314835133",
  githubLabel: "GitHub",
  githubUrl: "https://github.com/Rappidz456",
  location: "Lahore, Pakistan — working worldwide",
  /** Primary desktop nav (Contact lives in CTA / mobile menu). */
  navLinks: [
    { id: "about", title: "About" },
    { id: "projects", title: "Work" },
    { id: "services", title: "Services" },
    { id: "work", title: "Experience" },
  ],
  mobileNavLinks: [
    { id: "about", title: "About" },
    { id: "projects", title: "Work" },
    { id: "services", title: "Services" },
    { id: "work", title: "Experience" },
    { id: "contact", title: "Contact" },
  ],
};

export const aboutFacts = [
  { label: "Based in", value: site.location },
  { label: "Focus", value: "Web & cross-platform product engineering" },
  { label: "Experience", value: "4+ years" },
  { label: "Currently", value: "Software Engineer at Wisdom IT Solutions" },
];

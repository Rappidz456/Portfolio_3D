import {
  mobile,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  git,
  cas,
  atrule,
  res,
  snackDash,
  Uber,
  jarvis,
  fineme,
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "React Native Developer",
    icon: mobile,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
];

const experiences = [
  {
    title: "React Native Developer",
    company_name: "Cyber Advance Solutions",
    icon: cas,
    iconBg: "#383E56",
    date: "November 2023 - May 2024",
    points: [
      "Collaborated on new features for production mobile apps.",
      "Integrated third-party libraries and native modules.",
      "Implemented responsive layouts and cross-platform compatibility.",
      "Participated in code reviews and shared constructive feedback.",
      "Worked with Xcode, Android Studio, and Gradle for native builds.",
    ],
  },
  {
    title: "Mobile App Developer",
    company_name: "Atrule Technologies",
    icon: atrule,
    iconBg: "#E6DEDD",
    date: "June 2024 - September 2024",
    points: [
      "Built and maintained React Native applications with native components.",
      "Collaborated with designers, product managers, and engineers.",
      "Delivered responsive UI and consistent cross-platform behavior.",
      "Contributed to code reviews and team delivery standards.",
      "Focused on app quality, performance, and on-time releases.",
    ],
  },
  {
    title: "Software Developer",
    company_name: "Jarvis Technologies",
    icon: jarvis,
    iconBg: "#383E56",
    date: "October 2024 - Present",
    points: [
      "Design and implement app strategies aligned with product goals.",
      "Maintain consistent coding and UI/UX standards across features.",
      "Ship responsive experiences across devices and platforms.",
      "Participate in reviews and continuous improvement of the codebase.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Ali delivered a polished React Native experience on a tight timeline and communicated clearly throughout.",
    name: "Usman Asif",
    designation: ".NET Developer",
    company: "Peer collaborator",
  },
  {
    testimonial:
      "Strong ownership on mobile features — clean components, solid integrations, and reliable releases.",
    name: "Product teammate",
    designation: "Product Manager",
    company: "Atrule Technologies",
  },
  {
    testimonial:
      "Ali brings thoughtful UI work and practical engineering judgment. Great partner for shipping production apps.",
    name: "Engineering lead",
    designation: "Tech Lead",
    company: "Jarvis Technologies",
  },
];

const projects = [
  {
    name: "SnackDash_Sahlah",
    description:
      "SnackDash is a food delivery app that combines convenience with advanced features like Mapbox integration. Built using React Native, SnackDash offers seamless functionality across both Android and iOS platforms.",
    tags: [
      {
        name: "react native",
        color: "blue-text-gradient",
      },
      {
        name: "npm",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "Firebase",
        color: "green-text-gradient",
      },
    ],
    image: snackDash,
    source_code_link: "https://github.com/Rappidz456",
  },
  {
    name: "Uber_Clone",
    description:
      "The Uber Clone app is a mobile application developed using React Native that replicates the core functionalities of the popular ride-hailing service, Uber. It allows users to request rides, track drivers in real-time, and make secure payments through an intuitive interface.",
    tags: [
      {
        name: "react native",
        color: "blue-text-gradient",
      },
      {
        name: "npm",
        color: "green-text-gradient",
      },
      {
        name: "Firebase",
        color: "pink-text-gradient",
      },
    ],
    image: Uber,
    source_code_link: "https://github.com/Rappidz456",
  },
  {
    name: "Restaurant_App",
    description:
      "The Restaurant App is a user-friendly mobile application that allows users to explore and select their preferred dining options from a curated list of restaurants. Built with a focus on intuitive navigation, the app enables users to view detailed information about each restaurant, including menus, photos, and customer ratings.",
    tags: [
      {
        name: "react native",
        color: "blue-text-gradient",
      },
      {
        name: "npm",
        color: "green-text-gradient",
      },
      {
        name: "Firebase",
        color: "pink-text-gradient",
      },
    ],
    image: res,
    source_code_link: "https://github.com/Rappidz456",
  },
  {
    name: "FineMe",
    description:
      "The Fineme app is a comprehensive mobile application designed to streamline the salon booking experience for users. It allows customers to easily browse and select their preferred salons based on location, services offered, and user ratings. The app features two distinct user roles: customers and salon partners, enabling seamless interaction between both parties.",
    tags: [
      {
        name: "react native",
        color: "blue-text-gradient",
      },
      {
        name: "npm",
        color: "green-text-gradient",
      },
      {
        name: "Firebase",
        color: "pink-text-gradient",
      },
    ],
    image: fineme,
    source_code_link: "https://github.com/Rappidz456",
  },
];

export { services, technologies, experiences, testimonials, projects };

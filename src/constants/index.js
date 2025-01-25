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
      "Collaborated on a new feature for the mobile app.",
      "Skilled in integrating the Third-Party Libraries.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
      "Proficient with XCODE, ANDROID, and Gradle for Native Development.",
    ],
  },
  {
    title: "Mobile App Developer",
    company_name: "Atrule Technologies",
    icon: atrule,
    iconBg: "#E6DEDD",
    date: "June 2024 - September 2024",
    points: [
      "As a React Native Developer, I was responsible for creating and maintaining application, Integrating Native Components.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
      " My role was to ensure app quality and its performance and working with the team to meet the project deadline.",
    ],
  },
  {
    title: "Software Developer",
    company_name: "Jarvis Technologies",
    icon: jarvis,
    iconBg: "#383E56",
    date: "October 2024 - Present",
    points: [
      "Design and implement innovative app development strategies that align with project goals and deliver exceptional user experiences.",
      "Ensure consistent coding standards and UI/UX design principles across the app to maintain brand identity and enhance user engagement.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Usman Asif",
    designation: "Dot Net Developer",
    company: "Acme Co",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
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
    source_code_link: "https://github.com/",
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
    source_code_link: "https://github.com/",
  },
  {
    name: "Restuarent_App",
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
    source_code_link: "https://github.com/",
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
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };

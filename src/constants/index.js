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
  jarvis,
  wisdom,
  tasky,
  aiSurveillance,
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
    title: "Full Stack Developer",
    icon: web,
  },
  {
    title: "Mobile App Developer",
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
    title: "Mobile Application Developer",
    company_name: "Cyber Advance Solutions",
    icon: cas,
    iconBg: "#383E56",
    date: "January 2022 - July 2024",
    points: [
      "Developed and shipped mobile application features aligned with user needs and business goals.",
      "Collaborated with product managers, UI/UX designers, and backend developers to translate user stories into working features.",
      "Optimized API calls with Axios and improved app navigation using React Navigation.",
      "Integrated third-party libraries and APIs including payment gateways, push notifications, social logins, and analytics.",
      "Contributed to scalable, efficient mobile solutions through brainstorming and problem-solving sessions.",
    ],
  },
  {
    title: "Software Engineer",
    company_name: "Jarvis Technologies",
    icon: jarvis,
    iconBg: "#E6DEDD",
    date: "August 2024 - June 2025",
    points: [
      "Maintained a production React Native mobile app and a React.js / Next.js web application with scalable architecture.",
      "Developed responsive UI screens and integrated RESTful APIs using React Native, React.js, Next.js, Node.js, Redux, and Firebase.",
      "Optimized mobile and web performance through debugging, efficient state management, and refactoring.",
      "Delivered production releases using Agile Scrum while upholding code quality and accessibility standards.",
    ],
  },
  {
    title: "Software Engineer",
    company_name: "Wisdom IT Solutions",
    icon: wisdom,
    iconBg: "#383E56",
    date: "July 2025 - August 2026",
    points: [
      "Design and develop scalable web and cross-platform applications using React.js, React Native, Next.js, TypeScript, and JavaScript.",
      "Integrate RESTful APIs, authentication flows, payment gateways, push notifications, and real-time features for production experiences.",
      "Improve application performance through efficient state management, code optimization, and debugging.",
      "Collaborate with product managers, designers, and backend engineers in Agile Scrum to plan sprints and ship releases.",
      "Maintain scalable architecture, reusable components, and CI/CD workflows for reliable deployments.",
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
      "Strong ownership on mobile and web features — clean components, solid integrations, and reliable releases.",
    name: "Product teammate",
    designation: "Product Manager",
    company: "Jarvis Technologies",
  },
  {
    testimonial:
      "Ali brings thoughtful UI work and practical engineering judgment. Great partner for shipping production apps.",
    name: "Engineering lead",
    designation: "Tech Lead",
    company: "Wisdom IT Solutions",
  },
];

const projects = [
  {
    name: "Tasky",
    description:
      "AI-powered UAE services marketplace at tasky.ae — web and mobile. Post tasks or browse verified professionals across cleaning, maintenance, and more, with auth, real-time updates, REST APIs, and company onboarding for workflow tracking.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "react native",
        color: "green-text-gradient",
      },
      {
        name: "nodejs",
        color: "pink-text-gradient",
      },
    ],
    image: tasky,
    source_code_link: "https://www.tasky.ae/",
  },
  {
    name: "AI Surveillance System",
    description:
      "AI-powered surveillance dashboard built with Next.js and FastAPI for real-time safety and compliance monitoring — including helmet non-compliance, line-crossing, and bottle inspection detection, backed by a scalable Node.js and Python stack for live video analytics.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "fastapi",
        color: "green-text-gradient",
      },
      {
        name: "python",
        color: "pink-text-gradient",
      },
    ],
    image: aiSurveillance,
    source_code_link: "https://github.com/Rappidz456",
  },
  {
    name: "FineMe",
    description:
      "Comprehensive salon booking mobile app where customers browse salons by location, services, and ratings. Supports two roles — customers and salon partners — for seamless booking and business management.",
    tags: [
      {
        name: "react native",
        color: "blue-text-gradient",
      },
      {
        name: "firebase",
        color: "green-text-gradient",
      },
      {
        name: "mobile",
        color: "pink-text-gradient",
      },
    ],
    image: fineme,
    source_code_link: "https://github.com/Rappidz456",
  },
];

export { services, technologies, experiences, testimonials, projects };

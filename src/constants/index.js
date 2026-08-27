import {
  mobile,
  web,
  cas,
  jarvis,
  wisdom,
  tasky,
  aiSurveillance,
  fineme,
} from "../assets";

const reminderlink =
  "https://play-lh.googleusercontent.com/T_8AomrLfCRkhipp6LuppbacMfOMJ9kzWGVCxCcuwb1fA9wkLpTbr0uff3Vsw5OokOxlcUEX60FqX04OJK0r8g=w512";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Experience",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Full Stack Development",
    description:
      "End-to-end product builds on React, Next.js and Node — architecture, REST APIs, auth, real-time features, and the deployment pipeline behind them.",
    icon: web,
  },
  {
    title: "Mobile Applications",
    description:
      "Cross-platform iOS and Android apps in React Native, from offline-first data and push notifications through to store release.",
    icon: mobile,
  },
  {
    title: "AI Integration",
    description:
      "LLM features wired into real products — agents, retrieval, and vision pipelines built on the OpenAI and Anthropic APIs.",
    icon: web,
  },
  {
    title: "Performance & Delivery",
    description:
      "Profiling, refactoring, CI/CD and monitoring for teams that need an existing codebase to get faster and calmer to work in.",
    icon: mobile,
  },
];

/**
 * Stack shown as 3D spheres and in the marquee.
 * `label` is what gets drawn on the sphere, `color` is its brand tone.
 */
const technologies = [
  { name: "HTML5", label: "HTML", color: "#E34F26" },
  { name: "CSS3", label: "CSS", color: "#33A9DC" },
  { name: "JavaScript", label: "JS", color: "#F7DF1E" },
  { name: "React.js", label: "React", color: "#61DAFB" },
  { name: "Next.js", label: "Next", color: "#E8E8E8" },
  { name: "Vue.js", label: "Vue", color: "#4FC08D" },
  { name: "Python", label: "Python", color: "#3776AB" },
  { name: "Node.js", label: "Node", color: "#5FA04E" },
  { name: "Redux", label: "Redux", color: "#A07CE8" },
  { name: "Zustand", label: "Zustand", color: "#D08B4E" },
  { name: "Firebase", label: "Firebase", color: "#FFCA28" },
  { name: "OneSignal", label: "OneSignal", color: "#E54B4D" },
  { name: "Express.js", label: "Express", color: "#B8BEC9" },
  { name: "Socket.IO", label: "Socket.IO", color: "#8FA6D8" },
  { name: "GraphQL", label: "GraphQL", color: "#E10098" },
  { name: "Docker", label: "Docker", color: "#2496ED" },
];

/** Full skill set from resume — shown as categorized chips in Tech section */
const skillCategories = [
  {
    title: "Languages",
    skills: ["JavaScript", "TypeScript", "Python", "SQL"],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      "React Native",
      "Next.js",
      "React.js",
      "Node.js",
      "Express.js",
      "FastAPI",
      "Redux",
      "Zustand",
      "Context API",
      "Vue",
      "Tailwind CSS",
      "Three.js",
    ],
  },
  {
    title: "Data & Backend",
    skills: ["PostgreSQL", "Firebase", "REST APIs", "Axios"],
  },
  {
    title: "Engineering & Delivery",
    skills: [
      "Git",
      "JIRA",
      "Agile Development",
      "Docker",
      "CI/CD Pipelines",
      "System Monitoring",
      "Debugging",
    ],
  },
  {
    title: "Testing & Quality",
    skills: [
      "Unit Testing",
      "Performance Tuning",
      "Accessibility Best Practices",
    ],
  },
  {
    title: "GenAI & Agents",
    skills: [
      "OpenAI API",
      "GPT-4o",
      "Responses API",
      "OpenAI Agents SDK",
      "Anthropic",
      "Claude Code",
    ],
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
    name: "ReminderLink",
    description:
      "Health-focused reminder app on Google Play for medication doses and medical appointments. Handles recurring schedules, customizable alerts, completion tracking, and cross-device sync — built for patients managing chronic conditions and the caregivers supporting them.",
    tags: [
      {
        name: "react native",
        color: "blue-text-gradient",
      },
      {
        name: "push notifications",
        color: "green-text-gradient",
      },
      {
        name: "mobile",
        color: "pink-text-gradient",
      },
    ],
    image: reminderlink,
    // Play Store icon is square — contain it instead of cropping.
    imageFit: "contain",
    source_code_link:
      "https://play.google.com/store/apps/details?id=com.link.reminder",
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

export {
  services,
  technologies,
  skillCategories,
  experiences,
  testimonials,
  projects,
};

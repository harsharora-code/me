import { Icons } from "@/components/icons";
import { url } from "inspector";
import { HomeIcon,  FileText, icons } from "lucide-react";
import { title } from "process";

export const DATA = {
  name: "harsh Arora",
  initials: "HA",
  url: "",
  location: "Chennai, India",
  locationLink: "https://www.google.com/maps/place/chennai",
  description:
    "Full-Stack Developer, learning and building",
  summary:
    "Enthusiastic Computer Science student with strong DSA fundamentals and experience in developing user-focused scalable systems. Adaptable, curious, and collaborative with excellent communication and problem-solving skills.",
  avatarUrl: "/harsh.jpeg",
  skills: [
    "React",
    "Next.js",
    "Javascript",
    "Typescript",
    "Node.js",
    "Python",
    "Postgres",
     "Prisma",
     "Docker",
     "Java",
     "C++",
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "https://drive.google.com/file/d/1miwFfHjtShyAMmMz7cAccJBdvwZ2FY9A/view?usp=sharing", icon: FileText, label: "Resume" },
    
  ],
  contact: {
    email: "hello@example.com",
    tel: "+91-9079388017",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/harsharora-code",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://linkedin.com/in/harsharora-in",
        icon: Icons.linkedin,

        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com/Harsh_Arora29",
        icon: Icons.x,

        navbar: true,
      },
      leetcode: {
        name: "LeetCode",
        url: "https://leetcode.com/ha5124",
        icon: Icons.Leetcode,
        navbar: true,
      },
 email: {
  name: "Send Email",
  url: "mailto:harshpunyani24@gmail.com",
  icon: Icons.email,
  navbar: true,
},


    },
  },

  work: [
   
  ],
  education: [
    
    {
      school: "SRM Institute of Science and Technology",
      href: "https://srmist.edu.in",
      degree: "Bachelor's Degree of Computer Science",
      logoUrl: "/srmist-logo.png",
      start: "2023",
      end: "2025",
    },
    {
      school: "Vivekanand Memorial Public School",
      href: "https://vmpsschool.com",
      degree: "High School",
      logoUrl: "/vmps.jpeg",
      start: "2018",
      end: "2022",
    },
  ],
  projects: [
    {
      title: "Payn",
      href: "null",
      dates: "Sep-2025",
      active: true,
      description:
        "",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
      ],
      links: [
        {
          type: "Working",
          href: "null",
          icon: <Icons.globe className="size-3" />,
        },
        {
          type: "Source",
          href: "https://github.com/harsharora-code/Payn",
          icon: <Icons.github className="size-3"/>,
        }
      ],
      image: "/payn.png",
      video:
        "null",
    },
    {
      title: "Second Brain",
      href: "null",
      dates: "Sep-2025",
      active: true,
      description:
        "",
      technologies: [
        "React.js",
        "Typescript",
        "MongoDB",
        "TailwindCSS",
        "Shadcn UI",
      ],
      links: [

        {
          type: "Source",
          href: "https://github.com/harsharora-code/second-Brain",
          icon: <Icons.github className="size-3" />,
        },

      ],
      image: '/s-brain.png',
      video: "null",
      
    
    },
   
    {
      title: "Float Chat",
      href: "null",
      dates: "April 2023 - March 2024",
      active: true,
      description:
        "Developed an AI-powered chatbot and interactive dashboard to simplify querying, analyzing, and visualizing ARGO ocean data using LLMs, RAG, SQL, and geospatial analytics.",
      technologies: [
        "Next.js",
        "Typescript",
        "PostgreSQL",
        "Prisma",
        "TailwindCSS",
        "Shadcn UI",
        "Magic UI",
        "Stripe",
        "Cloudflare Workers",
      ],
      links: [
        {
          type: "Source",
          href: "null",
          icon: <Icons.github className="size-3" />,
        },
      ],
      image: "/floatchat.png",
      video:
        "null",
    },
  ],
  hackathons: [
    {
      title: "Smart India Hackathon",
      dates: "September 15th - 19th, 2025",
      location: "Chennai, India",
      description:
        "Developed an AI-powered chatbot and interactive dashboard to simplify querying, analyzing, and visualizing ARGO ocean data using LLMs, RAG, SQL, and geospatial analytics.",
      image:
        "https://i0.wp.com/opportunitycell.com/wp-content/uploads/2022/03/SIH2.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [
         {
          title: "Source",
          icon: <Icons.github className="h-4 w-4" />,
          href: "https://github.com/harsharora-code/ChatBot-UI",
        },
      ],
    },
   
    {
      title: "Amazon HackOn Season 5",
      dates: "June 1st - 15th, 2025",
      location: "Remote",
      description:
        "Developed a movie recommendation platform that suggests personalized films to users across multiple streaming services.",
      icon: "public",
      image:
        "/hack-on.jpg",
      links: [],
    },
    
  ],
} as const;

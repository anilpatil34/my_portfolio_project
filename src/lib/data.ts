// ============================================================
// PORTFOLIO DATA — Edit this file to personalize your portfolio
// ============================================================

export const personalInfo = {
  name: "Anil Patil",
  firstName: "Anil",
  lastName: "Patil",
  title: "Full Stack Developer",
  subtitle: "Building Ideas Into Real-World Products",
  bio: "Passionate about creating elegant, performant, and user-centric web applications. I specialize in Python, Django, React, Next.js, Node.js and TypeScript — turning complex problems into clean, scalable solutions.",
  location: "Pune Maharashtra, India",
  email: "anilpatil0955@gmail.com",
  phone: "+91 6352447852",
  resumeUrl: "/resume.pdf",
  avatarUrl: "/images/profile.png",
};

export const aboutData = {
  paragraphs: [
    "Hi! I'm Anil Patil, a full-stack developer with a passion for building modern web applications that solve real-world problems. With expertise spanning both frontend and backend technologies, I create seamless digital experiences from concept to deployment.",
    "I thrive on transforming ideas into production-ready applications using cutting-edge technologies. Whether it's crafting pixel-perfect UIs with React and TypeScript or architecting robust APIs with Node.js, I bring dedication and creativity to every project.",
    "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, and sharing knowledge with the developer community.",
  ],
  stats: [
    { label: "Projects Completed", value: "15+" },
    { label: "Technologies", value: "20+" },
  ],
};

export type Skill = {
  name: string;
  icon: string;
  level: number; // 0-100
};

export type SkillCategory = {
  title: string;
  skills: Skill[];
};

export const skillsData: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: "⚛️", level: 92 },
      { name: "Next.js", icon: "▲", level: 88 },
      { name: "TypeScript", icon: "🔷", level: 90 },
      { name: "JavaScript", icon: "🟨", level: 95 },
      { name: "Tailwind CSS", icon: "🎨", level: 90 },
      { name: "HTML/CSS", icon: "🌐", level: 95 },
      { name: "Framer Motion", icon: "🎬", level: 82 },
      { name: "Redux", icon: "🔄", level: 80 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: "🟢", level: 88 },
      { name: "Express.js", icon: "🚂", level: 85 },
      { name: "Python", icon: "🐍", level: 90 },
      { name: "Django", icon: "🎯", level: 90 },
      { name: "MongoDB", icon: "🍃", level: 85 },
      { name: "PostgreSQL", icon: "🐘", level: 82 },
      { name: "REST APIs", icon: "🔗", level: 90 },
      { name: "GraphQL", icon: "◈", level: 75 },
    ],
  },
  {
    title: "Tools & DevOps",
    skills: [
      { name: "Git & GitHub", icon: "🐙", level: 90 },
      { name: "Docker", icon: "🐳", level: 78 },
      { name: "VS Code", icon: "💻", level: 95 },
      { name: "Vercel", icon: "▲", level: 88 },
      { name: "AWS", icon: "☁️", level: 72 },
      { name: "Figma", icon: "🎨", level: 80 },
      { name: "Postman", icon: "📬", level: 85 },
      { name: "Linux", icon: "🐧", level: 78 },
    ],
  },
];

export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  featured: boolean;
};

export const projectsData: Project[] = [
  {
    id: "ai-career-copilot",
    title: "AI Career Copilot – Resume Analyzer & Job Assistant",
    description:
      "An AI-powered web application that helps users analyze resumes, match them with job descriptions, and identify skill gaps with personalized improvement suggestions.",
    longDescription:
      "An AI-powered web application that helps users analyze resumes, match them with job descriptions, and identify skill gaps. It provides personalized improvement suggestions, learning roadmaps, and career guidance using AI (Grok API). The goal is to enhance job readiness and increase chances of getting selected by aligning resumes with industry requirements. Features include PDF parsing, JWT authentication, and CI/CD with GitHub Actions.",
    techStack: ["Python", "Django", "Django REST Framework", "React.js", "MySQL", "Grok API", "JWT Auth", "Axios", "PyMuPDF", "GitHub Actions"],
    githubUrl: "https://github.com/anilpatil34/ai-career-copilot.git",
    liveUrl: "https://ai-career-copilot-phi.vercel.app",
    imageUrl: "/images/ai-sowered-prep-the-key-to-success-in-tech-job-interviews.webp",
    featured: true,
  },
  {
    id: "realtime-chat-system",
    title: "Real-Time Chat & Notification System",
    description:
      "A scalable real-time chat application enabling instant 1-to-1 and group messaging using WebSockets with live user presence and notifications.",
    longDescription:
      "Built a scalable real-time chat application enabling instant 1-to-1 and group messaging using WebSockets (Django Channels). Implemented live user presence, notifications, and message features like read receipts and typing indicators. Designed to deliver seamless communication with a modern UI (Next.js, Tailwind CSS, Framer Motion) and high-performance backend architecture using Redis, Docker, and NGINX.",
    techStack: ["Python", "Django", "Django Channels", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "MySQL", "Redis", "JWT Auth", "Docker", "NGINX", "GitHub Actions"],
    githubUrl: "https://github.com/anilpatil34/realtime-chat-system.git",
    liveUrl: "https://realtime-chat-system-neon.vercel.app",
    imageUrl: "/images/chat-support-feature-an-illustration-of-a-chat-window-on-a-trading-platform-where-a-trader-is-receiving-realtime-support-from-a-digital-assis.jpg",
    featured: true,
  }, 
  {
    id: "smart-task-management",
    title: "Smart Task Management System (SaaS Platform)",
    description:
      "A scalable SaaS-based task management platform to streamline team collaboration, task tracking, and productivity monitoring with real-time updates.",
    longDescription:
      "Developed a scalable SaaS-based task management platform to streamline team collaboration, task tracking, and productivity monitoring. Enabled real-time task assignment, deadline management, and role-based access for teams. Integrated analytics and automated reminders using Celery and Redis to improve efficiency and ensure timely task completion. Built with a modern Next.js frontend and Django REST backend with JWT authentication.",
    techStack: ["Python", "Django", "Django REST Framework", "Next.js", "TypeScript", "Tailwind CSS", "MySQL", "Celery", "Redis", "JWT Auth", "Docker", "NGINX", "GitHub Actions"],
    githubUrl: "https://github.com/anilpatil34/taskflow-saas.git",
    liveUrl: "https://taskflow-saas-six.vercel.app",
    imageUrl: "/images/c7bbcadf-23fd-4992-8741-e2f2daaa68c0-cover.png",
    featured: true,
  },
];

export type TimelineEntry = {
  id: string;
  type: "education" | "experience";
  title: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
};

export const timelineData: TimelineEntry[] = [
  {
  id: "exp-6 months",
  type: "experience",
  title: "Python Full Stack Developer Intern",
  organization: "Kiran Academy",
  location: "Pune, Maharashtra",
  startDate: "Aug 2025",
  endDate: "Feb 2026",
  description:
    "Completed a 6-month internship in Python Full Stack Development, gaining hands-on experience in building scalable and responsive web applications using modern technologies.",
  highlights: [
    "Worked on real-world full stack projects focusing on user interaction, responsiveness, and performance optimization using Python, Django, React.js, and MySQL",
    
    "AI Career Copilot – Resume Analyzer & Job Assistant: Built an AI-powered platform to analyze resumes, identify skill gaps, and improve job readiness using intelligent recommendations | Tech Stack: Django, React.js, MySQL, AI APIs",
    
    "Real-Time Chat & Notification System: Developed a scalable real-time communication system enabling instant messaging, live presence tracking, and notifications | Tech Stack: Django Channels, React.js, Redis, WebSockets",
    
    "Smart Task Management System (SaaS Platform): Created a SaaS-based task management application to streamline team collaboration, task tracking, and productivity monitoring | Tech Stack: Django, Next.js, MySQL, Celery, Redis"
  ],
},
  {
  id: "exp-2",
  type: "experience",
  title: "Python Full Stack Developer Intern",
  organization: "Orrizont Consultancy Services",
  location: "Dhule, Maharashtra",
  startDate: "Mar 2024",
  endDate: "Sep 2024",
  description:
    "Completed a 6-month internship in Python Full Stack Development, gaining hands-on experience in building scalable, user-friendly web applications and working in a team using SDLC practices and version control systems.",
  highlights: [
    "Worked on real-world industry projects using Python, Django, HTML, CSS, Bootstrap, and MySQL with focus on responsive and mobile-friendly UI",
    
    "Collaborated with team members using Git and GitHub, following SDLC principles for efficient project development and version control",
    
    "ZennMentor (Career Guidance Portal): Developed a platform connecting students with industry experts for career guidance with separate admin and student dashboards",
    
    "Implemented role-based authentication system with secure login for admin and students, along with personalized dashboards",
    
    "Built scalable backend using Django and designed interactive frontend ensuring smooth user experience across devices"
  ],
},
  {
  id: "edu-1",
  type: "education",
  title: "Bachelor of Engineering (Computer Science)",
  organization: "Gangamai College of Engineering",
  location: "Dhule, Maharashtra",
  startDate: "Aug 2021",
  endDate: "Aug 2026",
  description:
    "Pursuing B.E in Computer Science and Engineering with a strong foundation in core computer science fundamentals, software development, and problem-solving.",
  highlights: [
    "CGPA: 8.30/10",
    "Participated in coding challenges and technical events",
    "Built AI-based and problem-solving projects as part of academic learning",
  ],
},
  {
    id: "edu-2",
    type: "education",
    title: "Higher Secondary School",
    organization: "DR. V M. JAIN SEC. SCH. School",
    location: "Parola, Maharashtra",
    startDate: "May 2019",
    endDate: "Jun 2021",
    description:
      "Completed Higher Secondary Education with a strong foundation in science and mathematics.",
    highlights: [
      "HSC: Score 87.50%",
      "SSC: Score 70.83%"
    ],
  },
];

export type Achievement = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  icon: string;
  link?: string;
};

export const achievementsData: Achievement[] = [
  {
    id: "ach-1",
    title: "Python Full Stack Development",
    issuer: "Kiran Academy",
    date: "2026",
    description: "Completed Python Full Stack Development course with hands-on experience in building scalable and responsive web applications.",
    icon: "🎓",
    link: "https://drive.google.com/file/d/1ut3ikkWxxWJ740T1YAXKSd0qaXMZZKSp/view?usp=sharing",
  },
  {
    id: "ach-2",
    title: "Python Full Stack Developer Intern",
    issuer: "Kiran Academy",
    date: "2026",
    description: "Completed 6 months internship in Python Full Stack Development, gaining hands-on experience in building scalable and responsive web applications.",
    icon: "🏆",
    link: "https://drive.google.com/file/d/1DVzILyhCb9de-96NNsY90lrQCrfjKUG_/view?usp=sharing",
  },
  {
    id: "ach-3",
    title: "Web Development Intern",
    issuer: "Orrizont Consultancy Services",
    date: "2024",
    description: "Completed 6 months internship in Web Development, gaining hands-on experience in building scalable and responsive web applications.",
    icon: "🏆",
    link: "https://drive.google.com/file/d/1NApRoKi418oi3VuBxRoax15-KMu_fd4j/view?usp=sharing",
  },
  {
    id: "ach-4",
    title: "HackerRank Problem Solving Certification",
    issuer: "HackerRank",
    date: "2026",
    description: "Completed HackerRank Problem Solving Certification with hands-on experience in solving complex python problems and mysql complex databse queries solving.",
    icon: "🌟",
    link: "https://drive.google.com/file/d/1wxg9Y4TbX7RP3YxLl7QutEIdOLj4RSEN/view?usp=sharing",
  },
];

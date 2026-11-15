// ─────────────────────────────────────────────────────────────
//  YOUR CV LIVES HERE.
//  Fill every field from the CV you were given.
//  The pages read from this file, so you never hard-code CV text
//  inside a component. Add or remove items freely.
//
//  ⚠️  EVERYTHING BELOW IS SAMPLE CONTENT. Replace it with the real CV.
//
//  Fields marked (optional) can be deleted or left "" and the design
//  simply hides them.
// ─────────────────────────────────────────────────────────────

export const cv = {
  name: "Your Name",
  title: "Software Engineering Student",
  location: "Riyadh, Saudi Arabia",
  summary:
    "I design and build fast, accessible web products, from the first sketch to the deployed app. I care about clean code, clear interfaces and shipping things people actually use. Currently looking for a summer internship in frontend or full-stack development.",

  // (optional) Short status shown in the hero with a live green dot.
  status: "Open to internships · Summer 2027",

  contact: {
    email: "you@example.com",
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/your-username",
    phone: "", // (optional)
  },

  // Put your CV PDF in the /public folder and write its file name here.
  // Leave it as "" to hide the "Download CV" button.
  cvFile: "",

  education: [
    {
      degree: "B.Sc. in Software Engineering",
      school: "Al Yamamah University",
      period: "2023 – 2027",
      details: "GPA 3.8 / 4.0 · Dean's List · Relevant courses: Data Structures, Web Engineering, HCI.",
    },
  ],

  experience: [
    {
      role: "Frontend Developer Intern",
      company: "Company Name",
      period: "Jun 2026 – Aug 2026",
      points: [
        "Rebuilt the customer dashboard in React, cutting load time by 40%.",
        "Shipped 12 reusable UI components adopted by three product teams.",
        "Worked in two-week sprints with designers and backend engineers.",
      ],
    },
    {
      role: "Teaching Assistant, Intro to Programming",
      company: "Al Yamamah University",
      period: "Sep 2025 – May 2026",
      points: [
        "Ran weekly lab sessions for 60+ first-year students.",
        "Wrote auto-graded Python exercises used across four sections.",
      ],
    },
  ],

  // Each project gets its own page at /projects/<slug>.
  // slug = short, lowercase, words joined with "-" (used in the URL).
  // `description` can have several paragraphs: separate them with a blank line (\n\n).
  projects: [
    {
      slug: "weather-app",
      name: "Weather App",
      year: "2026", // (optional)
      role: "Solo project", // (optional)
      summary: "A clean, location-aware forecast app with hourly and 7-day views.",
      description:
        "People open a weather app for one answer: do I need a jacket? Most apps bury that under ads and clutter.\n\nI built a focused forecast app that detects your location, shows the next 12 hours at a glance and explains the week in plain language. It caches results so it works on slow connections.\n\nI learned how to design around a single user question and how to handle API rate limits gracefully.",
      highlights: [ // (optional)
        "Loads in under 1 second on 4G",
        "Fully keyboard and screen-reader accessible",
      ],
      tech: ["Next.js", "Tailwind CSS", "OpenWeather API"],
      demo: "",
      repo: "https://github.com/your-username/weather-app",
    },
    {
      slug: "task-manager",
      name: "Task Manager",
      year: "2025",
      role: "Team of 3 · Backend lead",
      summary: "A collaborative board for student teams to plan and track group projects.",
      description:
        "Group projects fall apart when nobody knows who is doing what.\n\nOur team built a Kanban-style board with shared workspaces, deadlines and activity history. I designed the database schema and the REST API.\n\nThe project taught me how to split work across a team and review each other's code.",
      highlights: ["Used by 40+ students in a pilot", "REST API with JWT auth"],
      tech: ["React", "Node.js", "MongoDB"],
      demo: "",
      repo: "",
    },
    {
      slug: "campus-events",
      name: "Campus Events",
      year: "2025",
      role: "Hackathon · 48 hours",
      summary: "One place to discover clubs, talks and events happening on campus this week.",
      description:
        "Campus events were scattered across group chats and posters.\n\nIn 48 hours we built a mobile-first site that collects events in one feed with filters by day and category, plus an Arabic / English toggle.",
      highlights: ["1st place, university hackathon", "Bilingual (Arabic / English)"],
      tech: ["Next.js", "Firebase", "Tailwind CSS"],
      demo: "",
      repo: "",
    },
    {
      slug: "budget-buddy",
      name: "Budget Buddy",
      year: "2024",
      role: "Solo project",
      summary: "A simple expense tracker that turns spending into clear weekly charts.",
      description:
        "I wanted to understand where my money went each month without a complicated app.\n\nBudget Buddy lets you log an expense in two taps and see weekly trends as charts. All data stays on your device.",
      tech: ["React", "Chart.js", "Python"],
      demo: "",
      repo: "",
    },
  ],

  skills: [
    { group: "Languages", items: ["JavaScript", "TypeScript", "Python", "SQL", "Java"] },
    { group: "Frameworks", items: ["React", "Next.js", "Tailwind CSS", "Node.js", "Express"] },
    { group: "Tools", items: ["Git", "GitHub", "Figma", "Firebase", "Docker"] },
    { group: "Soft skills", items: ["Teamwork", "Public speaking", "Mentoring"] },
  ],

  achievements: [
    { title: "Hackathon winner", detail: "University Hackathon 2025 · 1st place for Campus Events." },
    { title: "Dean's List", detail: "Al Yamamah University · 4 semesters." },
    { title: "Meta Front-End Developer Certificate", detail: "Coursera, 2025." },
  ],

  // (optional) Languages you speak.
  languages: ["Arabic (native)", "English (fluent)"],
};

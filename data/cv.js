// ─────────────────────────────────────────────────────────────
//  YOUR CV LIVES HERE: the single source of truth for the site.
//  Every page reads from this file. Nothing is hard-coded elsewhere.
//
//  Source: "Yara_Al-Mansouri_CV.pdf" (Portfolio Summit 2026, fictional CV).
//  All organizations, domains, credential IDs and contact details are
//  fictional, exactly as supplied in the CV.
//
//  IMAGES
//  Put project images in /public/images/<folder>/ using the file names
//  listed under each project's `images`. Any extension works
//  (.png, .jpg, .jpeg, .webp, .avif). If a file is missing, the site shows
//  the project's designed artwork cover instead, so nothing ever breaks.
// ─────────────────────────────────────────────────────────────

export const cv = {
  name: "Yara Saud Al-Mansouri",
  shortName: "Yara",
  credentials: "PhD",
  monogram: "YA",
  nameArabic: "يارا",
  titles: ["Principal Product Engineer", "Design Technology Lead", "HCI Researcher"],
  title: "Principal Product Engineer | Design Technology Lead | HCI Researcher",
  location: "Riyadh, Saudi Arabia",
  summary:
    "Product engineer and designer with 16 years of professional experience building digital products in Saudi Arabia and the United Kingdom, across health tech, fintech, education and mobility. Leads teams from first research to launch while still designing and writing code every week.",
  intro:
    "I lead product teams from first research to launch, and I still design and write code every week.",

  // The CV's contact details are fictional (.example domains).
  // Set `contactIsLive` to true only when they are replaced with real ones:
  // links then become clickable. While false they are shown as text.
  contactIsLive: false,
  contact: {
    email: "yara.almansouri@mail.example",
    phone: "+966 55 000 0000",
    links: [
      { label: "Portfolio", url: "https://yara.example" },
      { label: "LinkedIn", url: "https://linkedin.example/in/yaramansouri" },
      { label: "GitHub", url: "https://github.example/yara-mansouri" },
      { label: "Dribbble", url: "https://dribbble.example/yaram" },
      { label: "Behance", url: "https://behance.example/yaram" },
      { label: "Medium", url: "https://medium.example/@yaram" },
      { label: "Google Scholar", url: "https://scholar.example/yaram" },
      { label: "YouTube", url: "https://youtube.example/@YaraBuilds" },
    ],
  },

  // The PDF in /public. Leave "" to hide the résumé buttons.
  cvFile: "Yara_Al-Mansouri_CV.pdf",

  // ── Page text ──
  // Every heading and line of text on the site lives here too, so this file
  // holds everything a visitor reads. Section `label` is the big "01 / Work" tag.
  site: {
    heroKicker: "Portfolio · 16 years of product work",
    heroLine: "40+ products across health tech, fintech, education and mobility, used by over 9 million people.",
    heroCtaWork: "Explore my work",
    heroCtaResume: "View résumé",
    sections: {
      work: {
        index: "01",
        label: "Work",
        title: "Selected work.",
        intro: "Eight projects, from design systems to national health care. Scroll, swipe or drag through them, or pick a category. Each one opens a full case study.",
        hint: "Scroll, drag or use ← → to browse. Click a project to open its case study.",
      },
      about: {
        index: "02",
        label: "About",
        title: "Designer, engineer, researcher, leader.",
        languages: "Languages",
        interests: "Outside work",
      },
      experience: {
        index: "03",
        label: "Experience",
        title: "Sixteen years, twelve roles.",
        intro: "From freelance design at university to leading 64 people. Open any role for the details.",
      },
      skills: {
        index: "04",
        label: "Skills",
        title: "What I work with.",
        intro: "Ten areas, with the proficiency level and years of experience stated in my CV.",
      },
      research: {
        index: "05",
        label: "Research",
        title: "Education & research.",
        intro: "A PhD in Human-Computer Interaction focused on Arabic interfaces, built on a career-long habit of learning.",
        patents: "Patents",
        publications: "Publications",
        certifications: "Certifications",
        certificationsNote: "19 earned, 1 in progress. Issuers and credential IDs are fictional.",
      },
      recognition: {
        index: "06",
        label: "Recognition",
        title: "Recognition.",
        intro: "Awards, talks, media, teaching and the communities I give time to.",
        speaking: "Speaking",
        media: "Media",
        community: "Teaching, leadership & volunteering",
        communityNote: "Held alongside the full-time roles above.",
      },
      contact: {
        index: "07",
        label: "Contact",
        title: "Let's build something",
        titleEmphasis: "together.",
        text: "Based in Riyadh, Saudi Arabia. The fastest way to reach me is email.",
        fictionalNote: "These are the fictional contact details from the Portfolio Summit CV, shown as text rather than links.",
      },
    },
    caseStudy: {
      back: "Back to all projects",
      backShort: "All projects",
      conceptNote: "Visuals on this page are conceptual product visualizations, not production screenshots.",
    },
    footer: "Portfolio Summit 2026 · fictional CV; project visuals are concepts.",
  },

  // ── Career highlights (animated counters on the home page) ──
  stats: [
    { value: 16, label: "Years of experience", note: "Since Jul 2010" },
    { value: 40, suffix: "+", label: "Products shipped" },
    { value: 9, suffix: "M+", label: "People reached" },
    { value: 64, label: "People led", note: "Across 7 squads" },
    { value: 2, label: "Startups co-founded", note: "1 acquired, 1 closed" },
    { value: 2, label: "Patents", note: "1 granted, 1 pending" },
    { value: 9, label: "Publications" },
    { value: 31, label: "Talks & keynotes" },
  ],
  extraHighlights: [
    "Taught 1,400 university students",
    "19 certifications earned, 1 in progress",
  ],

  // ── About (all statements taken from the CV) ──
  about: [
    {
      title: "Background",
      text: "16 years building digital products in Saudi Arabia and the United Kingdom, across health tech, fintech, education and mobility. Started as a freelance designer while studying, then worked in agencies in Riyadh and London.",
    },
    {
      title: "How I work",
      text: "I lead teams from first research to launch while still designing and writing code every week, from audits of 1,300 screens to the components themselves.",
    },
    {
      title: "Design & engineering",
      text: "Expert in product design (18 years) and front-end engineering (16 years). Shipped more than 40 products used by over 9 million people.",
    },
    {
      title: "Leadership",
      text: "Led up to 64 people across 7 squads with an annual budget of SAR 21 million, and co-founded two startups: one acquired, one closed.",
    },
    {
      title: "Research",
      text: "PhD in Human-Computer Interaction focused on Arabic interfaces: adaptive typography, readability, density and trust. 9 publications and 2 patents.",
    },
  ],

  // ── Experience (every role from the CV, newest first) ──
  experience: [
    {
      role: "Principal Product Engineer & Design Technology Lead",
      company: "Faseela Ventures",
      location: "Riyadh, Saudi Arabia",
      period: "Sep 2023 – Present",
      points: [
        "Set the front-end and design-system direction for 9 product teams across payments, savings and rewards in a fintech super-app with 4.2 million users.",
        "Built Mizan, the company's bilingual design system: 180 components adopted by all 9 teams, cutting UI build time by 38%.",
        "Led the rebuild of the web app in Next.js and TypeScript, reducing Largest Contentful Paint from 4.8 s to 1.6 s.",
        "Introduced accessibility reviews for every release, raising screens that meet WCAG 2.2 AA from 41% to 96%.",
        "Designed the Savings Goals feature from research in 5 cities; 610,000 users opened a goal in its first 6 months.",
      ],
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "React Native", "GraphQL", "AWS"],
      projects: ["mizan-design-system", "savings-goals"],
    },
    {
      role: "Director of Product Engineering",
      company: "Zayna Health Tech",
      location: "Riyadh, Saudi Arabia",
      period: "Mar 2021 – Aug 2023",
      points: [
        "Led 64 people across 7 squads (engineering, design, quality and data) with an annual budget of SAR 21 million.",
        "Launched the telemedicine platform at national scale, delivering 3.1 million consultations in 2022.",
        "Cut the app crash rate from 2.4% to 0.3% and raised the app-store rating from 3.6 to 4.7.",
        "Took the platform through two health-data security audits with zero major findings.",
      ],
      tech: ["React", "React Native", "Node.js", "PostgreSQL", "Google Cloud", "Kubernetes"],
      projects: ["telemedicine-platform"],
    },
    {
      role: "Engineering Manager, Patient Apps",
      company: "Zayna Health Tech",
      location: "Riyadh, Saudi Arabia",
      period: "Jan 2019 – Feb 2021",
      points: [
        "Grew the patient apps team from 6 to 22 people; hired and mentored 4 team leads.",
        "Shipped appointment booking used by 1.8 million patients across 140 clinics.",
        "Shortened the release cycle from 6 weeks to 1 week with CI/CD and feature flags.",
      ],
    },
    {
      role: "Senior Front-End Engineer",
      company: "Zayna Health Tech",
      location: "Riyadh, Saudi Arabia",
      period: "Jul 2017 – Dec 2018",
      points: [
        "Rebuilt the clinic dashboard in React, cutting doctors' average task time by 27%.",
        "Created the first shared component library, which later grew into the Zayna design system.",
      ],
    },
    {
      role: "Co-founder (part-time)",
      company: "Qalam Learn",
      location: "Riyadh, Saudi Arabia",
      period: "Feb 2019 – Nov 2022",
      points: [
        "Co-founded an Arabic-first coding education platform that reached 230,000 learners in 14 countries.",
        "Designed and built its interactive code editor, which explains errors in plain Arabic.",
        "Grew the team to 9 people and led product until the company was acquired by Mirqab Group in Nov 2022.",
      ],
      tech: ["Vue", "TypeScript", "Monaco Editor", "Firebase"],
      projects: ["qalam-learn"],
    },
    {
      role: "Career Break",
      company: "Family relocation and volunteering",
      location: "Riyadh, Saudi Arabia",
      period: "Jan 2017 – Jun 2017",
      points: [
        "Taught a 12-week web development course to 45 adult learners with the Code for Community initiative.",
      ],
    },
    {
      role: "Co-founder & Chief Technology Officer",
      company: "Rafeeq Rides",
      location: "Riyadh, Saudi Arabia",
      period: "Apr 2015 – Dec 2016",
      points: [
        "Built a ride-sharing app for university students: 26,000 sign-ups and 140,000 rides in 20 months.",
        "Raised SAR 3.5 million in seed funding and led a team of 11.",
        "Closed the company in Dec 2016 after a market change and wrote a public post-mortem read by 80,000 people.",
      ],
      tech: ["React Native", "Node.js", "MongoDB", "Google Maps APIs"],
      projects: ["rafeeq-rides"],
    },
    {
      role: "Senior UX Engineer",
      company: "Brightwell Studio",
      location: "London, United Kingdom",
      period: "Jun 2014 – Mar 2015",
      points: [
        "Led the studio's first Arabic, right-to-left project, for a Gulf travel client.",
        "Mentored 3 junior designers and ran the studio's monthly front-end guild.",
      ],
    },
    {
      role: "UX Engineer",
      company: "Brightwell Studio",
      location: "London, United Kingdom",
      period: "Oct 2012 – May 2014",
      points: [
        "Designed and built responsive websites for 14 clients in retail, banking and the public sector.",
        "Delivered 2 projects that won industry awards (see Recognition).",
      ],
    },
    {
      role: "Research Assistant (part-time)",
      company: "University of Northbridge, Interaction Lab",
      location: "Northbridge, United Kingdom",
      period: "Jan 2012 – Sep 2012",
      points: [
        "Ran 30 usability sessions for a study on bilingual navigation menus and co-authored a technical report.",
      ],
    },
    {
      role: "Junior Web Developer",
      company: "Mirqab Digital Agency",
      location: "Riyadh, Saudi Arabia",
      period: "Jul 2010 – Aug 2011",
      points: [
        "Built more than 20 websites in HTML, CSS, jQuery and PHP for local businesses and event organizers.",
      ],
      tech: ["HTML", "CSS", "jQuery", "PHP"],
    },
    {
      role: "Freelance Graphic and Web Designer (part-time)",
      company: "Self-employed",
      location: "Riyadh, Saudi Arabia",
      period: "Sep 2008 – Jun 2010",
      points: [
        "Designed logos, printed material and websites for 35 clients while at university.",
      ],
    },
  ],

  // ── Projects ──
  // flagship: true  → large editorial treatment on the home page.
  // art             → colors + motif for the designed cover shown when an image is missing.
  // images          → [0] is the cover and main visual; the rest appear through the case study.
  //   file: path inside /public/images WITHOUT extension.
  //   device: "desktop" | "mobile" (mobile shots get a phone frame).
  //   section: where it appears in the case study (overview | approach | solution | results).
  projects: [
    {
      slug: "mizan-design-system",
      name: "Mizan Design System",
      nameArabic: "ميزان",
      flagship: true,
      category: "Design Systems",
      organization: "Faseela Ventures",
      period: "Oct 2023 – Jun 2025",
      role: "Lead designer and engineer",
      team: "Team of 6",
      summary: "A bilingual design system with 180 components, adopted by all nine product teams of a fintech super-app.",
      overview:
        "Mizan is the bilingual design system of Faseela Ventures, a fintech super-app with 4.2 million users. It gave 9 product teams across payments, savings and rewards one shared set of tokens and components in Figma and in code.",
      responsibilities: [
        "Set the front-end and design-system direction for 9 product teams.",
        "Audited 1,300 screens and defined the design tokens.",
        "Built and documented the components in Figma and code.",
        "Introduced accessibility reviews for every release.",
      ],
      problem: "9 product teams built the same interface parts in different ways, with 4 button styles and 11 shades of green.",
      approach: "Audited 1,300 screens, defined design tokens, and built and documented the components in Figma and code.",
      solution: "A bilingual system of 180 components adopted by all 9 teams, with accessibility reviews on every release.",
      results: [
        { value: "180", label: "Components", detail: "Adopted by all 9 product teams" },
        { value: "38%", label: "Faster UI build time" },
        { value: "41% → 96%", label: "Screens meeting WCAG 2.2 AA" },
        { value: "1,300", label: "Screens audited" },
      ],
      recognition: "Design Technology Leader of the Year, Gulf Design Week Awards 2025",
      tech: ["React", "TypeScript", "Tailwind CSS", "Storybook", "Figma tokens"],
      art: { bg: "#1f3d2b", fg: "#e8f0d8", accent: "#9fd36b", motif: "grid" },
      images: [
        { file: "mizan/Mizanabdul3DesignSystemOverview", alt: "Mizan design system overview: foundations, colors, typography and components on one board", caption: "Design system overview", section: "overview" },
        { file: "mizan/Mizanabdul2ComponentLibrary", alt: "Mizan component library showing buttons, inputs, cards and navigation in English and Arabic", caption: "Component library", section: "approach" },
        { file: "mizan/Mizanabdul1DesignAndTokens", alt: "Mizan design tokens for color, spacing and type, with accessibility contrast checks", caption: "Design tokens and accessibility", section: "solution" },
      ],
    },
    {
      slug: "telemedicine-platform",
      name: "National Telemedicine Platform",
      flagship: true,
      category: "Health Tech",
      organization: "Zayna Health Tech",
      period: "May 2021 – Dec 2022",
      role: "Product engineering lead",
      team: "Team of 31",
      summary: "A national-scale video consultation platform that delivered 3.1 million consultations in 2022.",
      overview:
        "Zayna Health Tech's telemedicine platform connects patients and doctors through video consultations. Launched at national scale, it delivered 3.1 million consultations in 2022.",
      responsibilities: [
        "Led the redesign of the patient queue, the doctor console and the video layer.",
        "Led the product engineering team of 31 people.",
        "Took the platform through two health-data security audits with zero major findings.",
      ],
      problem: "Patients waited an average of 22 minutes for a video consultation, and 1 in 5 calls dropped.",
      approach: "Led the redesign of the patient queue, the doctor console and the video layer.",
      solution: "A redesigned queue, a new doctor console and a more reliable video layer, across web and mobile apps.",
      results: [
        { value: "3.1M", label: "Consultations in 2022" },
        { value: "22 → 6", unit: "min", label: "Average wait time" },
        { value: "20% → 3%", label: "Dropped calls" },
        { value: "0", label: "Major findings in 2 health-data security audits" },
      ],
      recognition: "Digital Health Innovation Award, Middle East Health Informatics Board 2021",
      tech: ["React", "React Native", "WebRTC", "Node.js", "Google Cloud"],
      art: { bg: "#0f3b4a", fg: "#e2f3f5", accent: "#5fd0c8", motif: "pulse" },
      images: [
        { file: "telemedicine/TelemedicineDoctorsComputerPerspective", alt: "Doctor console showing the patient queue and consultation details on a desktop screen", caption: "Doctor console", section: "overview" },
        { file: "telemedicine/TelemedicineConsultationOnComputer", alt: "Video consultation interface on a computer, with the patient on video and notes beside it", caption: "Video consultation", section: "approach" },
        { file: "telemedicine/TelemedicineMobilePatientHomeScreen", alt: "Patient mobile app home screen with upcoming consultation and booking options", caption: "Patient home screen", device: "mobile", section: "solution" },
        { file: "telemedicine/TelemedicineMobileConsultationCall", alt: "Patient mobile video call with a doctor", caption: "Mobile consultation call", device: "mobile", section: "solution" },
        { file: "telemedicine/TelemedicineStatistics", alt: "Statistics dashboard showing consultation volume, wait times and call reliability", caption: "Platform statistics", section: "results" },
      ],
    },
    {
      slug: "savings-goals",
      name: "Savings Goals",
      flagship: true,
      category: "Fintech",
      organization: "Faseela Ventures",
      period: "Jan 2024 – Aug 2024",
      role: "Research and design lead",
      team: "Team of 8",
      summary: "A goal-setting feature designed from 48 user interviews in five cities: 610,000 goals opened in six months.",
      overview:
        "Savings Goals is a feature of Faseela Ventures' fintech super-app that helps users set a goal and save towards it. It was designed from research in 5 cities.",
      responsibilities: [
        "Led the research: 48 interviews in 5 cities.",
        "Tested 3 prototypes with users.",
        "Designed the final goal-setting flow.",
      ],
      problem: "70% of users had never saved money inside the app.",
      approach: "Ran 48 interviews in 5 cities, tested 3 prototypes and designed the final goal-setting flow.",
      solution: "A goal-setting flow shaped by the research and refined through 3 tested prototypes.",
      results: [
        { value: "610,000", label: "Goals opened in 6 months" },
        { value: "SAR 2,300", label: "Average saved per goal" },
        { value: "48", label: "Interviews in 5 cities" },
        { value: "3", label: "Prototypes tested" },
      ],
      recognition: "Best Fintech Experience, Arab Fintech Excellence Awards 2024",
      tech: ["React Native", "GraphQL", "Figma"],
      art: { bg: "#3a2a12", fg: "#fbefd8", accent: "#f2b84b", motif: "rings" },
      images: [
        { file: "savings-goals/SavingsGoalsDashboard", alt: "Fintech dashboard with savings goals and balances", caption: "Savings dashboard", section: "overview" },
        { file: "savings-goals/SavingsGoalsCreate", alt: "Goal creation screen", caption: "Goal creation", device: "mobile", section: "approach" },
        { file: "savings-goals/SavingsGoalsProgress", alt: "Goal progress screen", caption: "Goal progress", device: "mobile", section: "solution" },
      ],
    },
    {
      slug: "qalam-learn",
      name: "Qalam Learn Code Editor",
      nameArabic: "قلم",
      flagship: true,
      category: "Education",
      organization: "Qalam Learn",
      period: "Feb 2019 – Apr 2021",
      role: "Co-founder, design and front-end",
      team: "Team of 4",
      summary: "An Arabic-first browser code editor that explains programming errors in plain Arabic.",
      overview:
        "Qalam Learn is an Arabic-first coding education platform that reached 230,000 learners in 14 countries and was acquired by Mirqab Group in Nov 2022. Its interactive code editor explains errors in plain Arabic.",
      responsibilities: [
        "Co-founded the company and led product.",
        "Designed and built the interactive code editor.",
        "Grew the team to 9 people.",
      ],
      problem: "Learners quit when English error messages stopped their code.",
      approach: "Built a browser code editor that explains errors in plain Arabic and suggests the next step.",
      solution: "An editor that turns error messages into plain-Arabic explanations, with a suggested next step.",
      results: [
        { value: "18% → 46%", label: "Course completion" },
        { value: "230,000", label: "Learners on the platform" },
        { value: "14", label: "Countries" },
        { value: "Acquired", label: "By Mirqab Group, Nov 2022" },
      ],
      tech: ["Vue", "TypeScript", "Monaco Editor", "Firebase"],
      art: { bg: "#1b1d3a", fg: "#e9e8ff", accent: "#9b8cff", motif: "code" },
      images: [
        { file: "qalam/QalamExample(ArabicErrorTranslationExtensionOrWhatever)", alt: "Qalam code editor explaining a programming error in plain Arabic", caption: "Arabic error explanation", section: "overview" },
        { file: "qalam/QalamCodingEnvironment", alt: "Qalam browser coding environment", caption: "Coding environment", section: "approach" },
        { file: "qalam/QalamLearningDashboard", alt: "Qalam learning dashboard", caption: "Learning dashboard", section: "results" },
      ],
    },
    {
      slug: "khatt-typography-engine",
      name: "Khatt Adaptive Typography Engine",
      nameArabic: "خط",
      flagship: true,
      category: "Research",
      organization: "PhD research, Eastmoor Institute of Technology",
      period: "Sep 2019 – Jul 2022",
      role: "Researcher and sole developer",
      team: "Solo",
      summary: "A research engine that adapts Arabic font size, spacing and line length to the reader and the screen.",
      overview:
        "Khatt was built as part of a PhD in Human-Computer Interaction. Thesis: “Adaptive Typography for Arabic Interfaces: Readability, Density and Trust”, awarded Best Doctoral Thesis in HCI, 2022.",
      responsibilities: [
        "Designed and developed the engine as sole developer.",
        "Ran the study with 312 participants.",
        "Published the results (Journal of Human-Centred Computing, 2022).",
      ],
      problem: "Arabic text on screens is often too small, too dense and hard to scan.",
      approach: "Built an engine that adjusts Arabic font size, spacing and line length to the reader and the screen, then tested it with 312 participants.",
      solution: "An adaptive rendering method for Arabic text, granted a patent in Jun 2024.",
      results: [
        { value: "+19%", label: "Reading speed" },
        { value: "−31%", label: "Reading errors" },
        { value: "312", label: "Study participants" },
        { value: "Patent", label: "Granted Jun 2024 (SA 11223, fictional)" },
      ],
      recognition: "Best Doctoral Thesis in HCI, Eastmoor Institute of Technology 2022",
      tech: ["TypeScript", "Canvas API", "Python"],
      art: { bg: "#3a1f2b", fg: "#f8e9ee", accent: "#f2b8c8", motif: "type" },
      images: [
        { file: "khatt/KhattEngine", alt: "Khatt adaptive typography engine interface", caption: "Typography engine", section: "overview" },
        { file: "khatt/KhattComparison", alt: "Side-by-side comparison of standard and adaptive Arabic typography", caption: "Adaptive comparison", section: "solution" },
        { file: "khatt/KhattResearchResults", alt: "Research results showing reading speed and error rates", caption: "Research results", section: "results" },
      ],
    },
    {
      slug: "hirfa-ui",
      name: "Hirfa UI",
      nameArabic: "حرفة",
      flagship: false,
      category: "Open Source",
      organization: "Open source",
      period: "Mar 2020 – Present",
      role: "Founder and lead maintainer",
      team: "210 contributors",
      summary: "An open-source right-to-left component library: 95 components, 210 contributors, 9,800 GitHub stars.",
      overview:
        "Hirfa UI is an open-source React component library built for right-to-left interfaces, with mirrored layouts, Arabic typography presets and full keyboard support.",
      responsibilities: ["Founded the project and leads its maintenance.", "Designed and built the components."],
      problem: "Popular component libraries handled right-to-left layouts poorly.",
      approach: "Designed and built 95 components with mirrored layouts, Arabic typography presets and full keyboard support.",
      solution: "A library of 95 RTL-first components built on CSS logical properties.",
      results: [
        { value: "9,800", label: "GitHub stars" },
        { value: "1.2M", label: "npm downloads a year" },
        { value: "210", label: "Contributors" },
        { value: "95", label: "Components" },
      ],
      recognition: "Open Source Impact Award, Arab Open Source Foundation 2022",
      tech: ["React", "TypeScript", "CSS logical properties", "Storybook"],
      art: { bg: "#2b2b2b", fg: "#f2efe8", accent: "#e8c547", motif: "mirror" },
      images: [
        { file: "hirfa/HirfaDocs", alt: "Hirfa UI documentation and component library", caption: "Documentation", section: "overview" },
        { file: "hirfa/HirfaRTL", alt: "Hirfa UI right-to-left component showcase", caption: "RTL components", section: "solution" },
      ],
    },
    {
      slug: "dalil-accessibility-toolkit",
      name: "Dalil Accessibility Toolkit",
      nameArabic: "دليل",
      flagship: false,
      category: "Accessibility",
      organization: "Side project",
      period: "Jan 2022 – Sep 2022",
      role: "Designer and developer",
      team: "Solo",
      summary: "A browser extension that flags 42 Arabic-specific accessibility issues and explains how to fix each one.",
      overview: "Dalil is a browser extension for developers building Arabic and right-to-left pages.",
      responsibilities: ["Designed and developed the extension, solo."],
      problem: "Accessibility checkers missed issues specific to Arabic and right-to-left pages.",
      approach: "Built a browser extension that flags 42 Arabic-specific accessibility issues and explains how to fix each one.",
      solution: "A Chrome extension built on axe-core with Arabic-specific checks and fix guidance.",
      results: [
        { value: "42", label: "Arabic-specific issues detected" },
        { value: "3,400", label: "Developers" },
        { value: "22", label: "Countries" },
      ],
      tech: ["JavaScript", "Chrome Extensions API", "axe-core"],
      art: { bg: "#123a2f", fg: "#e3f6ee", accent: "#4be3a5", motif: "scan" },
      images: [
        { file: "dalil/DalilExtension", alt: "Dalil browser extension panel listing accessibility issues", caption: "Browser extension", section: "overview" },
        { file: "dalil/DalilAudit", alt: "Dalil accessibility audit dashboard", caption: "Audit dashboard", section: "solution" },
      ],
    },
    {
      slug: "rafeeq-rides",
      name: "Rafeeq Rides Matching App",
      nameArabic: "رفيق",
      flagship: false,
      category: "Mobility",
      organization: "Rafeeq Rides",
      period: "Apr 2015 – Dec 2016",
      role: "Co-founder and CTO",
      team: "Team of 11",
      summary: "A university ride-sharing startup: 26,000 sign-ups and 140,000 rides before closing in December 2016.",
      overview:
        "Rafeeq Rides was a ride-sharing startup for university students. It raised SAR 3.5 million in seed funding and closed in Dec 2016 after a market change. The public post-mortem was read by 80,000 people.",
      responsibilities: ["Co-founded the company and led technology as CTO.", "Designed the rider-matching system.", "Led a team of 11."],
      problem: "University students had few safe and affordable ways to commute.",
      approach: "Designed the matching system that paired riders by campus, timetable and route.",
      solution: "A mobile app that matched riders by campus, timetable and route.",
      results: [
        { value: "26,000", label: "Sign-ups" },
        { value: "140,000", label: "Rides in 20 months" },
        { value: "SAR 3.5M", label: "Seed funding raised" },
        { value: "80,000", label: "Post-mortem readers" },
      ],
      tech: ["React Native", "Node.js", "MongoDB", "Google Maps APIs"],
      art: { bg: "#2a1838", fg: "#f3e8fb", accent: "#d38cff", motif: "route" },
      images: [
        { file: "rafeeq/RafeeqApp", alt: "Rafeeq Rides mobile app", caption: "Ride-sharing app", device: "mobile", section: "overview" },
        { file: "rafeeq/RafeeqMatching", alt: "Rafeeq ride-matching screen", caption: "Ride matching", device: "mobile", section: "solution" },
      ],
    },
  ],

  // ── Skills (levels and years exactly as in the CV) ──
  skills: [
    { group: "Product Design", level: "Expert", years: 18, items: ["Figma", "Design systems", "Prototyping", "Motion design", "Information architecture"] },
    { group: "Front-End Engineering", level: "Expert", years: 16, items: ["TypeScript", "JavaScript", "React", "Next.js", "Vue", "Tailwind CSS", "Web Components"] },
    { group: "User Research", level: "Expert", years: 14, items: ["Interviews", "Usability testing", "Diary studies", "A/B testing", "Eye-tracking"] },
    { group: "Accessibility", level: "Expert", years: 11, items: ["WCAG 2.2 AA", "ARIA", "Screen-reader testing", "Arabic right-to-left accessibility"] },
    { group: "Back-End and APIs", level: "Advanced", years: 10, items: ["Node.js", "NestJS", "GraphQL", "REST", "PostgreSQL", "Redis"] },
    { group: "Leadership", level: "Expert", years: 9, items: ["Hiring", "Organization design", "OKRs", "Budgeting", "Stakeholder management", "Mentoring"] },
    { group: "Mobile", level: "Advanced", years: 8, items: ["React Native", "Flutter", "Swift (basic)"] },
    { group: "Cloud and DevOps", level: "Advanced", years: 7, items: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Terraform", "GitHub Actions"] },
    { group: "Security and Compliance", level: "Intermediate", years: 6, items: ["Secure development lifecycle", "PCI DSS", "Health-data privacy", "Threat modelling"] },
    { group: "Data and AI", level: "Intermediate", years: 5, items: ["Python", "SQL", "Data visualization", "Recommendation systems", "AI product features"] },
  ],

  // ── Education ──
  education: [
    {
      degree: "PhD in Human-Computer Interaction",
      school: "Eastmoor Institute of Technology",
      location: "Part-time, remote",
      period: "Sep 2018 – Jul 2022",
      details: ["Thesis: “Adaptive Typography for Arabic Interfaces: Readability, Density and Trust”", "Best Doctoral Thesis in HCI, 2022"],
    },
    {
      degree: "Executive Certificate in Technology Leadership",
      school: "Eastmoor Business School",
      location: "Online",
      period: "Jan 2021 – Jun 2021",
      details: ["6-month program completed while working full-time"],
    },
    {
      degree: "MSc in Interaction Design, with Distinction",
      school: "University of Northbridge",
      location: "Northbridge, United Kingdom",
      period: "Sep 2011 – Sep 2012",
      details: ["Dissertation: “Bilingual Navigation Menus on Small Screens”", "Full scholarship"],
    },
    {
      degree: "BSc in Computer Science, First Class Honours",
      school: "Najd Valley University",
      location: "Riyadh, Saudi Arabia",
      period: "Sep 2006 – Jun 2010",
      details: ["GPA 4.81 / 5.00", "Exchange semester: Lindenhall University, Germany, Feb 2009 – Jul 2009", "Best Graduation Project, 2010"],
    },
  ],

  // ── Certifications: 19 earned, 1 in progress (issuers and IDs are fictional) ──
  certifications: [
    { name: "Certified Security Architecture Professional (CSAP)", issuer: "Global Cyber Assurance Council", year: "", status: "In progress", note: "Exam booked for Dec 2026" },
    { name: "Certified Cloud Solutions Architect – Professional", issuer: "Cloud Architecture Guild", year: "2025", status: "Active", id: "CAG-CSA-25-0912" },
    { name: "Certified Design Leader", issuer: "Arabian Design Council", year: "2025", status: "Active", id: "ADC-CDL-25-0044" },
    { name: "Multi-Cloud Platform Architect", issuer: "Halcyon Cloud Institute", year: "2024", status: "Active", id: "HLC-MPA-24-3307" },
    { name: "Certified Container Application Developer", issuer: "Open Container Academy", year: "2024", status: "Active", id: "OCA-CAD-24-1185" },
    { name: "Open Banking Product Specialist", issuer: "Gulf FinTech Academy", year: "2024", status: "Active", id: "GFA-OBP-24-0219" },
    { name: "Certified Project Leadership Professional", issuer: "International Project Leadership Society", year: "2023", status: "Active", id: "IPLS-CPL-23-5560" },
    { name: "Certified Accessibility Specialist", issuer: "Inclusive Interfaces Council", year: "2023", status: "Active", id: "IIC-CAS-23-0471" },
    { name: "Applied Data Visualization Certificate", issuer: "Riyadh Data Institute", year: "2023", status: "Lifetime", id: "RDI-ADV-23-0118" },
    { name: "UX Research and Interaction Design Certificate", issuer: "Meridian UX Institute", year: "2022", status: "Lifetime", id: "MUI-UXR-22-8842" },
    { name: "Enterprise Architecture Practitioner", issuer: "Global Enterprise Architecture Forum", year: "2022", status: "Active", id: "GEAF-EAP-22-0193" },
    { name: "Certified Agile Product Owner", issuer: "Agile Practice Council", year: "2022", status: "Expired 2024", id: "APC-APO-22-6620" },
    { name: "Professional Scrum Facilitator, Level 1", issuer: "Agile Delivery Institute", year: "2021", status: "Lifetime", id: "ADI-PSF-21-4410" },
    { name: "Cloud Application Developer – Associate", issuer: "Skyline Developer Program", year: "2021", status: "Expired 2023", id: "SDP-CAD-21-2075" },
    { name: "IT Service Management Foundation", issuer: "Service Excellence Board", year: "2020", status: "Lifetime", id: "SEB-ITSM-20-9931" },
    { name: "Health Data Privacy Practitioner", issuer: "Middle East Health Informatics Board", year: "2020", status: "Active", id: "MEHIB-HDP-20-0306" },
    { name: "Lean Six Sigma Green Belt", issuer: "Institute for Process Excellence", year: "2019", status: "Lifetime", id: "IPE-LSS-19-1402" },
    { name: "Security Fundamentals Professional", issuer: "Cyber Readiness Academy", year: "2019", status: "Expired 2022", id: "CRA-SFP-19-7718" },
    { name: "Usability Analysis Professional", issuer: "Usability Practice Institute", year: "2016", status: "Lifetime", id: "UPI-UAP-16-0268" },
    { name: "Advanced Motion Design for Interfaces", issuer: "London School of Interface Craft", year: "2014", status: "Lifetime", id: "LSIC-MD-14-0052" },
  ],

  patents: [
    { title: "Method for adaptive Arabic text rendering based on reading context", number: "Patent No. SA 11223 (fictional)", status: "Granted Jun 2024" },
    { title: "System for bilingual component theming in design systems", number: "Application No. SA 2025-0417 (fictional)", status: "Filed Mar 2025, pending" },
  ],

  publicationsNote: "Selected 6 of 9. Full list: scholar.example/yaram",
  publications: [
    { authors: "Al-Mansouri, Y., & Marsh, H.", year: "2022", title: "Adaptive typography for Arabic interfaces: A study with 312 readers.", venue: "Journal of Human-Centred Computing, 14(3), 211–238." },
    { authors: "Al-Mansouri, Y.", year: "2021", title: "Trust signals in Arabic health apps.", venue: "Proceedings of the International Conference on Arabic Interfaces (ICAI 2021), 45–56." },
    { authors: "Al-Mansouri, Y., Rahman, S., & Okafor, T.", year: "2020", title: "Right-to-left design systems at scale.", venue: "Proceedings of DesignOps Summit Asia 2020, 12–19." },
    { authors: "Al-Mansouri, Y., & Marsh, H.", year: "2020", title: "Measuring reading comfort on small screens.", venue: "ICAI 2020 Workshop on Arabic Typography, 8–13." },
    { authors: "Al-Mansouri, Y.", year: "2019", title: "Teaching front-end development in Arabic: Lessons from 50,000 learners.", venue: "Gulf Journal of Computing Education, 7(1), 33–49." },
    { authors: "Hart, L., & Al-Mansouri, Y.", year: "2012", title: "Bilingual navigation menus on small screens.", venue: "Northbridge Interaction Lab Technical Report NIL-TR-2012-07." },
  ],

  // ── Recognition ──
  awards: [
    { title: "Design Technology Leader of the Year", issuer: "Gulf Design Week Awards", year: "2025", for: "For the Mizan Design System" },
    { title: "Best Fintech Experience", issuer: "Arab Fintech Excellence Awards", year: "2024", for: "For Savings Goals" },
    { title: "Top 40 Under 40 in Saudi Tech", issuer: "Riyadh Tech Review", year: "2023", for: "For career achievement" },
    { title: "Best Doctoral Thesis in HCI", issuer: "Eastmoor Institute of Technology", year: "2022", for: "For the PhD thesis" },
    { title: "Open Source Impact Award", issuer: "Arab Open Source Foundation", year: "2022", for: "For Hirfa UI" },
    { title: "Digital Health Innovation Award", issuer: "Middle East Health Informatics Board", year: "2021", for: "For the telemedicine platform" },
    { title: "Women in Tech Leadership Award", issuer: "Saudi Women in Design Network", year: "2020", for: "For leadership at Zayna Health Tech" },
    { title: "Silver, Responsive Design category", issuer: "London Web Craft Awards", year: "2014", for: "For a retail client website at Brightwell Studio" },
    { title: "Rising Star in UX", issuer: "UK Interaction Design Guild", year: "2013", for: "For a public-sector client website at Brightwell Studio" },
    { title: "Best Graduation Project", issuer: "Najd Valley University", year: "2010", for: "For an Arabic speech-to-text note-taking app" },
  ],

  talksNote: "Selected 8 of 31 talks.",
  talks: [
    { type: "Keynote", title: "Design systems that speak two languages", event: "Najd Developer Days 2025", city: "Riyadh", year: "2025" },
    { type: "Talk", title: "Accessibility is a product decision", event: "Gulf Design Week 2025", city: "Dubai", year: "2025" },
    { type: "Panel", title: "Building trust in fintech UX", event: "Gulf Fintech Builders Forum 2024", city: "Riyadh", year: "2024" },
    { type: "Talk", title: "Scaling a team from 6 to 64", event: "Engineering Leadership Week 2023", city: "Cairo", year: "2023" },
    { type: "Talk", title: "What my PhD taught me about Arabic type", event: "Typography Majlis 2022", city: "Jeddah", year: "2022" },
    { type: "Keynote", title: "Telemedicine at national scale", event: "Digital Health Middle East Summit 2021", city: "Online", year: "2021" },
    { type: "Talk", title: "Why our startup failed", event: "Founders Night Riyadh 2016", city: "Riyadh", year: "2016" },
    { type: "Talk", title: "Responsive design for right-to-left", event: "Frontend Horizons London 2014", city: "London", year: "2014" },
  ],

  media: [
    { type: "Cover story", title: "The engineer who designs in two directions", outlet: "Riyadh Tech Review", date: "Mar 2023" },
    { type: "Podcast guest", title: "From startup failure to Principal Engineer", outlet: "Build in Arabic, Episode 42", date: "Jun 2024" },
    { type: "YouTube channel", title: "Yara Builds", outlet: "86 tutorials on design systems and right-to-left front-end · 48,000 subscribers", date: "2020 – Present" },
    { type: "Article", title: "Accessibility debt in fintech", outlet: "Medium · Read 120,000 times", date: "Nov 2023" },
  ],

  // Leadership, teaching and volunteering (held alongside the full-time roles)
  community: [
    { role: "Adjunct Lecturer (part-time)", org: "College of Computing, Najd Valley University", period: "Sep 2019 – Jun 2024", detail: "Taught Human-Computer Interaction, Front-End Development and Design Systems to 1,400 students over 10 semesters.", kind: "Teaching" },
    { role: "Advisory Board Member", org: "Saudi Women in Design Network", period: "Mar 2022 – Present", detail: "Runs the annual mentorship program for 60 early-career designers.", kind: "Leadership" },
    { role: "Technical Advisor", org: "2 early-stage health-tech startups", period: "Feb 2024 – Present", detail: "Advises on product strategy, hiring and architecture.", kind: "Leadership" },
    { role: "Mentor", org: "Najd Valley Startup Accelerator", period: "Jan 2020 – Present", detail: "Mentored 25 startups across 6 cohorts.", kind: "Leadership" },
    { role: "Hackathon Judge", org: "Various organizers", period: "Jan 2018 – Present", detail: "Judged 12 hackathons in Riyadh, Jeddah and Dubai.", kind: "Leadership" },
    { role: "Volunteer Instructor", org: "Code for Community, Riyadh", period: "Jan 2017 – Jun 2017", detail: "Taught a 12-week web development course to 45 adult learners.", kind: "Volunteering" },
  ],

  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Fluent (C2), IELTS 8.5" },
    { name: "French", level: "Upper intermediate (B2), DELF B2" },
    { name: "German", level: "Elementary (A2), from the exchange semester" },
    { name: "Turkish", level: "Beginner (A1), currently learning" },
  ],

  interests: [
    "Arabic calligraphy, with work shown in 2 group exhibitions",
    "Long-distance running: 3 half marathons",
    "Restoring old film cameras",
    "Chess, with an online rating of 1,850",
  ],
};

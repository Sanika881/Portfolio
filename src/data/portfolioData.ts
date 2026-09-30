import { Project, ExperienceItem, EducationItem, TechItem, InterestItem, TaskItem } from '../types';

export const PERSONAL_INFO = {
  name: "Sanika Kadam",
  shortName: "Sanika",
  title: "Python Developer — AI/ML & Data Analytics",
  tagline: "Tech Student  |  Builder  |  Creator",
  location: "Mumbai, Maharashtra, India",
  email: "sanikakadam0702@gmail.com",
  phone: "+91 9326333816",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  avatarUrl: "/src/assets/images/sanika_portrait_1790777718236.jpg",
  photoCardUrl: "/src/assets/images/personal_landscape_1790777706186.jpg",
  aboutIntro: "Hi, I'm Sanika",
  shortBio: "I enjoy building simple, useful and beautiful digital experiences.",
  detailedBio: "I'm a technology student with a minor in Data Science, passionate about creating end-to-end applications that bridge intuitive design with intelligent computation. From training machine learning pipelines and NLP automation tools to building thoughtful web interfaces, I love taking complex workflows and crafting them into seamless, delightful experiences.",
  quote: "Better things ahead.",
};

export const INITIAL_TASKS: TaskItem[] = [
  { id: '1', text: 'Build my portfolio', completed: true },
  { id: '2', text: 'Design system research', completed: false },
  { id: '3', text: 'Study DSA & algorithms', completed: false },
  { id: '4', text: 'Gym / afternoon walk', completed: false },
];

export const TECH_STACK_ITEMS: TechItem[] = [
  // DEVELOPMENT
  { name: 'HTML', category: 'development', descriptor: 'Structure & semantics', iconName: 'Code', link: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { name: 'CSS', category: 'development', descriptor: 'Layouts & styling', iconName: 'Palette', link: 'https://developer.mozilla.org/en-US/docs/Web/CSS' },
  { name: 'JavaScript', category: 'development', descriptor: 'Dynamic client logic', iconName: 'FileCode', link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { name: 'TypeScript', category: 'development', descriptor: 'Typed JavaScript', iconName: 'Code2', link: 'https://www.typescriptlang.org/' },
  { name: 'React', category: 'development', descriptor: 'UI development', iconName: 'Atom', link: 'https://react.dev/' },
  { name: 'Next.js', category: 'development', descriptor: 'Full-stack framework', iconName: 'Globe', link: 'https://nextjs.org/' },
  { name: 'Node.js', category: 'development', descriptor: 'Server runtime', iconName: 'Server', link: 'https://nodejs.org/' },

  // BACKEND & DATA
  { name: 'Express', category: 'backend', descriptor: 'Minimal backend APIs', iconName: 'Cpu', link: 'https://expressjs.com/' },
  { name: 'MongoDB', category: 'backend', descriptor: 'Document store database', iconName: 'Database', link: 'https://www.mongodb.com/' },
  { name: 'Firebase', category: 'backend', descriptor: 'Backend & auth', iconName: 'Flame', link: 'https://firebase.google.com/' },
  { name: 'REST APIs', category: 'backend', descriptor: 'System integration', iconName: 'Layers', link: 'https://restfulapi.net/' },
  { name: 'Python', category: 'backend', descriptor: 'AI/ML & scripting', iconName: 'Terminal', link: 'https://www.python.org/' },
  { name: 'Scikit-learn', category: 'backend', descriptor: 'Predictive ML models', iconName: 'Binary', link: 'https://scikit-learn.org/' },
  { name: 'SQL & PostgreSQL', category: 'backend', descriptor: 'Relational data queries', iconName: 'TableProperties', link: 'https://www.postgresql.org/' },

  // DESIGN
  { name: 'Figma', category: 'design', descriptor: 'Interface design', iconName: 'Figma', link: 'https://www.figma.com/' },
  { name: 'FigJam', category: 'design', descriptor: 'Collaborative wireframes', iconName: 'PenTool', link: 'https://www.figma.com/figjam/' },
  { name: 'Canva', category: 'design', descriptor: 'Visual communication', iconName: 'Sparkles', link: 'https://www.canva.com/' },

  // TOOLS
  { name: 'Git', category: 'tools', descriptor: 'Version control', iconName: 'GitBranch', link: 'https://git-scm.com/' },
  { name: 'GitHub', category: 'tools', descriptor: 'Code & collaboration', iconName: 'Github', link: 'https://github.com/' },
  { name: 'VS Code', category: 'tools', descriptor: 'Code editor', iconName: 'Laptop', link: 'https://code.visualstudio.com/' },
  { name: 'Postman', category: 'tools', descriptor: 'API testing & docs', iconName: 'Send', link: 'https://www.postman.com/' },
  { name: 'Vercel', category: 'tools', descriptor: 'Cloud deployment', iconName: 'Cloud', link: 'https://vercel.com/' },
];

export const PROJECTS: Project[] = [
  {
    id: 'meeting-minutes',
    title: 'AI-Based Meeting Minutes Generator',
    subtitle: 'Python · Whisper · NLP Automation',
    category: 'AI/ML',
    description: 'Automated documentation pipeline converting speech and long-form audio transcripts into structured executive summaries and action items.',
    fullDescription: 'Built an end-to-end Python application that combines speech-to-text API integration with natural language processing libraries (Transformers, spaCy, NLTK) to transcribe, extract key takeaways, and synthesize meeting notes into clean markdown reports, replacing hours of manual administrative documentation.',
    technologies: ['Python', 'Transformers', 'spaCy', 'NLTK', 'Speech-to-Text API', 'FastAPI'],
    status: 'Completed',
    statusColor: '#A78BFA', // soft lavender
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
    highlights: [
      'Speech-to-text pipeline transcribing multi-speaker discussions',
      'Extractive and abstractive NLP summarization with key action item tags',
      'Automated export to clean markdown and executive email digests'
    ],
    metrics: 'Reduced documentation overhead by 75%',
    date: '2024'
  },
  {
    id: 'studysync',
    title: 'StudySync',
    subtitle: 'Focused Study Planning & Timer',
    category: 'Web Apps',
    description: 'A focused, distraction-free study planning and Pomodoro rhythm experience crafted for modern university students.',
    fullDescription: 'StudySync offers an intentional workspace that integrates session planning, focused time blocks, and milestone tracking. Designed with calm typography and soothing pastel states to cultivate deep cognitive focus.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'LocalStore'],
    status: 'Active',
    statusColor: '#34D399', // soft sage green
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
    highlights: [
      'Customizable cognitive intervals with ambient audio cues',
      'Minimalist subject goal tracker with weekly progress insights',
      'Zero-clutter aesthetic that prioritizes mental clarity'
    ],
    date: '2024'
  },
  {
    id: 'airbnb-prediction',
    title: 'Airbnb Price Prediction Engine',
    subtitle: 'Machine Learning · Scikit-Learn',
    category: 'AI/ML',
    description: 'Predictive pricing model utilizing historical accommodation data, feature engineering, and ensemble regression methods.',
    fullDescription: 'Developed an applied machine learning pipeline in Python to estimate optimal listing prices from location density, amenity features, room types, and seasonal demand. Conducted exploratory data analysis, outlier remediation, and hyperparameter tuning.',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'NumPy', 'Seaborn', 'Matplotlib'],
    status: 'Completed',
    statusColor: '#F472B6', // soft pink
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
    highlights: [
      'Feature engineering extracting geospatial and amenity signals',
      'Model evaluation across Random Forest, Gradient Boosting, and Ridge',
      'Visual feature importance diagnostics to highlight high-value property factors'
    ],
    metrics: '0.88 R² score on test validation',
    date: '2025'
  },
  {
    id: 'devnotes',
    title: 'DevNotes',
    subtitle: 'Minimal Developer Note-Taking Tool',
    category: 'Web Apps',
    description: 'A lightning-fast markdown scratchpad with live preview, syntax highlighting, and cloud sync for engineers.',
    fullDescription: 'Crafted as a daily driver for engineering snippets and architectural logs. Features instant keyboard shortcuts, tag filtering, code block copy with one click, and offline-first storage.',
    technologies: ['Next.js', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Markdown'],
    status: 'Active',
    statusColor: '#60A5FA', // dusty blue
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
    highlights: [
      'Live side-by-side markdown renderer with copyable code snippets',
      'Instant search and tag indexing across hundreds of notes',
      'Keyboard-centric navigation designed for fluid typing'
    ],
    date: '2024'
  },
  {
    id: 'fraud-detection',
    title: 'Online Payment Fraud Detection Analysis',
    subtitle: 'Financial EDA & Risk Pattern Discovery',
    category: 'Data Analytics',
    description: 'Comprehensive exploratory data analysis examining financial transactions to detect anomalies and high-risk behavior.',
    fullDescription: 'Preprocessed large financial transaction logs to pinpoint fraud patterns. Leveraged Matplotlib, Seaborn, and Pandas to model transaction volume distributions, account age metrics, and merchant classification anomalies.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Seaborn', 'Matplotlib'],
    status: 'Completed',
    statusColor: '#FBBF24', // muted peach
    githubUrl: 'https://github.com',
    highlights: [
      'Analyzed class imbalance strategies and anomaly distribution curves',
      'Generated correlation heatmaps and bivariate risk scatter plots',
      'Provided clear risk threshold recommendations for transaction filtering'
    ],
    date: '2024'
  },
  {
    id: 'powerbi-dashboards',
    title: 'Ecommerce & HR Analytics Dashboards',
    subtitle: 'Power BI · Business Intelligence',
    category: 'Data Analytics',
    description: 'Interactive business intelligence dashboards analyzing customer checkout behavior, product discounts, and workforce planning.',
    fullDescription: 'Consolidated disparate sales, inventory, and human resources datasets into dynamic, drillable Power BI dashboards. Empowered business stakeholders to monitor headcount utilization, attrition risks, and revenue trends across quarters.',
    technologies: ['Power BI', 'DAX', 'SQL', 'Microsoft Excel', 'Data Modeling'],
    status: 'Completed',
    statusColor: '#38BDF8', // soft sky
    githubUrl: 'https://github.com',
    highlights: [
      'Interactive drill-through reports analyzing customer discount elasticity',
      'Multi-source HR metric models connecting payroll and performance records',
      'Intuitive visual hierarchy tailored for non-technical executive teams'
    ],
    date: '2025'
  },
  {
    id: 'weatherly',
    title: 'Weatherly',
    subtitle: 'Clean Weather Interface',
    category: 'Web Apps',
    description: 'A serene weather forecast interface providing hour-by-hour atmospheric data with fluid micro-interactions.',
    fullDescription: 'Designed around calm glass cards and animated weather conditions. Shows atmospheric pressure, air quality index, UV index, and 7-day outlook without intrusive ads or sensory overload.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'OpenWeather API'],
    status: 'Completed',
    statusColor: '#818CF8', // soft indigo
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
    highlights: [
      'Subtle atmospheric backdrop shifts based on local daylight & cloud cover',
      'Tabular meteorological metrics with hourly precipitation probability',
      'Lightweight bundle under 35kb gzipped'
    ],
    date: '2023'
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'exp-1',
    role: 'Creative Data Strategist (CDS), DigiTech Team',
    company: 'VEdA EdTech',
    location: 'Panvel, Maharashtra · On-site',
    type: 'Internship',
    period: 'Apr 2026 – Aug 2026',
    description: 'Applied AI tools and analytical techniques to interpret complex educational data and convert it into clear, decision-ready deliverables for learning, marketing, and digital communication.',
    achievements: [
      'Applied AI tools and statistical models to interpret complex learner behavior datasets.',
      'Transformed analytical findings into visually engaging internal reporting outputs and marketing roadmaps.',
      'Combined rigorous data analysis with clear visual branding and digital storytelling.'
    ],
    skills: ['AI Tools', 'Data Analytics', 'Reporting', 'Digital Communication', 'Visualization']
  },
  {
    id: 'exp-2',
    role: 'Data Operations Intern',
    company: 'Reliance Industries (Jio-bp)',
    location: 'Mumbai Metropolitan Region · On-site',
    type: 'Internship',
    period: 'May 2025 – Jul 2025',
    description: 'Conducted high-volume data collection, cleaning, and preprocessing on large-scale operational datasets to support pivotal business decisions.',
    achievements: [
      'Preprocessed operational datasets handling missing values, anomalies, and schema normalization.',
      'Trained on retail outlet illumination concepts and L3 audit operational workflows.',
      'Collaborated closely with cross-functional team leads to translate complex business needs into precise analytical outputs.'
    ],
    skills: ['Data Preprocessing', 'Operational Analytics', 'Audit Operations', 'Data Cleaning', 'SQL']
  },
  {
    id: 'exp-3',
    role: 'Data Analyst Intern',
    company: 'Quantum Learning',
    location: 'Hybrid',
    type: 'Internship',
    period: 'Feb 2025 – May 2025',
    description: 'Completed 8 weeks of intensive applied training in data preprocessing, exploratory data analysis, statistical methods, Python data visualization, and machine learning.',
    achievements: [
      'Completed industry-grade program run in collaboration with Microsoft in Education and Certiport (Apple Certification).',
      'Engineered exploratory data analysis scripts with Matplotlib, Seaborn, and Pandas under the FutureSkills Prime (MeitY–NASSCOM) initiative.',
      'Constructed foundational predictive models and statistical hypothesis tests for practical business scenarios.'
    ],
    skills: ['Python', 'EDA', 'Pandas', 'Machine Learning', 'Statistical Methods']
  },
  {
    id: 'exp-4',
    role: 'Freelance Designer & Web Developer',
    company: 'Self-Employed',
    location: 'Remote',
    type: 'Contract',
    period: '2023 – Present',
    description: 'Designing and developing clean, responsive interfaces, branding assets, and custom web tools for independent creators and student initiatives.',
    achievements: [
      'Created wireframes, high-fidelity prototypes, and component design systems in Figma.',
      'Built and deployed performant client applications with React and Tailwind CSS.',
      'Maintained consistent visual rhythm and accessible typography across projects.'
    ],
    skills: ['Figma', 'UI/UX Design', 'React', 'Tailwind CSS', 'Branding']
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'edu-1',
    degree: 'Bachelor of Computer Applications (Honours)',
    field: 'Minor in Data Science',
    institution: 'Pillai College of Arts, Commerce, and Science',
    location: 'New Panvel, Maharashtra',
    period: 'Aug 2023 – May 2026',
    highlights: [
      'Specialized coursework in Machine Learning, Statistical Modeling, and Database Architecture.',
      'Consistently engaged in technical workshops, hackathons, and open source development.',
      'Active student builder experimenting across modern AI/ML frameworks and interactive web craft.'
    ],
    coursework: [
      'Data Structures & Algorithms',
      'Applied Machine Learning & NLP',
      'Database Management Systems (SQL & NoSQL)',
      'Exploratory Data Analysis & Visualization',
      'Web Technologies & Application Design',
      'Object-Oriented Programming (Python, Java, C#)'
    ]
  }
];

export const INTERESTS: InterestItem[] = [
  {
    title: 'Interface Design',
    description: 'Crafting thoughtful design systems, spatial layouts, and calm typography where every detail serves the user.',
    tag: 'Figma · Prototyping',
    iconName: 'Layout',
    accentColor: '#DDD6FE' // soft lavender
  },
  {
    title: 'Photography',
    description: 'Capturing quiet coastal walks, subtle warm afternoon sunlight, textures, and unhurried natural moments.',
    tag: '35mm · Natural Light',
    iconName: 'Camera',
    accentColor: '#FED7AA' // muted peach
  },
  {
    title: 'Music & Lo-Fi',
    description: 'Gentle acoustic rhythms, ambient chillhop, and lo-fi soundscapes that sustain long hours of creative flow.',
    tag: 'Flow State · Ambient',
    iconName: 'Headphones',
    accentColor: '#BBF7D0' // pastel sage
  },
  {
    title: 'Quiet Travel',
    description: 'Exploring scenic coastal roads, quiet cafes, and peaceful horizons that bring clarity and inspiration.',
    tag: 'Wanderlust · Coastal',
    iconName: 'Compass',
    accentColor: '#BAE6FD' // dusty blue
  },
  {
    title: 'Books & Essays',
    description: 'Reading about product craft, cognitive psychology, design philosophy, and technology histories.',
    tag: 'Curiosity · Lifelong Learning',
    iconName: 'BookOpen',
    accentColor: '#FBCFE8' // soft pink
  },
  {
    title: 'Emerging Tech & AI',
    description: 'Experimenting with generative agents, speech models, and open source ML architectures.',
    tag: 'AI/ML · Experimentation',
    iconName: 'Sparkles',
    accentColor: '#E2E8F0' // soft slate
  }
];

export const DESKTOP_FOLDERS = [
  { id: 'projects' as const, name: 'Projects', color: '#DDD6FE', badge: '7 items' },    // pastel lavender
  { id: 'experience' as const, name: 'Experience', color: '#BBF7D0', badge: '4 roles' }, // pastel sage
  { id: 'education' as const, name: 'Education', color: '#FED7AA', badge: 'BCA (Hons)' },// muted peach
  { id: 'interests' as const, name: 'Interests', color: '#BAE6FD', badge: '6 curiosities' },// dusty blue
  { id: 'techstack' as const, name: 'Tech Stack', color: '#FBCFE8', badge: '20+ tools' },// soft pink
];

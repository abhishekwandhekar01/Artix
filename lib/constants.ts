import { moduleImages, unsplash, unsplashImages } from "./images";

export const siteConfig = {
  name: "ARTiX",
  tagline: "One Platform for Every IVF Journey",
  description:
    "ARTiX is a comprehensive cloud-based IVF management platform that unifies patient care, embryology workflows, billing, and clinic operations for fertility centers and hospitals.",
  url: "https://artix.io",
  ogImage: "/images/og-image.jpg",
  contact: {
    email: "connect@medaxis360.com",
    phone: "+91 91129 58375",
    whatsapp: "+919112958375",
    address:
      "Office 901, 41 Evoke, Sr. No. 74, Near Mukai Chowk, Ravet, Pune, Maharashtra 412101, India",
    cityHint: "Pune, Maharashtra",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Office+901,+41+Evoke,+Near+Mukai+Chowk,+Ravet,+Pune,+412101&hl=en&z=15&output=embed",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/medaxis360",
    youtube: "https://www.youtube.com/@medaxis360",
    instagram: "https://www.instagram.com/medaxis360",
    whatsapp: "https://wa.me/919112958375",
    facebook: "https://www.facebook.com/medaxis360",
  },
};

export const socialLinks = [
  { platform: "linkedin" as const, label: "LinkedIn", href: siteConfig.social.linkedin },
  { platform: "youtube" as const, label: "YouTube", href: siteConfig.social.youtube },
  { platform: "instagram" as const, label: "Instagram", href: siteConfig.social.instagram },
  { platform: "whatsapp" as const, label: "WhatsApp", href: siteConfig.social.whatsapp },
  { platform: "facebook" as const, label: "Facebook", href: siteConfig.social.facebook },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Modules", href: "/modules" },
  { label: "Features", href: "/#features" },
  { label: "Workflow", href: "/#workflow" },
  { label: "Videos", href: "/#videos" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export const videos = [
  {
    id: "complete-solution",
    title: "ARTiX: Complete IVF Solution",
    youtubeId: "QezKHZEp0y8",
    description:
      "Discover how ARTiX unifies patient management, cycle tracking, embryology, billing, and reporting in one intelligent cloud platform built exclusively for fertility centers.",
    thumbnail: "https://i.ytimg.com/vi/QezKHZEp0y8/hqdefault.jpg",
  },
  {
    id: "where-tech-meets-fertility",
    title: "Where Fertility Meets Technology",
    youtubeId: "WAv8-8nStaM",
    description:
      "See how leading IVF clinics leverage ARTiX to reduce wait times, eliminate manual errors, and deliver a seamless digital experience from consultation to conception.",
    thumbnail: "https://i.ytimg.com/vi/WAv8-8nStaM/hqdefault.jpg",
  },
  {
    id: "clinic-automation",
    title: "Clinic-Ready IVF Automation",
    youtubeId: "Cb1Gu9hPoSI",
    description:
      "Advanced lab tracking, diagnostic reporting, cycle planning, and patient education — empowering clinics to deliver world-class reproductive care at scale.",
    thumbnail: "https://i.ytimg.com/vi/Cb1Gu9hPoSI/hqdefault.jpg",
  },
];

export { downloadCardImages, heroVideoSrc, unsplashImages as images } from "./images";

export const heroFeatures = [
  "Patient records scattered across multiple systems",
  "Manual IVF cycle and embryology tracking",
  "Time-consuming billing, consent, and documentation",
  "Difficulty managing multiple branches and staff access",
];

/** Full patient journey architecture — powers the animated workflow UI */
export const patientJourney = [
  {
    id: "registration",
    step: 1,
    title: "Patient Registration",
    description: "Digital intake captures demographics, medical history, identity proofs, insurance, and referral data — creating a unified ARTiX patient profile in minutes.",
    module: "Patient Module",
    imageKey: "consultation",
    icon: "UserPlus",
    highlight: "Zero paper forms at reception",
  },
  {
    id: "consultation",
    step: 2,
    title: "Consultation & Assessment",
    description: "Doctors record fertility evaluations, examination notes, and treatment recommendations within structured clinical workflows.",
    module: "Patient Module",
    imageKey: "doctorFemale",
    icon: "Stethoscope",
    highlight: "Structured doctor workflows",
  },
  {
    id: "diagnosis",
    step: 3,
    title: "Diagnosis & Lab Reports",
    description: "Integrate diagnostic labs, hormone panels, and semen analysis reports directly into the patient record for instant clinical access.",
    module: "Reports Module",
    imageKey: "lab",
    icon: "FlaskConical",
    highlight: "Lab results linked instantly",
  },
  {
    id: "planning",
    step: 4,
    title: "Treatment Planning",
    description: "Personalized IVF/ICSI protocols with medication schedules, trigger planning, and consent requirements — all configured in ARTiX.",
    module: "Cycle Navigator",
    imageKey: "technology",
    icon: "ClipboardList",
    highlight: "Protocol-driven planning",
  },
  {
    id: "ivf-cycle",
    step: 5,
    title: "IVF Cycle Management",
    description: "Track stimulation, monitoring scans, trigger dates, and oocyte retrieval with automated alerts at every milestone.",
    module: "Cycle Navigator",
    imageKey: "fertility",
    icon: "HeartPulse",
    highlight: "Never miss a cycle milestone",
  },
  {
    id: "embryology",
    step: 6,
    title: "Embryology Lab",
    description: "Document fertilization, embryo grading, culture conditions, freezing, and transfer readiness with lab-grade precision.",
    module: "Cycle Navigator",
    imageKey: "embryology",
    icon: "Microscope",
    highlight: "Lab-grade embryo tracking",
  },
  {
    id: "transfer",
    step: 7,
    title: "Embryo Transfer",
    description: "Log transfer procedures, embryologist notes, and post-transfer care plans — fully connected to the patient journey.",
    module: "Cycle Navigator",
    imageKey: "medical",
    icon: "Syringe",
    highlight: "Transfer docs in one click",
  },
  {
    id: "pregnancy",
    step: 8,
    title: "Pregnancy Tracking",
    description: "Monitor beta hCG levels, early pregnancy scans, and outcome reporting with automated follow-up scheduling.",
    module: "Patient Module",
    imageKey: "patientCouple",
    icon: "Baby",
    highlight: "Outcome tracking built-in",
  },
  {
    id: "billing",
    step: 9,
    title: "Billing & Invoicing",
    description: "Automated invoicing for consultations, procedures, lab charges, and packages — transparent billing at every stage.",
    module: "Billing Module",
    imageKey: "billing",
    icon: "CreditCard",
    highlight: "Revenue captured at every step",
  },
  {
    id: "followup",
    step: 10,
    title: "Reports & Follow-Up",
    description: "Generate clinical, financial, and outcome reports. Schedule recalls and long-term patient engagement automatically.",
    module: "Reports Module",
    imageKey: "analytics",
    icon: "BarChart3",
    highlight: "Executive-ready analytics",
  },
];

export const workflowSteps = patientJourney.map(({ title, description }) => ({ title, description }));

export const stats = [
  { value: 523, suffix: "+", label: "Clinics Digitally Supported" },
  { value: 877, suffix: "+", label: "IVF Appointments Managed Monthly" },
  { value: 1163, suffix: "+", label: "Treatment Cycles Conducted" },
  { value: 98, suffix: "%", label: "Clinic Satisfaction Rate" },
];

export const trustedBy = [
  "Nova Fertility",
  "LifeSpring IVF",
  "Genesis Hospital",
  "Bloom Reproductive",
  "CareNest Fertility",
  "MediHope Clinics",
];

export const problems = [
  {
    title: "Fragmented Patient Records",
    description:
      "Critical fertility data scattered across spreadsheets, paper files, and disconnected systems slows decisions and increases clinical risk.",
    icon: "FileX",
  },
  {
    title: "Manual IVF Cycle Tracking",
    description:
      "Stimulation, retrieval, and transfer milestones tracked manually lead to missed steps, delays, and inconsistent patient communication.",
    icon: "Clock",
  },
  {
    title: "Billing & Compliance Gaps",
    description:
      "Complex procedure packages, lab charges, and consent documentation create revenue leakage and regulatory exposure.",
    icon: "AlertTriangle",
  },
  {
    title: "Limited Operational Visibility",
    description:
      "Clinic owners lack real-time insight into appointments, embryology throughput, inventory, and staff productivity.",
    icon: "EyeOff",
  },
];

export const solutions = [
  {
    title: "One Unified Patient Record",
    description:
      "Every consultation, diagnosis, cycle event, and report lives in a single secure cloud profile—accessible to authorized staff instantly.",
    icon: "Users",
  },
  {
    title: "Intelligent Cycle Navigator",
    description:
      "Guide each IVF/ICSI journey from stimulation through transfer with structured workflows, alerts, and embryology precision.",
    icon: "Route",
  },
  {
    title: "Automated Billing & Digital Consent",
    description:
      "Transparent invoicing, package management, and legally compliant digital consent—built into every clinical touchpoint.",
    icon: "ShieldCheck",
  },
  {
    title: "Executive Analytics Dashboard",
    description:
      "Real-time KPIs across branches, cycles, revenue, and lab performance—empowering data-driven clinic leadership.",
    icon: "BarChart3",
  },
];

export const whyArtix = [
  {
    title: "Built for IVF, Not Generic EMR",
    description:
      "Purpose-engineered for fertility workflows—from oocyte retrieval to embryo grading—not retrofitted hospital software.",
  },
  {
    title: "Multi-Branch Ready",
    description:
      "Centralized control with branch-level autonomy. Scale from a single clinic to a national hospital chain seamlessly.",
  },
  {
    title: "Cloud-Native & Secure",
    description:
      "Access anywhere with role-based permissions, audit trails, and DISHA-aligned data protection standards.",
  },
  {
    title: "Continuous Innovation",
    description:
      "Regular enhancements driven by embryologist, clinician, and clinic owner feedback across 500+ deployments.",
  },
];

export const features = [
  {
    title: "Patient Management",
    description:
      "Complete registration, medical history, identity verification, insurance, and demographic profiles in one intelligent record.",
    icon: "UserCircle",
  },
  {
    title: "IVF Journey Tracking",
    description:
      "End-to-end cycle management from consultation through pregnancy tracking with structured clinical milestones.",
    icon: "HeartPulse",
  },
  {
    title: "Embryology Workflows",
    description:
      "Precision embryo handling, grading, freezing, and transfer documentation with lab-grade accuracy.",
    icon: "Microscope",
  },
  {
    title: "Clinic Operations",
    description:
      "Appointment scheduling, branch management, HR coordination, and operational readiness across locations.",
    icon: "Building2",
  },
  {
    title: "Digital Consent",
    description:
      "Legally compliant digital consent for IUI, embryo freezing, anesthesia, and procedure-specific requirements.",
    icon: "FileCheck",
  },
  {
    title: "Billing & Finance",
    description:
      "Customizable packages, procedure fees, lab charges, advances, and transparent payment history.",
    icon: "CreditCard",
  },
  {
    title: "Reports & Analytics",
    description:
      "Clinical, financial, and operational reports with exportable insights for leadership and compliance.",
    icon: "PieChart",
  },
  {
    title: "HR & Staff Management",
    description:
      "Employee records, role assignments, and workforce coordination integrated with clinic scheduling.",
    icon: "Users",
  },
  {
    title: "Inventory Control",
    description:
      "Track consumables, medications, and lab supplies with alerts to prevent stockouts during critical procedures.",
    icon: "Package",
  },
  {
    title: "Cloud Access",
    description:
      "Secure browser-based access from any device—no on-premise servers or IT overhead required.",
    icon: "Cloud",
  },
  {
    title: "Role-Based Security",
    description:
      "Granular permissions for doctors, embryologists, nurses, billing staff, and administrators.",
    icon: "Lock",
  },
  {
    title: "Smart Notifications",
    description:
      "Automated alerts for cycle milestones, appointments, consent expiry, and billing events.",
    icon: "Bell",
  },
  {
    title: "Mobile Ready",
    description:
      "Responsive interface optimized for tablets and smartphones used on clinic floors and in labs.",
    icon: "Smartphone",
  },
  {
    title: "Audit Logs",
    description:
      "Complete activity trails for every data change—supporting compliance audits and accountability.",
    icon: "ScrollText",
  },
  {
    title: "Advanced Analytics",
    description:
      "Treatment success metrics, revenue trends, and operational KPIs in executive-ready dashboards.",
    icon: "TrendingUp",
  },
  {
    title: "Multi-Language Support",
    description:
      "Serve diverse patient populations with localized interfaces and documentation capabilities.",
    icon: "Globe",
  },
];

export const modules = [
  {
    id: "hospital",
    title: "Hospital Administration",
    shortTitle: "Hospital Module",
    description:
      "Centralize hospital details, multi-branch configuration, employee data, and appointment scheduling. Streamline backend operations and HR coordination for single or multi-location IVF centers.",
    image: moduleImages.hospital,
    href: "/modules#hospital",
  },
  {
    id: "user-master",
    title: "User Master",
    shortTitle: "User Master",
    description:
      "Complete control over user creation, role assignments, and menu access rights. Customizable permission settings ensure data security and workflow control for every staff member.",
    image: moduleImages["user-master"],
    href: "/modules#user-master",
  },
  {
    id: "patient",
    title: "Patient Management",
    shortTitle: "Patient Module",
    description:
      "Track every patient from registration through post-treatment. Medical records, identity proofs, insurance details, and demographics—empowering informed clinical decisions.",
    image: moduleImages.patient,
    href: "/modules#patient",
  },
  {
    id: "cycle-navigator",
    title: "IVF Cycle Navigator",
    shortTitle: "Cycle Navigator",
    description:
      "Monitor the entire fertility treatment process—stimulation, monitoring, retrieval, freezing, and transfer—with medical precision for each IVF/ICSI journey.",
    image: moduleImages["cycle-navigator"],
    href: "/modules#cycle-navigator",
  },
  {
    id: "consent",
    title: "Digital Consent Forms",
    shortTitle: "Consent Forms",
    description:
      "Digitally manage and archive consent for semen/embryo freezing, anesthesia, IUI, and more. Ensure legal and medical compliance with secure documentation.",
    image: moduleImages.consent,
    href: "/modules#consent",
  },
  {
    id: "billing",
    title: "Billing & Invoicing",
    shortTitle: "Billing",
    description:
      "Handle consultation through complex procedures with customizable packages, lab test charges, procedure fees, and advance payments—transparent and automated.",
    image: moduleImages.billing,
    href: "/modules#billing",
  },
  {
    id: "reports",
    title: "Reports & Settings",
    shortTitle: "Reports",
    description:
      "Generate clinical, financial, and operational reports. Configure system settings, workflows, and integrations tailored to your clinic's needs.",
    image: moduleImages.reports,
    href: "/modules#reports",
  },
];

export const benefits = [
  {
    title: "Reduce Paperwork by 80%",
    description: "Digitize consent, records, and billing—freeing staff from manual documentation.",
    icon: "FileMinus",
  },
  {
    title: "Increase Clinical Efficiency",
    description: "Structured workflows eliminate bottlenecks from reception to embryology lab.",
    icon: "Zap",
  },
  {
    title: "Save Staff Time Daily",
    description: "Automated scheduling, alerts, and reporting reclaim hours for patient care.",
    icon: "Timer",
  },
  {
    title: "Elevate Patient Experience",
    description: "Shorter wait times, clear communication, and transparent billing build trust.",
    icon: "Smile",
  },
  {
    title: "Enterprise Cloud Security",
    description: "Encrypted data, role-based access, and audit trails protect sensitive health information.",
    icon: "Shield",
  },
  {
    title: "Real-Time Intelligence",
    description: "Live dashboards for cycles, revenue, and lab throughput—decisions in minutes, not days.",
    icon: "Activity",
  },
];

export const comparison = {
  traditional: [
    "Paper-based patient files and consent forms",
    "Manual IVF cycle tracking in spreadsheets",
    "Disconnected billing and lab systems",
    "Limited visibility across branches",
    "Delayed reporting and compliance gaps",
    "High IT infrastructure costs",
  ],
  artix: [
    "Unified digital patient records in the cloud",
    "Intelligent Cycle Navigator with automated alerts",
    "Integrated billing, lab, and pharmacy modules",
    "Multi-branch dashboard with real-time KPIs",
    "Instant reports with audit-ready documentation",
    "Zero on-premise infrastructure—pure SaaS",
  ],
};

export const testimonials = [
  {
    quote:
      "ARTiX has transformed how we manage fertility care. From patient onboarding to embryology tracking, everything flows seamlessly. Our staff saves hours every day.",
    name: "Dr. Priya Sharma",
    role: "Chief Fertility Consultant",
    credentials: "MD, MBBS — Gynaecologist & Obstetrics",
    image: unsplash("photo-1559839734-2b71ea197ec2", 200),
  },
  {
    quote:
      "The embryology module gives us lab-grade precision for grading, freezing, and transfer documentation. It's the first system built truly for IVF labs.",
    name: "Dr. Rahul Mehta",
    role: "Senior Embryologist",
    credentials: "PhD — Clinical Embryology",
    image: unsplash("photo-1612349317150-e413f6a5b16d", 200),
  },
  {
    quote:
      "Managing five branches was a nightmare before ARTiX. Now I have real-time visibility into appointments, revenue, and cycle outcomes from a single dashboard.",
    name: "Mr. Vikram Desai",
    role: "Hospital Owner & CEO",
    credentials: "Bloom Reproductive Healthcare Group",
    image: unsplash("photo-1472099645785-5658abf4ff4e", 200),
  },
  {
    quote:
      "Billing accuracy improved dramatically. Custom packages, advance tracking, and automated invoicing reduced our revenue leakage within the first quarter.",
    name: "Ms. Ananya Reddy",
    role: "Clinic Operations Manager",
    credentials: "LifeSpring IVF Center",
    image: unsplash("photo-1580489944761-15a19d654956", 200),
  },
];

export const caseStudies = [
  {
    title: "Multi-Branch Fertility Chain",
    metric: "40%",
    metricLabel: "Reduction in admin time",
    description:
      "A 5-branch IVF group unified patient records, billing, and embryology workflows—cutting administrative overhead while improving cycle tracking accuracy.",
    image: unsplash("photo-1516549655169-df83a0774514", 600),
  },
  {
    title: "Standalone IVF Clinic",
    metric: "98%",
    metricLabel: "Billing accuracy achieved",
    description:
      "A mid-size clinic replaced fragmented tools with ARTiX—eliminating duplicate data entry and achieving near-perfect invoicing within 90 days.",
    image: unsplash("photo-1576091160399-112ba8d25d1d", 600),
  },
  {
    title: "Hospital IVF Department",
    metric: "3x",
    metricLabel: "Faster report generation",
    description:
      "Integrated lab, pharmacy, and clinical modules enabled same-day reporting for leadership—replacing weekly manual compilation processes.",
    image: unsplash("photo-1519494026892-80bbd2d6fd0d", 600),
  },
];

export const faqs = [
  {
    question: "What is ARTiX?",
    answer:
      "ARTiX is a cloud-based IVF management platform designed for fertility clinics, hospitals, and healthcare groups. It unifies patient management, IVF cycle tracking, embryology workflows, billing, consent, and reporting in one secure system.",
  },
  {
    question: "Is ARTiX suitable for multi-branch clinics?",
    answer:
      "Yes. ARTiX supports single clinics and multi-branch hospital chains with centralized administration, branch-level autonomy, and consolidated analytics dashboards.",
  },
  {
    question: "How secure is patient data on ARTiX?",
    answer:
      "ARTiX implements role-based access control, encrypted cloud storage, comprehensive audit logs, and DISHA-aligned data security practices to protect sensitive reproductive health information.",
  },
  {
    question: "Can we migrate from our existing system?",
    answer:
      "Our onboarding team provides structured data migration support, staff training, and phased rollout plans to ensure a smooth transition with minimal disruption to clinic operations.",
  },
  {
    question: "Does ARTiX work on mobile devices?",
    answer:
      "ARTiX is fully responsive and optimized for tablets and smartphones—ideal for clinicians and embryologists working on clinic floors and in laboratory environments.",
  },
  {
    question: "What modules are included?",
    answer:
      "Core modules include Hospital Administration, User Master, Patient Management, IVF Cycle Navigator, Digital Consent Forms, Billing & Invoicing, Reports, and Settings—with optional lab, pharmacy, and inventory integrations.",
  },
  {
    question: "How do I schedule a demo?",
    answer:
      "Book a personalized live demo through our website form. Our product specialists will walk you through modules relevant to your clinic size, workflow, and integration needs.",
  },
  {
    question: "Is training provided for staff?",
    answer:
      "Yes. ARTiX includes comprehensive onboarding, role-based training sessions, and ongoing support to ensure your entire team adopts the platform confidently.",
  },
];

export const downloads = [
  {
    title: "Product Brochure",
    description: "Complete overview of ARTiX modules, features, and benefits for IVF clinics.",
    file: "/images/broucher.pdf",
    icon: "BookOpen",
  },
  {
    title: "Company Profile",
    description: "Learn about our mission, team, and commitment to transforming fertility care.",
    file: "/brochures/artix-company-profile.pdf",
    icon: "Building",
  },
  {
    title: "Feature Guide",
    description: "Detailed walkthrough of every module with screenshots and workflow diagrams.",
    file: "/brochures/artix-feature-guide.pdf",
    icon: "ListChecks",
  },
  {
    title: "Product Overview",
    description: "Executive summary for decision-makers evaluating IVF management software.",
    file: "/brochures/artix-product-overview.pdf",
    icon: "FileText",
  },
];

export const demoFormModules = [
  "Hospital Management System",
  "IVF Treatment Management System",
  "Medical Prescriptions & Billing System",
  "Embryology & Lab Module",
  "Reports & Analytics",
];

export const footerLinks = {
  solutions: [
    { label: "Patient Management", href: "/modules#patient" },
    { label: "IVF Cycle Navigator", href: "/modules#cycle-navigator" },
    { label: "Digital Consent", href: "/modules#consent" },
    { label: "Billing & Finance", href: "/modules#billing" },
  ],
  resources: [
    { label: "Download Brochure", href: "/#downloads" },
    { label: "Book Demo", href: "/#demo" },
    { label: "Case Studies", href: "/#case-studies" },
    { label: "FAQ", href: "/#faq" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Notice of Nondiscrimination", href: "/nondiscrimination" },
  ],
  company: [
    { label: "About ARTiX", href: "/#about" },
    { label: "Modules", href: "/modules" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
};

export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry",
];

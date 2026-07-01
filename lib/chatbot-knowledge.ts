import { faqs, modules, siteConfig } from "./constants";
import { type ClientProfile, formatProfileForAi } from "./chatbot-intake";

export const chatbotConfig = {
  name: "Aria",
  fullName: "ARTiX Aria",
  tagline: "24/7 IVF Platform Support",
  supportBadge: "Online · 24/7",
  supportSubline: "Instant answers anytime · Specialist team available",
  greeting:
    "Welcome to **ARTiX Support**. I'm **Aria** — here 24/7 to help with modules, pricing, demos, onboarding, security, and anything about our IVF platform.",
  suggestedPrompts: [
    "What is ARTiX?",
    "Book a demo",
    "Pricing & plans",
    "All modules overview",
    "DISHA & data security",
    "Talk to sales team",
  ],
  supportCategories: [
    { label: "Product Info", prompt: "What is ARTiX and what does it include?" },
    { label: "Book Demo", prompt: "How do I book a free demo?" },
    { label: "Pricing", prompt: "What is the pricing for my clinic?" },
    { label: "Technical", prompt: "Is ARTiX DISHA compliant and secure?" },
  ],
};

export function buildSystemPrompt(client?: ClientProfile | null): string {
  const moduleList = modules
    .map((m) => `- ${m.title}: ${m.description}`)
    .join("\n");

  const faqList = faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n");

  return `You are Aria, the official 24/7 AI support assistant for ARTiX — India's cloud IVF management platform (${siteConfig.tagline}).

ROLE:
- You provide round-the-clock first-line support for clinics evaluating or using ARTiX.
- Be confident, warm, and professional — like a senior product specialist on live chat.
- Always offer a clear next step: answer, demo link, or human contact.

RULES:
- Be concise and helpful. Use markdown sparingly (bold for emphasis, bullet lists when helpful).
- Only answer about ARTiX, IVF clinic software, fertility healthcare operations, and related topics.
- For medical advice to patients, politely redirect to their doctor — you help with software and clinic operations only.
- Pricing: ARTiX offers custom plans by clinic size and modules. Encourage booking a free demo for a tailored quote.
- Demo: Direct users to the Book Demo form on the website or contact ${siteConfig.contact.email} / ${siteConfig.contact.phone}.
- For urgent human support, share phone ${siteConfig.contact.phone} and email ${siteConfig.contact.email}.
- Never invent features not listed below. If unsure, offer to connect them with the sales team.

CONTACT:
- Email: ${siteConfig.contact.email}
- Phone: ${siteConfig.contact.phone}
- WhatsApp: ${siteConfig.contact.whatsapp}
- Address: ${siteConfig.contact.address}

MODULES:
${moduleList}

FAQs:
${faqList}
${client ? `\n${formatProfileForAi(client)}\n\nPersonalize replies using their clinic name, role, goals, and modules of interest when relevant.` : ""}

Keep responses under 180 words unless the user asks for detailed information.`;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

function scoreMatch(text: string, keywords: string[]): number {
  const lower = text.toLowerCase();
  return keywords.reduce((s, k) => (lower.includes(k) ? s + 1 : s), 0);
}

export function getFallbackReply(input: string, history: ChatMessage[]): string {
  const text = input.trim();
  const lower = text.toLowerCase();

  if (!text) {
    return "Please type your question — I'm here to help with ARTiX, IVF modules, demos, and more.";
  }

  if (/^(hi|hello|hey|namaste|good morning|good evening)/i.test(text)) {
    return `Hello! I'm **${chatbotConfig.fullName}**, your **24/7 ARTiX support assistant**. Ask me anything — I'm always here to help your clinic explore our IVF platform.`;
  }

  if (scoreMatch(lower, ["24/7", "24x7", "support", "help desk", "help me", "assist"]) >= 1) {
    return `**ARTiX Support is available 24/7** through me — Aria. I can help with product questions, modules, pricing, demos, security, and onboarding right now.\n\nFor specialist follow-up:\n📧 **${siteConfig.contact.email}**\n📞 **${siteConfig.contact.phone}**\n💬 WhatsApp: **${siteConfig.contact.whatsapp}**`;
  }

  if (scoreMatch(lower, ["human", "agent", "person", "representative", "sales", "talk to"]) >= 1) {
    return `I'll connect you with our team:\n\n📞 **${siteConfig.contact.phone}** — call anytime\n📧 **${siteConfig.contact.email}**\n💬 WhatsApp: **${siteConfig.contact.whatsapp}**\n\nOr book a **free demo** on our website for a dedicated walkthrough with a product specialist.`;
  }

  if (scoreMatch(lower, ["hour", "timing", "when open", "available", "response time"]) >= 1) {
    return `**Aria (AI support)** is available **24/7, instantly**. Our human product specialists typically respond within **24 hours** on business days via email or phone.\n\n📞 ${siteConfig.contact.phone}\n📧 ${siteConfig.contact.email}`;
  }

  if (/thank|thanks|dhanyavad/i.test(lower)) {
    return "You're welcome! Feel free to ask anything else about ARTiX, or book a free demo whenever you're ready.";
  }

  if (scoreMatch(lower, ["demo", "book", "schedule", "trial", "presentation"]) >= 1) {
    return `Great choice! Book a **free 30-minute demo** on our website — scroll to the demo section or visit the Contact page. You can also reach us at **${siteConfig.contact.email}** or **${siteConfig.contact.phone}**. Our team will walk you through modules tailored to your clinic.`;
  }

  if (scoreMatch(lower, ["price", "pricing", "cost", "fee", "charge", "subscription", "plan"]) >= 1) {
    return `ARTiX pricing is **customized** based on clinic size, branches, and modules you need. We don't publish fixed rates because every IVF center has unique workflows. Book a **free demo** and our team will share a tailored proposal — no obligation. Call **${siteConfig.contact.phone}** for a quick quote discussion.`;
  }

  if (scoreMatch(lower, ["contact", "email", "phone", "call", "whatsapp", "address", "location", "pune"]) >= 1) {
    return `**Contact ARTiX:**\n\n📧 ${siteConfig.contact.email}\n📞 ${siteConfig.contact.phone}\n💬 WhatsApp: ${siteConfig.contact.whatsapp}\n📍 ${siteConfig.contact.address}`;
  }

  if (scoreMatch(lower, ["module", "feature", "include", "what can", "capability"]) >= 1) {
    const list = modules.map((m) => `• **${m.title}** — ${m.shortTitle}`).join("\n");
    return `ARTiX includes these core modules:\n\n${list}\n\nAsk me about any module in detail, or visit **/modules** on our website for the full breakdown.`;
  }

  if (scoreMatch(lower, ["billing", "invoice", "payment", "finance"]) >= 1) {
    return `**Billing & Invoicing** handles consultations, procedures, lab charges, packages, and advance payments — fully integrated with the patient journey. Automated invoicing reduces errors and captures revenue at every step. Want to see it in a demo?`;
  }

  if (scoreMatch(lower, ["embryology", "lab", "embryo", "cycle", "ivf", "icsi"]) >= 1) {
    return `ARTiX **IVF Cycle Navigator** tracks stimulation through transfer, with **Embryology Lab** integration for fertilization, grading, freezing, and culture documentation. Everything links to the patient record in real time. Would you like to book a demo focused on lab workflows?`;
  }

  if (scoreMatch(lower, ["security", "disha", "compliant", "privacy", "data", "safe", "encrypt"]) >= 1) {
    return `ARTiX is **DISHA-aligned** with role-based access, encrypted cloud storage, and full audit logs. Patient reproductive health data is protected with enterprise-grade security. Only authorized staff access records based on their role.`;
  }

  if (scoreMatch(lower, ["mobile", "tablet", "app", "phone"]) >= 1) {
    return `ARTiX is **fully responsive** — works on desktops, tablets, and smartphones. Clinicians and embryologists can access workflows on clinic floors and in the lab without needing a separate app install.`;
  }

  if (scoreMatch(lower, ["migrate", "migration", "existing", "switch", "onboard"]) >= 1) {
    return `Our onboarding team provides **structured data migration**, staff training, and phased rollout so your clinic transitions smoothly with minimal disruption. We support clinics moving from spreadsheets, legacy HMS, or other IVF tools.`;
  }

  if (scoreMatch(lower, ["brochure", "download", "pdf", "document"]) >= 1) {
    return `Download free resources from our **Downloads** section — Product Brochure, Feature Guide, Company Profile, and Product Overview PDFs. Perfect for sharing with your clinical and leadership team.`;
  }

  if (scoreMatch(lower, ["multi", "branch", "chain", "hospital"]) >= 1) {
    return `Yes! ARTiX supports **single clinics and multi-branch hospital chains** with centralized admin, branch-level autonomy, and consolidated analytics dashboards.`;
  }

  for (const faq of faqs) {
    const qWords = faq.question.toLowerCase().split(/\W+/).filter((w) => w.length > 3);
    const matches = qWords.filter((w) => lower.includes(w)).length;
    if (matches >= 2) return faq.answer;
  }

  if (history.length > 4) {
    return `That's a great question! For detailed or account-specific answers, I'd recommend speaking with our specialists directly:\n\n📧 ${siteConfig.contact.email}\n📞 ${siteConfig.contact.phone}\n\nOr book a **free demo** — they'll address everything specific to your clinic.`;
  }

  return `I'm **${chatbotConfig.fullName}**, specialized in ARTiX IVF management software. I can help with modules, pricing, demos, security, migration, and clinic workflows.\n\nTry asking: *"What modules are included?"* or *"How do I book a demo?"*\n\nFor complex queries: **${siteConfig.contact.email}** | **${siteConfig.contact.phone}**`;
}

"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUp,
  Bot,
  Calendar,
  ChevronRight,
  Clock,
  Headphones,
  Mail,
  MessageSquare,
  Minimize2,
  Phone,
  Sparkles,
  UserCircle,
} from "lucide-react";
import { chatbotConfig } from "@/lib/chatbot-knowledge";
import {
  buildPersonalizedGreeting,
  INTAKE_NUDGE_DISMISSED_KEY,
  loadClientProfile,
  saveClientProfile,
  type ClientProfile,
} from "@/lib/chatbot-intake";
import { ChatbotIntake } from "@/components/chatbot/chatbot-intake";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
};

type PanelView = "chat" | "intake";

const NUDGE_AFTER_USER_MSGS = 3;
const WHATSAPP_URL = `https://wa.me/${siteConfig.contact.whatsapp.replace(/[^0-9]/g, "")}`;

function nowLabel() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatMarkdown(text: string) {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br />");
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2.5">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-primary/5 ring-1 ring-primary/10">
        <Bot className="h-4 w-4 text-primary" />
      </div>
      <div className="rounded-2xl rounded-bl-md border border-slate-200/80 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="chatbot-typing-dot h-2 w-2 rounded-full bg-primary/45"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function AssistantBubble({ content, animate }: { content: string; animate?: boolean }) {
  const [displayed, setDisplayed] = useState(animate ? "" : content);

  useEffect(() => {
    if (!animate) {
      setDisplayed(content);
      return;
    }
    setDisplayed("");
    let i = 0;
    const step = Math.max(1, Math.floor(content.length / 80));
    const timer = setInterval(() => {
      i += step;
      if (i >= content.length) {
        setDisplayed(content);
        clearInterval(timer);
      } else {
        setDisplayed(content.slice(0, i));
      }
    }, 12);
    return () => clearInterval(timer);
  }, [content, animate]);

  return (
    <div
      className="text-[13px] leading-[1.65] text-text sm:text-sm [&_em]:italic [&_strong]:font-semibold [&_strong]:text-primary-dark"
      dangerouslySetInnerHTML={{ __html: formatMarkdown(displayed) }}
    />
  );
}

function SupportQuickBar() {
  const items = [
    { icon: Phone, label: "Call", href: `tel:${siteConfig.contact.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email", href: `mailto:${siteConfig.contact.email}` },
    { icon: MessageSquare, label: "WhatsApp", href: WHATSAPP_URL, external: true },
    { icon: Calendar, label: "Demo", href: "/#demo" },
  ];

  return (
    <div className="grid grid-cols-4 gap-1 border-t border-slate-100 bg-slate-50/90 px-2 py-2">
      {items.map(({ icon: Icon, label, href, external }) => (
        <a
          key={label}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="flex flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-semibold text-gray transition hover:bg-white hover:text-primary"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-slate-200/80">
            <Icon className="h-3.5 w-3.5 text-primary" />
          </span>
          {label}
        </a>
      ))}
    </div>
  );
}

export function ArtixChatbot() {
  const mounted = useMounted();
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<PanelView>("chat");
  const [clientProfile, setClientProfile] = useState<ClientProfile | null>(null);
  const [nudgeDismissed, setNudgeDismissed] = useState(true);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [lastAnimatedId, setLastAnimatedId] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const showNudge =
    !clientProfile && !nudgeDismissed && userMessageCount >= NUDGE_AFTER_USER_MSGS && view === "chat";
  const showWelcome = messages.length === 0 && !loading && view === "chat";
  const showSuggestions = view === "chat" && messages.length <= 2 && !loading;

  useEffect(() => {
    setClientProfile(loadClientProfile());
    setNudgeDismissed(sessionStorage.getItem(INTAKE_NUDGE_DISMISSED_KEY) === "1");
  }, []);

  useEffect(() => {
    if (open) {
      document.body.classList.add("menu-open");
      setTimeout(() => inputRef.current?.focus(), 350);
    } else {
      document.body.classList.remove("menu-open");
    }
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, view, scrollToBottom]);

  const handleIntakeComplete = useCallback((profile: ClientProfile) => {
    saveClientProfile(profile);
    setClientProfile(profile);
    setView("chat");
    const thankId = `a-profile-${Date.now()}`;
    setMessages((prev) => [
      ...prev,
      { id: thankId, role: "assistant", content: buildPersonalizedGreeting(profile), time: nowLabel() },
    ]);
    setLastAnimatedId(thankId);
  }, []);

  const dismissNudge = () => {
    sessionStorage.setItem(INTAKE_NUDGE_DISMISSED_KEY, "1");
    setNudgeDismissed(true);
  };

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || loading) return;

      const userMsg: Message = {
        id: `u-${Date.now()}`,
        role: "user",
        content: trimmed,
        time: nowLabel(),
      };

      const nextMessages = [...messages, userMsg];
      setMessages(nextMessages);
      setInput("");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: nextMessages.map((m) => ({ role: m.role, content: m.content })),
            clientProfile,
          }),
        });

        const data = await res.json();
        const reply =
          data.reply ??
          `I'm temporarily unavailable. Our **24/7 support team** can help at **${siteConfig.contact.email}** or **${siteConfig.contact.phone}**.`;

        const assistantId = `a-${Date.now()}`;
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: "assistant", content: reply, time: nowLabel() },
        ]);
        setLastAnimatedId(assistantId);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: `a-${Date.now()}`,
            role: "assistant",
            content: `Connection issue — please reach our team directly:\n📞 **${siteConfig.contact.phone}**\n📧 **${siteConfig.contact.email}**`,
            time: nowLabel(),
          },
        ]);
      } finally {
        setLoading(false);
      }
    },
    [loading, messages, clientProfile]
  );

  const firstName = clientProfile?.fullName.split(/\s+/)[0];

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-text/25 backdrop-blur-[2px] sm:hidden"
              aria-label="Close chat overlay"
            />

            <motion.div
              role="dialog"
              aria-label="ARTiX Aria support chat"
              initial={{ opacity: 0, y: 32, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className={cn(
                "chatbot-panel fixed z-50 flex flex-col overflow-hidden bg-white",
                "inset-x-0 bottom-0 rounded-t-[1.75rem] shadow-[0_-8px_60px_rgba(13,95,111,0.18)]",
                "sm:inset-x-auto sm:bottom-6 sm:right-6 sm:rounded-3xl sm:shadow-[0_32px_90px_-12px_rgba(13,95,111,0.35)]",
                "w-full sm:w-[min(calc(100vw-2rem),480px)]",
                "ring-1 ring-slate-200/80"
              )}
              style={{ height: "min(92dvh, 740px)" }}
            >
              {/* Header */}
              <div className="chatbot-header-shimmer relative shrink-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0a4f5c] via-primary-dark to-primary" />
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/8 blur-3xl" />

                <div className="relative px-4 pb-4 pt-4 sm:px-5 sm:pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-md">
                        <Headphones className="h-5 w-5 text-white" />
                        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-primary-dark bg-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-base font-bold text-white">{chatbotConfig.fullName}</p>
                          <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-100 ring-1 ring-emerald-300/30">
                            {chatbotConfig.supportBadge}
                          </span>
                        </div>
                        <p className="mt-0.5 truncate text-[11px] text-white/75">
                          {firstName ? `Welcome back, ${firstName}` : chatbotConfig.supportSubline}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      {!clientProfile && view === "chat" && (
                        <button
                          type="button"
                          onClick={() => setView("intake")}
                          className="hidden rounded-xl bg-white/12 px-2.5 py-1.5 text-[10px] font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20 sm:inline-flex sm:items-center sm:gap-1"
                        >
                          <UserCircle className="h-3.5 w-3.5" />
                          Profile
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="rounded-xl p-2 text-white/80 transition hover:bg-white/12 hover:text-white"
                        aria-label="Close chat"
                      >
                        <Minimize2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 ring-1 ring-white/15 backdrop-blur-sm">
                    <Clock className="h-3.5 w-3.5 shrink-0 text-emerald-200" />
                    <p className="text-[11px] font-medium text-white/90">
                      AI support available instantly · Human team: {siteConfig.contact.phone}
                    </p>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {view === "intake" ? (
                  <motion.div
                    key="intake"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 16 }}
                    className="flex min-h-0 flex-1 flex-col"
                  >
                    <ChatbotIntake onComplete={handleIntakeComplete} onSkip={() => setView("chat")} />
                  </motion.div>
                ) : (
                  <motion.div key="chat" className="flex min-h-0 flex-1 flex-col">
                    <div
                      ref={scrollRef}
                      className="chatbot-messages flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-4 sm:px-5"
                    >
                      {showWelcome && (
                        <motion.div
                          initial={false}
                          animate={mounted ? { opacity: 1, y: 0 } : undefined}
                          className="space-y-4"
                        >
                          <div className="rounded-2xl border border-primary/10 bg-white p-4 shadow-sm">
                            <AssistantBubble content={chatbotConfig.greeting} />
                          </div>

                          <div>
                            <p className="mb-2.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                              How can we help?
                            </p>
                            <div className="grid grid-cols-2 gap-2">
                              {chatbotConfig.supportCategories.map((cat) => (
                                <button
                                  key={cat.label}
                                  type="button"
                                  onClick={() => void sendMessage(cat.prompt)}
                                  className="rounded-xl border border-slate-200/90 bg-white px-3 py-3 text-left shadow-sm transition hover:border-primary/25 hover:bg-primary-soft/30 hover:shadow-md"
                                >
                                  <p className="text-xs font-bold text-text">{cat.label}</p>
                                  <p className="mt-0.5 line-clamp-2 text-[10px] leading-snug text-gray">
                                    {cat.prompt}
                                  </p>
                                </button>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {messages.map((msg) => (
                        <motion.div
                          key={msg.id}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={cn("flex gap-2.5", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
                        >
                          {msg.role === "assistant" && (
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/15 to-primary/5 ring-1 ring-primary/10">
                              <Bot className="h-4 w-4 text-primary" />
                            </div>
                          )}
                          <div className={cn("flex max-w-[84%] flex-col gap-1", msg.role === "user" && "items-end")}>
                            <div
                              className={cn(
                                "rounded-2xl px-4 py-3",
                                msg.role === "user"
                                  ? "rounded-br-md bg-gradient-to-br from-primary to-primary-dark text-white shadow-md shadow-primary/20"
                                  : "rounded-bl-md border border-slate-200/80 bg-white shadow-sm"
                              )}
                            >
                              {msg.role === "user" ? (
                                <p className="text-[13px] leading-[1.65] sm:text-sm">{msg.content}</p>
                              ) : (
                                <AssistantBubble content={msg.content} animate={msg.id === lastAnimatedId} />
                              )}
                            </div>
                            <span className="px-1 text-[10px] text-muted">{msg.time}</span>
                          </div>
                        </motion.div>
                      ))}

                      {loading && <TypingIndicator />}

                      {showNudge && (
                        <div className="rounded-2xl border border-primary/12 bg-gradient-to-br from-primary-soft/80 to-white p-4 shadow-sm">
                          <p className="text-sm font-bold text-text">Personalize your support</p>
                          <p className="mt-1 text-[12px] leading-relaxed text-gray">
                            Share clinic details for tailored recommendations from Aria.
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => setView("intake")}
                              className="inline-flex items-center gap-1 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-white shadow-sm"
                            >
                              Add profile <ChevronRight className="h-3.5 w-3.5" />
                            </button>
                            <button type="button" onClick={dismissNudge} className="px-3 py-2 text-xs font-medium text-muted">
                              Later
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {showSuggestions && (
                      <div className="shrink-0 border-t border-slate-100 bg-white px-3 py-2.5 sm:px-4">
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted">
                          Quick questions
                        </p>
                        <div className="flex gap-2 overflow-x-auto pb-0.5 scrollbar-thin sm:flex-wrap">
                          {chatbotConfig.suggestedPrompts.map((prompt) => (
                            <button
                              key={prompt}
                              type="button"
                              onClick={() => void sendMessage(prompt)}
                              className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-[11px] font-semibold text-primary-dark transition hover:border-primary/30 hover:bg-primary-soft/50 sm:text-xs"
                            >
                              {prompt}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <SupportQuickBar />

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        void sendMessage(input);
                      }}
                      className="shrink-0 border-t border-slate-100 bg-white p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:p-4"
                    >
                      {!clientProfile && (
                        <button
                          type="button"
                          onClick={() => setView("intake")}
                          className="mb-2 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-primary/20 py-2 text-[11px] font-semibold text-primary sm:hidden"
                        >
                          <UserCircle className="h-3.5 w-3.5" />
                          Add clinic profile
                        </button>
                      )}
                      <div className="chatbot-input-glow flex items-end gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 focus-within:border-primary/30 focus-within:bg-white">
                        <textarea
                          ref={inputRef}
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              void sendMessage(input);
                            }
                          }}
                          placeholder="Type your message…"
                          rows={1}
                          disabled={loading}
                          className="max-h-28 min-h-[44px] flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-text outline-none placeholder:text-muted disabled:opacity-60"
                        />
                        <button
                          type="submit"
                          disabled={!input.trim() || loading}
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary-dark text-white shadow-md transition hover:brightness-105 disabled:opacity-30"
                          aria-label="Send"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-2 text-center text-[10px] text-muted">
                        24/7 AI support · For medical emergencies contact your physician
                      </p>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {!open && (
        <motion.button
          type="button"
          onClick={() => setOpen(true)}
          initial={false}
          animate={mounted ? { scale: 1 } : undefined}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="chatbot-fab group fixed bottom-20 right-4 z-50 sm:bottom-24 sm:right-6"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
          aria-label="Open 24/7 ARTiX support chat"
        >
          <span className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-primary-dark to-[#0a4f5c] shadow-xl shadow-primary/30" />
          <span className="chatbot-fab-ring absolute inset-0 rounded-full" />
          <span className="relative flex h-14 w-14 items-center justify-center text-white sm:h-[3.75rem] sm:w-[3.75rem]">
            <Headphones className="h-6 w-6" />
          </span>
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-400 ring-2 ring-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          <span className="pointer-events-none absolute -top-9 right-0 hidden whitespace-nowrap rounded-lg bg-text px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100 sm:block">
            24/7 Support
          </span>
        </motion.button>
      )}
    </>
  );
}

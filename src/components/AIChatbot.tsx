import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, User, X } from "lucide-react";
import { assistantKnowledge, assistantPrompts } from "../data/system";

interface ChatMessage {
  role: "user" | "bot";
  text: string;
}

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();

  if (lower.includes("about") || lower.includes("who are you")) return assistantKnowledge.about;
  if (lower.includes("project")) return assistantKnowledge.projects;
  if (lower.includes("skill")) return assistantKnowledge.skills;
  if (lower.includes("tech")) return assistantKnowledge.technologies;
  if (lower.includes("contact") || lower.includes("email")) return assistantKnowledge.contact;
  if (lower.includes("mission")) return assistantKnowledge.mission;
  if (lower.includes("hello") || lower.includes("hi")) {
    return "Hello. I am HASWIN_SK's assistant. Ask me about the work, AI ideas, the stack, or how to get in touch.";
  }

  return "I can answer about the developer, AI ideas, projects, skills, technologies, or contact details. Try one of the quick prompts below.";
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: "Hello! I'm Haswin's AI Assistant.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Listen for global toggle event (dispatched from App)
  useEffect(() => {
    function onToggle() {
      setIsOpen((v) => !v);
    }
    window.addEventListener("toggle-chatbot", onToggle as EventListener);
    return () => window.removeEventListener("toggle-chatbot", onToggle as EventListener);
  }, []);

  // Focus the input when the chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
        inputRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
      }, 80);
    }
  }, [isOpen]);

  // Broadcast visibility so other UI (terminal) can react on small screens
  useEffect(() => {
    try {
      window.dispatchEvent(new CustomEvent("chatbot-visibility", { detail: { isOpen } }));
    } catch (e) {
      // ignore
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: getBotResponse(userMsg) },
      ]);
      setIsTyping(false);
    }, 800 + Math.random() * 500);
  };

  const hasConversation = messages.some((message) => message.role === "user");

  // Resize textarea to fit content
  const resizeInput = () => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 240)}px`;
  };

  useEffect(() => resizeInput(), [input, isOpen]);

  // debounce resize for orientation / keyboard changes
  useEffect(() => {
    let t: any;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        resizeInput();
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      }, 120);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* Toggle button */}
      {/* Floating toggle: hide while chat is open so we can show an in-header close control */}
      <motion.button
        className={`fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[60] flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-[#D6B477]/35 bg-[#1B1A18] p-0 text-[#E8CEA0] shadow-[0_0_30px_rgba(214,180,119,0.12)] sm:bottom-6 sm:right-6 sm:h-auto sm:w-auto sm:p-0 ${isOpen ? "hidden md:inline-flex" : "inline-flex"}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open AI chat"}
        title="Ask HASWIN_SK"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
      >
        <span className="flex items-center gap-2 px-3 py-2 text-[10px] font-mono tracking-[0.2em] sm:px-4 sm:py-3 sm:text-[11px] sm:tracking-[0.3em]">
          {isOpen ? <X size={16} /> : <MessageCircle size={16} />}
          <span className="hidden md:inline">ASK HASWIN_SK</span>
        </span>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-x-3 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 mx-auto flex max-h-[75vh] w-auto max-w-[400px] flex-col overflow-hidden rounded-[20px] border border-[#D6B477]/25 bg-[#11100F] shadow-[0_18px_70px_rgba(0,0,0,0.5),0_0_35px_rgba(214,180,119,0.08)] sm:inset-x-auto sm:bottom-20 sm:right-6 sm:w-[min(400px,calc(100vw-2rem))]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 border-b border-[#D6B477]/15 bg-[#1B1A18] px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D6B477]/60 bg-[#D6B477] text-[#11100F] shadow-[0_0_18px_rgba(214,180,119,0.22)]">
                  <Bot size={17} />
                </div>
                <div>
                  <div className="text-sm font-semibold tracking-[0.08em] text-[#F5F1E8]">ASK HASWIN_SK</div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D6B477] shadow-[0_0_8px_rgba(214,180,119,0.8)]" />
                    <span className="font-mono text-[10px] tracking-[0.12em] text-[#AAA49A]">ONLINE</span>
                  </div>
                </div>
              </div>
              <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  title="Close chat"
                  className="rounded-lg p-2 text-[#AAA49A] transition-colors hover:bg-[#D6B477]/10 hover:text-[#E8CEA0]"
                >
                  <X size={16} />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-[#11100F] p-4"
            >
              {!hasConversation && (
                <div className="rounded-xl border border-[#D6B477]/15 bg-[#22201D] p-3">
                  <p className="text-sm leading-6 text-[#AAA49A]">
                    I can help you explore his projects, technical skills,
                    experience and contact information.
                  </p>
                  <div className="mt-4 grid gap-2">
                    {assistantPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => {
                          setInput(prompt);
                          inputRef.current?.focus();
                        }}
                        className="rounded-lg border border-[#D6B477]/25 bg-[#1B1A18] px-3 py-2 text-left text-xs text-[#E8CEA0] transition-colors hover:border-[#D6B477]/65 hover:bg-[#D6B477]/10"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex items-end gap-2 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {msg.role === "bot" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D6B477]/35 bg-[#D6B477]/10 text-[#E8CEA0]">
                      <Bot size={13} />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] whitespace-pre-wrap break-words rounded-2xl px-3 py-2 text-sm leading-6 ${
                      msg.role === "user"
                        ? "rounded-br-md border border-[#D6B477]/35 bg-[#D6B477]/15 text-[#F5F1E8]"
                        : "rounded-bl-md border border-[#D6B477]/12 bg-[#22201D] text-[#AAA49A]"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.role === "user" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D6B477]/25 bg-[#D6B477]/10 text-[#D6B477]">
                      <User size={13} />
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-2 items-center">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#D6B477]/35 bg-[#D6B477]/10 text-[#E8CEA0]">
                    <Bot size={13} />
                  </div>
                  <div className="rounded-2xl rounded-bl-md border border-[#D6B477]/12 bg-[#22201D] px-3 py-2">
                    <div className="flex gap-1">
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-[#D6B477]/70"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-[#D6B477]/70"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: 0.2,
                        }}
                      />
                      <motion.span
                        className="h-1.5 w-1.5 rounded-full bg-[#D6B477]/70"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: 0.4,
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div
              className="flex items-end gap-2 border-t border-[#D6B477]/15 bg-[#1B1A18] px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3"
            >
              <textarea
                value={input}
                ref={inputRef}
                onChange={(e) => setInput(e.target.value)}
                onInput={resizeInput}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Ask me anything about Haswin..."
                className="min-h-[48px] max-h-[140px] flex-1 resize-none overflow-y-auto rounded-xl border border-[#D6B477]/20 bg-[#22201D] px-3 py-3 text-sm leading-6 text-[#F5F1E8] outline-none transition-colors placeholder:text-[#AAA49A]/60 focus:border-[#D6B477]/65"
                aria-label="Chat input"
              />
              <motion.button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#D6B477]/35 bg-[#D6B477] text-[#11100F] transition-colors hover:bg-[#E8CEA0] disabled:cursor-not-allowed disabled:opacity-40"
                whileTap={{ scale: 0.9 }}
              >
                <Send size={14} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Focus the input when the chat opens
// We place this effect outside the component to avoid recreating handlers unnecessarily
// but still rely on the ref via DOM query when opened.
// Note: run after render when isOpen changes.

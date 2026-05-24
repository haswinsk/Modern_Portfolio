import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, Sparkles, User, X } from "lucide-react";
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
      text: "Ask HASWIN_SK about AI",
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
        className={`fixed bottom-6 right-6 z-[60] rounded-full glass-panel-strong border border-neon-blue/25 shadow-[0_0_30px_rgba(0,212,255,0.12)] text-neon-blue overflow-hidden ${isOpen ? "hidden md:inline-flex" : "inline-flex"}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open AI chat"}
        title="Ask HASWIN_SK"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
      >
        <span className="flex items-center gap-2 px-4 py-3 text-[11px] font-mono tracking-[0.3em]">
          {isOpen ? <X size={16} /> : <MessageCircle size={16} />}
          <span className="hidden md:inline">ASK HASWIN_SK</span>
        </span>
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed z-50 left-4 right-4 bottom-20 md:bottom-20 md:right-6 md:left-auto mx-auto w-[calc(100%-3rem)] max-w-[300px] glass-panel-strong rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-[0_0_48px_rgba(0,212,255,0.08)] -translate-y-[1px]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="relative px-2 py-1.5 md:px-3 md:py-3 border-b border-white/5 flex items-center justify-between gap-2 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-neon-blue/10 flex items-center justify-center border border-neon-blue/20">
                  <Bot size={12} className="text-neon-blue" />
                </div>
                <div>
                  <div className="text-sm font-medium text-white">Ask HASWIN_SK</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[10px] font-mono text-white/40">ONLINE</span>
                  </div>
                </div>
              </div>
              <Sparkles size={10} className="text-neon-blue/60" />

              {/* In-header close button for mobile — sits over the X area and matches floating control */}
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                title="Close chat"
                className="absolute top-2 right-2 md:hidden z-70 p-2 rounded-full bg-transparent hover:bg-white/3"
              >
                <X size={16} className="text-white/70" />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="h-[26vh] md:h-80 max-h-[70vh] overflow-y-auto p-2 md:p-3 space-y-2"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`flex gap-2 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {msg.role === "bot" && (
                    <div className="w-6 h-6 rounded-full bg-neon-blue/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Bot size={12} className="text-neon-blue" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-1.5 py-0.5 rounded-lg text-xs md:text-sm leading-tight ${
                      msg.role === "user"
                        ? "bg-neon-blue/10 text-neon-blue border border-neon-blue/20"
                        : "bg-white/5 text-white/70 border border-white/5"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-6 h-6 rounded-full bg-purple-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                      <User size={12} className="text-purple-accent" />
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-2 items-center">
                  <div className="w-4.5 h-4.5 rounded-full bg-neon-blue/10 flex items-center justify-center shrink-0">
                    <Bot size={10} className="text-neon-blue" />
                  </div>
                  <div className="px-1.5 py-0.5 rounded-lg bg-white/5 border border-white/5 text-xs">
                    <div className="flex gap-1">
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-white/30"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-white/30"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: 0.2,
                        }}
                      />
                      <motion.span
                        className="w-1.5 h-1.5 rounded-full bg-white/30"
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

            <div className="px-2.5 md:px-4 pb-3 flex flex-wrap gap-2">
              {assistantPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  className="inline-block px-2 py-0.5 rounded-full text-[10px] md:text-xs lg:text-sm font-mono tracking-[0.06em] text-white/40 bg-white/[0.03] border border-white/5 hover:text-neon-blue hover:border-neon-blue/20 transition-colors whitespace-normal text-center max-w-full leading-tight"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input */}
            <div
              className="px-2.5 py-2 md:px-3 md:py-3 border-t border-white/5 flex items-end gap-2 bg-white/[0.02]"
              style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
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
                placeholder="Ask about AI ideas... (Enter to send, Shift+Enter for newline)"
                className="flex-1 min-h-[28px] max-h-[180px] px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs md:text-sm placeholder:text-white/20 focus:outline-none focus:border-neon-blue/30 resize-none transition-colors"
                aria-label="Chat input"
              />
              <motion.button
                onClick={handleSend}
                className="p-2.5 rounded-lg bg-neon-blue/10 text-neon-blue hover:bg-neon-blue/20 transition-colors border border-neon-blue/15"
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

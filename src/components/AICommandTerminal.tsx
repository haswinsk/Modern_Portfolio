import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp, Terminal, X, Zap } from "lucide-react";
import { terminalBootLines, terminalCommands } from "../data/system";
import { siteConfig } from "../data/site";

type TerminalEntry = {
  id: number;
  role: "system" | "user";
  text: string;
};

function pushLine(lines: string[], text: string) {
  if (text) lines.push(text);
}

export default function AICommandTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalEntry[]>(
    terminalBootLines.map((text, index) => ({ id: index + 1, role: "system", text }))
  );
  const [sequence, setSequence] = useState(0);
  const [executing, setExecuting] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timersRef = useRef<number[]>([]);

  const commandIndex = useMemo(() => {
    return terminalCommands.map((command) => command.toLowerCase());
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  // Hide terminal button on small screens when chat is open
  useEffect(() => {
    const onChatVis = (e: any) => {
      setChatOpen(Boolean(e?.detail?.isOpen));
    };
    window.addEventListener("chatbot-visibility", onChatVis as EventListener);
    return () => window.removeEventListener("chatbot-visibility", onChatVis as EventListener);
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [history, executing]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  const addSystemLines = (lines: string[], onDone?: () => void) => {
    setExecuting(true);
    lines.forEach((line, index) => {
      const timer = window.setTimeout(() => {
        setHistory((current) => [
          ...current,
          { id: current.length + index + 1, role: "system", text: line },
        ]);
        if (index === lines.length - 1) {
          setExecuting(false);
          onDone?.();
        }
      }, 260 + index * 220);
      timersRef.current.push(timer);
    });
  };

  const runCommand = (rawValue: string) => {
    const value = rawValue.trim();
    if (!value) return;

    setSequence((current) => current + 1);
    setHistory((current) => [
      ...current,
      { id: current.length + 1, role: "user", text: `${siteConfig.name.toLowerCase()}@system:~$ ${value}` },
    ]);
    setInput("");

    const command = value.toLowerCase();
    const responseLines: string[] = [];

    if (command === "clear") {
      setHistory(terminalBootLines.map((text, index) => ({ id: index + 1, role: "system", text })));
      return;
    }

    if (command === "help") {
      pushLine(responseLines, "AVAILABLE COMMANDS:");
      pushLine(responseLines, terminalCommands.join("  |  "));
      pushLine(responseLines, "Tip: try sudo unlock for a classified surprise.");
    } else if (command === "about") {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
      pushLine(responseLines, "HASWIN_SK // creative full stack builder");
      pushLine(responseLines, "Crafting cinematic interfaces and AI-first product systems.");
    } else if (command === "projects") {
      document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      pushLine(responseLines, "Opening project database...");
      pushLine(responseLines, "Scroll detected. Featured projects loaded.");
    } else if (command === "skills" || command === "system-status") {
      document.getElementById("arsenal")?.scrollIntoView({ behavior: "smooth" });
      pushLine(responseLines, command === "skills" ? "Mapping neural skill lattice..." : "System telemetry synchronized.");
      pushLine(responseLines, "Live status stabilized at premium operating speed.");
    } else if (command === "contact") {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      pushLine(responseLines, `Transmission routed to ${siteConfig.email}.`);
      pushLine(responseLines, "Use the contact panel to send a mission update.");
    } else if (command === "resume") {
      if (siteConfig.resumeUrl && siteConfig.resumeUrl !== "#") {
        window.open(siteConfig.resumeUrl, "_blank", "noopener,noreferrer");
        pushLine(responseLines, "Resume file opened in a secure window.");
      } else {
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
        pushLine(responseLines, "Resume channel is linked from the hero section.");
      }
    } else if (command === "mission") {
      document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" });
      pushLine(responseLines, "Mission mode online: building premium future-facing AI experiences.");
      pushLine(responseLines, "Objective: balance cinematic motion with fast performance.");
    } else if (command === "sudo unlock") {
      window.dispatchEvent(new CustomEvent("unlock-classified"));
      pushLine(responseLines, "CLASSIFIED MODE REQUEST ACCEPTED.");
      pushLine(responseLines, "Hidden interface unlocked. Proceed carefully.");
    } else {
      pushLine(responseLines, `Unknown command: ${value}`);
      pushLine(responseLines, "Type help for a list of available controls.");
    }

    addSystemLines(responseLines);
  };

  return (
    <>
      {/* Hide the terminal trigger on small screens when chatbot is open */}
      <motion.button
        className={
          `fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-4 py-3 rounded-full glass-panel-strong border border-neon-blue/25 shadow-[0_0_35px_rgba(0,212,255,0.12)] text-neon-blue ` +
          (chatOpen ? "hidden md:inline-flex" : "inline-flex")
        }
        onClick={() => setIsOpen((value) => !value)}
        whileHover={{ scale: 1.04, y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="flex items-center gap-2 text-[11px] font-mono tracking-[0.28em]">
          <Terminal size={14} />
          AI TERMINAL
          <ChevronUp size={13} className={isOpen ? "rotate-180 transition-transform" : "transition-transform"} />
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[min(92vw,760px)]"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
          >
            <div className="glass-panel-strong rounded-3xl overflow-hidden border border-neon-blue/20 shadow-[0_0_80px_rgba(0,212,255,0.1)]">
              <div className="flex items-center justify-between px-4 md:px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                <div>
                  <div className="text-[10px] font-mono tracking-[0.4em] text-neon-blue/60">CYBER TERMINAL</div>
                  <div className="text-sm text-white/90">Futuristic command console</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-white/30">SEQ {String(sequence).padStart(3, "0")}</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div
                ref={listRef}
                className="max-h-[44vh] md:max-h-[52vh] overflow-y-auto px-4 md:px-5 py-4 space-y-2 bg-[linear-gradient(180deg,rgba(5,5,8,0.92),rgba(5,5,8,0.75))] terminal-shell"
              >
                {history.map((entry) => (
                  <motion.div
                    key={entry.id}
                    className="font-mono text-[12px] leading-relaxed"
                    initial={{ opacity: 0, x: -6, filter: "blur(2px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  >
                    <span className={entry.role === "user" ? "text-cyan-300" : "text-neon-blue/80"}>{entry.text}</span>
                  </motion.div>
                ))}
                {executing && (
                  <motion.div
                    className="flex items-center gap-2 text-[12px] font-mono text-white/50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <Zap size={13} className="text-neon-blue" />
                    executing command sequence...
                    <span className="inline-flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse [animation-delay:150ms]" />
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse [animation-delay:300ms]" />
                    </span>
                  </motion.div>
                )}
              </div>

              <div className="px-4 md:px-5 py-4 border-t border-white/5 bg-white/[0.02]">
                <form
                  className="flex items-center gap-3"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (!executing) {
                      runCommand(input);
                    }
                  }}
                >
                  <div className="flex-1 flex items-center gap-2 rounded-2xl border border-neon-blue/15 bg-black/35 px-4 py-3">
                    <span className="text-neon-blue/70 font-mono text-[11px] tracking-[0.24em]">HASWIN_SK&gt;</span>
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(event) => setInput(event.target.value)}
                      className="flex-1 bg-transparent text-sm text-white placeholder:text-white/20 outline-none font-mono terminal-cursor"
                      placeholder="type a command"
                      aria-label="Terminal command input"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-3 rounded-2xl bg-neon-blue/10 text-neon-blue border border-neon-blue/20 hover:bg-neon-blue/20 transition-colors text-xs font-mono tracking-[0.24em]"
                    disabled={executing}
                  >
                    EXECUTE
                  </button>
                </form>

                <div className="mt-3 flex flex-wrap gap-2">
                  {commandIndex.slice(0, 6).map((command) => (
                    <button
                      key={command}
                      onClick={() => runCommand(command)}
                      className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-[0.18em] text-white/45 bg-white/[0.03] border border-white/5 hover:text-neon-blue hover:border-neon-blue/20 transition-colors"
                    >
                      {command.toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { useState, useRef, useEffect } from "react";
import { send as emailjsSend, init as emailjsInit } from "@emailjs/browser";
import { motion, useInView } from "framer-motion";
import { Mail, Globe, Code, Camera, Send, Copy, Check } from "lucide-react";
import { siteConfig } from "../data/site";

const contactLinks = [
  {
    label: "Email",
    value: siteConfig.email,
    icon: Mail,
    href: `mailto:${siteConfig.email}`,
    color: "#00d4ff",
  },
  {
    label: "LinkedIn",
    value: "haswinsk",
    icon: Globe,
    href: siteConfig.linkedin,
    color: "#3b82f6",
  },
  {
    label: "GitHub",
    value: "haswinsk",
    icon: Code,
    href: siteConfig.github,
    color: "#a855f7",
  },
  // Instagram removed per user request
];

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "> Contact protocol initialized...",
    "> Ready for AI, product, and collaboration inquiries...",
  ]);
  const ref = useRef(null);
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const recipientEmail = import.meta.env.VITE_CONTACT_RECIPIENT_EMAIL || siteConfig.email;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update terminal lines with a transmitting indicator
    setTerminalLines((prev) => [
      ...prev,
      `> Name: ${formData.name}`,
      `> Email: ${formData.email}`,
      `> Message: ${formData.message.slice(0, 30)}...`,
      "> Transmitting...",
    ]);

    // Prepare template params for EmailJS
    const templateParams = {
      name: formData.name,
      title: `Portfolio contact from ${formData.name}`,
      email: formData.email,
      from_name: formData.name,
      from_email: formData.email,
      sender_email: formData.email,
      reply_to: formData.email,
      subject: `Portfolio contact from ${formData.name}`,
      message: formData.message,
      to_email: recipientEmail,
    };

    // Read EmailJS settings from environment variables (Vite)
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

    // Send email via EmailJS
    setSending(true);
    emailjsSend(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        setTerminalLines((prev) => [
          ...prev.filter((l) => l !== "> Transmitting..."),
          "> Message sent successfully.",
          "> _",
        ]);
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        console.error("Email send error:", err);
        // Try to extract a useful message from the error
        const errMsg = err?.text || err?.status || err?.message || JSON.stringify(err);
        setTerminalLines((prev) => [
          ...prev.filter((l) => l !== "> Transmitting..."),
          "> Transmit failed. Details:",
          `> ${String(errMsg).slice(0, 200)}`,
        ]);
      })
      .finally(() => setSending(false));
  };

  // auto-scroll terminal to bottom when new lines are pushed
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalLines]);

  // Initialize EmailJS (optional) — values provided via Vite env variables
  useEffect(() => {
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      try {
        emailjsInit(publicKey);
      } catch (e) {
        // ignore init errors; send will still work when publicKey passed to send()
      }
    }
  }, []);

  return (
    <section
      id="contact"
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-radial-glow opacity-40" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-neon-blue/60 tracking-[0.3em] mb-3 block">
            [ COMMAND_CENTER ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="text-sm md:text-base text-white/40 max-w-xl mx-auto">
            If you want to talk AI ideas, future-facing products, or creative web builds, this is the channel.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Terminal contact panel */}
          <motion.div
            className="glass-panel-strong rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            {/* Terminal header */}
            <div className="px-4 py-3 border-b border-white/5 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
              <div className="w-3 h-3 rounded-full bg-green-400/60" />
              <span className="ml-3 text-[10px] font-mono text-white/30">
                contact_terminal — bash
              </span>
            </div>

            {/* Terminal content */}
            <div className="p-4 md:p-6">
              <div
                ref={terminalRef}
                className="font-mono text-xs md:text-sm space-y-1 mb-6 max-h-[44vh] md:max-h-[52vh] overflow-y-auto pr-2"
              >
                {terminalLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`${
                      line.includes("successfully")
                        ? "text-green-400/70"
                        : line.includes("Transmitting")
                        ? "text-neon-blue/70"
                        : "text-white/40"
                    }`}
                  >
                    {line}
                  </motion.div>
                ))}
                <span className="inline-block w-2 h-4 bg-neon-blue animate-blink align-middle" />
              </div>

              {/* Contact links */}
              <div className="space-y-3">
                {contactLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors group"
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${link.color}15` }}
                    >
                      <link.icon size={16} style={{ color: link.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-mono text-white/30">
                        {link.label}
                      </div>
                      <div className="text-sm text-white/70 truncate">
                        {link.value}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleCopy(link.value)}
                        className="p-1.5 rounded text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
                        title="Copy"
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded text-white/30 hover:text-white/60 hover:bg-white/5 transition-colors"
                      >
                        <Send size={14} />
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            className="glass-panel rounded-xl p-6 md:p-8"
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-sm font-mono text-neon-blue/60 tracking-wider mb-6">
              SEND_TRANSMISSION
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono text-white/30 tracking-wider block mb-1.5">
                  IDENTIFIER (NAME)
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-neon-blue/40 transition-colors"
                  placeholder="Enter your name..."
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-white/30 tracking-wider block mb-1.5">
                  COMMUNICATION_CHANNEL (EMAIL)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-neon-blue/40 transition-colors"
                  placeholder="Enter your email..."
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-mono text-white/30 tracking-wider block mb-1.5">
                  MESSAGE_PAYLOAD
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-neon-blue/40 transition-colors resize-none"
                  placeholder="Type your message..."
                  required
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                className={`w-full flex items-center justify-center gap-2 px-5 py-3 bg-neon-blue/10 border border-neon-blue/40 rounded-lg text-neon-blue text-sm font-medium transition-all ${
                  sending ? "opacity-60 cursor-not-allowed" : "hover:bg-neon-blue/20"
                }`}
                whileHover={{ scale: sending ? 1 : 1.02 }}
                whileTap={{ scale: sending ? 1 : 0.98 }}
              >
                {sending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-neon-blue rounded-full border-t-transparent animate-spin inline-block" />
                    SENDING...
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    TRANSMIT MESSAGE
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

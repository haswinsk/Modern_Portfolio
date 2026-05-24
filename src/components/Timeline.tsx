import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Terminal, Code, Cpu, Database, Zap, Sparkles } from "lucide-react";
import { timelineEvents } from "../data/timeline";

const iconMap: Record<string, React.ElementType> = {
  terminal: Terminal,
  code: Code,
  cpu: Cpu,
  database: Database,
  zap: Zap,
  sparkles: Sparkles,
};

export default function Timeline() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="timeline"
      className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-radial-glow opacity-40" />

      <div ref={ref} className="relative z-10 max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-neon-blue/60 tracking-[0.3em] mb-3 block">
            [ SYSTEM_LOGS ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Journey <span className="text-gradient">Timeline</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-blue/30 via-purple-accent/20 to-transparent md:-translate-x-px" />

          {timelineEvents.map((event, i) => {
            const Icon = iconMap[event.icon] || Terminal;
            const isLeft = i % 2 === 0;

            return (
              <motion.div
                key={event.id}
                className={`relative flex items-start gap-6 md:gap-0 mb-10 md:mb-12 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.15 }}
              >
                {/* Content */}
                <div
                  className={`flex-1 md:w-1/2 ${
                    isLeft ? "md:pr-10 md:text-right" : "md:pl-10 md:text-left"
                  }`}
                >
                  <div
                    className={`glass-panel rounded-xl p-4 md:p-5 inline-block w-full md:w-auto ${
                      isLeft ? "md:text-right" : "md:text-left"
                    }`}
                  >
                    <span className="text-xs font-mono text-neon-blue/60 tracking-wider block mb-1">
                      {event.year}
                    </span>
                    <h3 className="text-base md:text-lg font-bold text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/50 leading-relaxed">
                      {event.description}
                    </p>
                    <span className="text-[10px] font-mono text-white/20 mt-2 block">
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Center node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    className="w-8 h-8 rounded-full glass-panel flex items-center justify-center border border-neon-blue/30"
                    whileHover={{ scale: 1.2 }}
                  >
                    <Icon size={14} className="text-neon-blue" />
                  </motion.div>
                </div>

                {/* Spacer for other side */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

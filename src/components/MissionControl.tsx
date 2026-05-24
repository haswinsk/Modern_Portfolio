import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Activity, Cpu, Globe, Zap } from "lucide-react";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const metrics = [
  {
    label: "System Uptime",
    value: 99,
    suffix: "%",
    icon: Activity,
    color: "#22c55e",
  },
  {
    label: "Code Efficiency",
    value: 95,
    suffix: "%",
    icon: Cpu,
    color: "#00d4ff",
  },
  {
    label: "Global Reach",
    value: 12,
    suffix: "+",
    icon: Globe,
    color: "#a855f7",
  },
  {
    label: "Innovation Index",
    value: 98,
    suffix: "%",
    icon: Zap,
    color: "#f59e0b",
  },
];

export default function MissionControl() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow opacity-30" />

      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-xs font-mono text-neon-blue/60 tracking-[0.3em] mb-3 block">
            [ MISSION_CONTROL ]
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            System <span className="text-gradient">Dashboard</span>
          </h2>
          <p className="text-sm md:text-base text-white/40 max-w-xl mx-auto">
            Live indicators showing technical strengths, AI competence, and product-minded delivery — concise and recruiter-friendly.
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              className="glass-panel rounded-xl p-5 md:p-6 relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Background pulse */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                style={{ backgroundColor: metric.color }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <metric.icon
                    size={20}
                    style={{ color: metric.color }}
                    className="opacity-80"
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: metric.color }}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
                <div
                  className="text-2xl md:text-3xl font-bold mb-1"
                  style={{ color: metric.color }}
                >
                  <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                </div>
                <div className="text-[10px] md:text-xs font-mono text-white/40 tracking-wider">
                  {metric.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Radar / Activity visualization */}
        <motion.div
          className="glass-panel rounded-xl p-6 md:p-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono text-neon-blue/60 tracking-wider">
              NEURAL_ACTIVITY_MONITOR
            </span>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[10px] font-mono text-white/40">LIVE</span>
            </div>
          </div>

          {/* Simulated activity bars */}
          <div className="space-y-3">
            {["Frontend Development", "Backend Architecture", "UI/UX Design", "AI Integration", "System Optimization"].map(
              (activity, i) => (
                <div key={activity} className="flex items-center gap-4">
                  <span className="text-xs font-mono text-white/50 w-32 md:w-40 shrink-0">
                    {activity}
                  </span>
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, #00d4ff, #a855f7)`,
                      }}
                      initial={{ width: 0 }}
                      animate={
                        isInView
                          ? { width: `${75 + Math.random() * 20}%` }
                          : {}
                      }
                      transition={{ delay: 0.8 + i * 0.15, duration: 1.2 }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-white/30 w-8 text-right">
                    {75 + Math.floor(Math.random() * 20)}%
                  </span>
                </div>
              )
            )}
          </div>

          {/* Bottom status line */}
          <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] font-mono text-white/30">
              LAST_SYNC: {new Date().toLocaleTimeString()}
            </span>
            <span className="text-[10px] font-mono text-neon-blue/40">
              ALL_SYSTEMS_NOMINAL
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

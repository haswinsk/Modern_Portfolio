import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code,
  Cpu,
  Database,
  Sparkles,
  Terminal,
  Zap,
} from "lucide-react";
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
      className="relative overflow-hidden px-4 pb-32 pt-14 sm:px-6 md:py-20 lg:px-8 lg:pb-36 lg:pt-24"
    >
      <div ref={ref} className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-3 block font-mono text-[10px] tracking-[0.3em] text-[#D6B477]/75">
            [ SYSTEM_LOGS ]
          </span>
          <h2 className="mb-4 font-serif text-4xl font-semibold tracking-[-0.03em] text-[#F5F1E8] sm:text-5xl md:text-6xl">
            Journey <span className="text-[#D6B477]">Timeline</span>
          </h2>
          <div className="mx-auto mb-5 h-px w-20 bg-gradient-to-r from-transparent via-[#D6B477] to-transparent" />
          <p className="text-sm leading-7 text-[#AAA49A] md:text-base">
            A journey of continuous learning, building products, exploring
            technologies and growing as an engineer.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute bottom-0 left-[13px] top-0 w-0.5 bg-[#D6B477]/75 shadow-[0_0_8px_rgba(214,180,119,0.32)] md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-7 md:space-y-9">
            {timelineEvents.map((event, index) => {
              const Icon = iconMap[event.icon] || Terminal;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={event.id}
                  className="relative grid grid-cols-[28px_1fr] items-center gap-4 md:grid-cols-[1fr_44px_1fr] md:gap-0"
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.15 + index * 0.1,
                    duration: 0.55,
                    ease: "easeOut",
                  }}
                >
                  <div
                    className={`relative col-start-2 row-start-1 md:col-span-1 ${
                      isLeft
                        ? "md:col-start-1 md:pr-10 md:text-right"
                        : "md:col-start-3 md:pl-10 md:text-left"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute top-1/2 hidden h-px w-[22px] -translate-y-1/2 bg-[#D6B477]/70 shadow-[0_0_6px_rgba(214,180,119,0.25)] md:block ${
                        isLeft ? "right-[-22px]" : "left-[-22px]"
                      }`}
                    />
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -left-4 top-1/2 h-px w-4 -translate-y-1/2 bg-[#D6B477]/70 shadow-[0_0_6px_rgba(214,180,119,0.25)] md:hidden"
                    />
                    <article className="group rounded-2xl border border-[#D6B477]/22 bg-[#1B1A18]/95 p-4 text-left shadow-[0_12px_35px_rgba(0,0,0,0.14)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-0.5 hover:border-[#D6B477]/60 hover:shadow-[0_16px_38px_rgba(0,0,0,0.22)] md:p-5">
                      <div
                        className={`mb-3 flex items-center justify-between gap-3 ${
                          isLeft ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <span className="font-mono text-[11px] tracking-[0.16em] text-[#D6B477]">
                          {event.year}
                        </span>
                        <span className="rounded-full border border-[#D6B477]/25 bg-[#D6B477]/8 px-2.5 py-1 font-mono text-[9px] tracking-[0.12em] text-[#AAA49A]">
                          {event.category}
                        </span>
                      </div>
                      <div
                        className={`flex items-start gap-3 ${
                          isLeft ? "md:flex-row-reverse" : ""
                        }`}
                      >
                        <div className="mt-0.5 shrink-0 rounded-lg border border-[#D6B477]/30 bg-[#D6B477]/10 p-2 text-[#E8CEA0] transition-colors duration-200 group-hover:border-[#D6B477]/70 group-hover:bg-[#D6B477]/15">
                          <Icon size={17} />
                        </div>
                        <div className={isLeft ? "md:text-right" : ""}>
                          <h3 className="font-serif text-lg font-semibold text-[#F5F1E8] md:text-xl">
                            {event.title}
                          </h3>
                          <p className="mt-2 text-sm leading-6 text-[#AAA49A]">
                            {event.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>

                  <div className="col-start-1 row-start-1 flex justify-center md:col-start-2">
                    <motion.div
                      className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-[#D6B477] bg-[#201F1C] shadow-[0_0_18px_rgba(214,180,119,0.2)] md:h-9 md:w-9"
                      whileHover={{ boxShadow: "0 0 26px rgba(214,180,119,0.42)" }}
                    >
                      <span className="h-2 w-2 rounded-full bg-[#E8CEA0] shadow-[0_0_10px_rgba(232,206,160,0.8)] md:h-2.5 md:w-2.5" />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

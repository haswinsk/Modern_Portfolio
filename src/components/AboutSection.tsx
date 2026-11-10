import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Lightbulb, Rocket, BookOpen } from "lucide-react";

const stats = [
  { label: "Projects Built", value: "15+", icon: Code },
  { label: "Technologies", value: "20+", icon: Lightbulb },
  { label: "UI Experiments", value: "50+", icon: Rocket },
  { label: "Current Focus", value: "AI & Web3", icon: BookOpen },
];

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      className="relative overflow-hidden px-4 pb-16 pt-8 sm:px-6 md:pb-20 md:pt-10 lg:min-h-[calc(100vh-4.5rem)] lg:px-8 lg:py-8"
    >
      <div ref={ref} className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          className="mb-8 text-center md:mb-10 lg:mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-3 block font-mono text-[10px] tracking-[0.3em] text-[#D6B477]/75">
            [ IDENTITY_PANEL ]
          </span>
          <h2 className="mb-4 text-4xl font-semibold tracking-[-0.03em] text-[#F5F1E8] sm:text-5xl md:text-6xl lg:text-6xl">
            About <span className="text-[#D6B477]">Me</span>
          </h2>
          <div className="mx-auto h-px w-20 bg-gradient-to-r from-transparent via-[#D6B477] to-transparent" />
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-[38%_62%] lg:gap-12">
          <motion.div
            className="relative mx-auto w-full max-w-[420px]"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative mx-auto h-[380px] w-full max-w-[420px] overflow-hidden rounded-2xl border border-[#D6B477]/35 bg-[#191817] shadow-[0_0_45px_rgba(214,180,119,0.08)] sm:h-[440px] lg:h-[min(520px,calc(100vh-12rem))]">
              <img
                src="/images/Confident%20Young%20Man%20in%20Black%20Shirt%20(1).png"
                alt="HASWIN SK"
                className="h-full w-full object-cover object-[center_top] brightness-[0.9] contrast-[1.05] saturate-[0.92]"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#11100F] via-[#11100F]/45 to-transparent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className="mb-7 space-y-3 lg:mb-6">
              <p className="text-base leading-7 text-[#F5F1E8]/85 md:text-lg lg:text-[17px] lg:leading-7">
                I am a passionate{" "}
                <span className="font-medium text-[#D6B477]">
                  Full Stack Developer
                </span>{" "}
                who loves building products that push the boundaries of what is
                possible on the web.
              </p>
              <p className="text-sm leading-6 text-[#AAA49A] md:text-base lg:text-[15px] lg:leading-6">
                My fascination with modern technologies drives me to explore{" "}
                <span className="text-[#E8CEA0]">AI-powered applications</span>,
                intelligent interfaces, automation and scalable web systems. I
                enjoy solving real-world problems, experimenting with new
                technologies and turning ideas into meaningful products.
              </p>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Education", "Karpagam Academy of Higher Education", BookOpen],
                ["Department", "Computer Science and Engineering", Code],
                ["Current Year", "3rd Year", Rocket],
                ["Career Focus", "Full Stack Development and AI", Lightbulb],
              ].map(([label, value, Icon]) => (
                <div
                  key={label as string}
                  className="flex min-h-[86px] items-start gap-3 rounded-lg border border-[#D6B477]/20 bg-[#191817]/70 p-3.5"
                >
                  <Icon className="mt-0.5 shrink-0 text-[#D6B477]" size={19} />
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.16em] text-[#D6B477]/75">
                      {label as string}
                    </div>
                    <div className="mt-1 text-xs leading-5 text-[#F5F1E8]/80">
                      {value as string}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="group flex min-h-[118px] flex-col items-center justify-center rounded-xl border border-[#D6B477]/20 bg-[#201F1C]/75 p-4 text-center transition-colors hover:border-[#D6B477]/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ y: -4 }}
                >
                  <stat.icon
                    size={20}
                    className="mb-2 text-[#D6B477]/70 transition-colors group-hover:text-[#E8CEA0]"
                  />
                  <div className="mb-1 text-xl font-semibold text-[#F5F1E8] md:text-2xl">
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] tracking-[0.12em] text-[#AAA49A] md:text-xs">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

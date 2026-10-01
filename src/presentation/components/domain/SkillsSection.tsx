"use client";

import { motion } from "framer-motion";
import { BlurText } from "../ui/blur-text";
import { useLanguage } from "@/presentation/context/LanguageContext";
import { Skill } from "@/domain/entities/Skill";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export function SkillsSection({ skills }: { skills: Skill[] }) {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            {t("skills.subtitle")}
          </h2>
          <BlurText
            text={t("skills.title")}
            className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white"
            animateBy="words"
            direction="bottom"
          />
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            {t("skills.description")}
          </p>
        </div>

        {/* Skills Grid */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {skills.map((skill, index) => {
            const rotation = index % 2 === 0 ? 5 : -5;
            return (
            <motion.div
              key={skill.id}
              variants={cardVariants}
              whileHover={{ 
                y: -5, 
                x: 5,
                rotate: rotation,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              className="group relative"
            >
              <div
                className="relative flex flex-col items-center gap-4 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-transparent"
              >
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl"
                  style={{
                    background: `radial-gradient(circle at center, ${skill.color}, transparent 70%)`,
                  }}
                />

                {/* Border glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: `0 0 20px ${skill.color}40, inset 0 0 1px ${skill.color}80`,
                    borderColor: skill.color,
                  }}
                />

                {/* Floating icon - diagonal drift animation */}
                <motion.div
                  className="relative z-10"
                  style={{ color: skill.color }}
                  animate={{
                    x: [0, index % 2 === 0 ? 6 : -6, 0],
                    y: [0, index % 2 === 0 ? -6 : 6, 0],
                  }}
                  whileHover={{
                    scale: 1.15,
                    x: index % 2 === 0 ? 10 : -10,
                    y: index % 2 === 0 ? -10 : 10,
                  }}
                  transition={{
                    duration: 3 + (index % 3),
                    repeat: Infinity,
                    ease: "easeInOut" as const,
                  }}
                >
                  {skill.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={skill.logo} alt={skill.name} className="w-10 h-10 object-contain" loading="lazy" />
                  ) : (
                    <span className="w-10 h-10 flex items-center justify-center text-2xl font-black">
                      {skill.name.charAt(0)}
                    </span>
                  )}
                </motion.div>

                {/* Name */}
                <span 
                    className="relative z-10 font-bold transition-colors duration-300 text-zinc-700 dark:text-zinc-200 group-hover:text-[var(--skill-color)]"
                    style={{ 
                        // @ts-expect-error custom property
                        "--skill-color": skill.color 
                    }}
                >
                  {skill.name}
                </span>

                {/* Category badge */}
                <span className="relative z-10 text-xs px-2.5 py-0.5 rounded-full font-medium border border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800/50 transition-all duration-300">
                  {skill.category}
                </span>
              </div>
            </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

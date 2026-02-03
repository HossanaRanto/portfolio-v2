"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Experience } from "@/domain/entities/Experience";
import { BlurText } from "../ui/blur-text";
import { DecryptedText } from "../ui/decrypted-text";

export const ExperienceTimeline = ({ experiences }: { experiences: Experience[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref, experiences]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  if (experiences.length === 0) return null;

  return (
    <section id="experiences" className="w-full bg-white dark:bg-zinc-950 font-sans md:px-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8">
         <div className="space-y-4 mb-16">
            <span className="text-indigo-600 font-semibold tracking-wider text-sm uppercase">
                <DecryptedText text="Professional Journey" animateOn="view" speed={80} />
            </span>
            <div className="overflow-visible">
                 <BlurText 
                    text="Work Experience" 
                    className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-100"
                    animateBy="words"
                    direction="bottom" 
                />
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-lg text-lg">
                A timeline of my professional career and the roles I have held.
            </p>
        </div>

        <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
          {experiences.map((item, index) => (
            <div
              key={item.id}
              className="flex justify-start md:justify-center pt-10 md:pt-40 md:gap-10"
            >
              {/* DESKTOP - LEFT COLUMN */}
              <div className="hidden md:flex flex-col w-[45%] sticky top-40 self-start">
                 {index % 2 === 0 ? (
                    // EVEN: DATE ON LEFT
                    <div className="text-right pr-10">
                        <motion.div
                             initial={{ opacity: 0, x: -50 }}
                             whileInView={{ opacity: 1, x: 0 }}
                             viewport={{ once: true }}
                             transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="text-5xl font-bold text-neutral-500 dark:text-neutral-500">
                                {new Date(item.startDate).getFullYear()}
                            </div>
                            <div className="mt-1">
                                <DecryptedText 
                                    text={`${formatDate(item.startDate)} - ${item.endDate ? formatDate(item.endDate) : 'Present'}`}
                                    className="text-sm text-neutral-400"
                                    animateOn="view"
                                />
                            </div>
                        </motion.div>
                    </div>
                 ) : (
                    // ODD: CONTENT ON LEFT
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-right pr-10"
                    >
                         <h3 className="text-2xl mb-2 font-bold text-zinc-800 dark:text-zinc-200">
                            <div>{item.role}</div>
                            <div className="text-indigo-600">@ {item.company}</div>
                        </h3>
                         <div className="flex flex-wrap gap-2 mb-4 justify-end">
                            {item.technologies?.map(tech => (
                                <span key={tech} className="px-3 py-1 bg-white dark:bg-zinc-900/50 rounded-full text-sm font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shadow-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <ul className="list-none space-y-2 text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
                            {item.description.map((desc, i) => (
                                <li key={i}>{desc}</li>
                            ))}
                        </ul>
                    </motion.div>
                 )}
              </div>

              {/* CENTER DOT - DESKTOP */}
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-40 mt-2 z-40 items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                      <div className="h-4 w-4 rounded-full bg-indigo-500 border border-indigo-400 p-2 shadow-[0_0_15px_rgba(99,102,241,1)]" />
                  </div>
              </div>

               {/* MOBILE DOT */}
               <div className="md:hidden absolute left-3 top-10 mt-1 z-40 items-center justify-center">
                  <div className="h-10 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,0.1)]">
                      <div className="h-4 w-4 rounded-full bg-indigo-500 border border-indigo-400 p-2 shadow-[0_0_15px_rgba(99,102,241,1)]" />
                  </div>
              </div>


              {/* DESKTOP - RIGHT COLUMN */}
               <div className="hidden md:flex flex-col w-[45%] sticky top-40 self-start">
                 {index % 2 !== 0 ? (
                    // ODD: DATE ON RIGHT
                    <div className="text-left pl-10">
                         <motion.div
                             initial={{ opacity: 0, x: 50 }}
                             whileInView={{ opacity: 1, x: 0 }}
                             viewport={{ once: true }}
                             transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="text-5xl font-bold text-neutral-500 dark:text-neutral-500">
                                {new Date(item.startDate).getFullYear()}
                            </div>
                            <div className="mt-1">
                                <DecryptedText 
                                    text={`${formatDate(item.startDate)} - ${item.endDate ? formatDate(item.endDate) : 'Present'}`}
                                    className="text-sm text-neutral-400"
                                    animateOn="view"
                                />
                            </div>
                        </motion.div>
                    </div>
                 ) : (
                    // EVEN: CONTENT ON RIGHT
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-left pl-10"
                    >
                         <h3 className="text-2xl mb-2 font-bold text-zinc-800 dark:text-zinc-200">
                            <div>{item.role}</div>
                            <div className="text-indigo-600">@ {item.company}</div>
                        </h3>
                         <div className="flex flex-wrap gap-2 mb-4 justify-start">
                            {item.technologies?.map(tech => (
                                <span key={tech} className="px-3 py-1 bg-white dark:bg-zinc-900/50 rounded-full text-sm font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shadow-sm">
                                    {tech}
                                </span>
                            ))}
                        </div>
                        <ul className="list-disc list-outside ml-5 space-y-2 text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
                            {item.description.map((desc, i) => (
                                <li key={i}>{desc}</li>
                            ))}
                        </ul>
                    </motion.div>
                 )}
              </div>

               {/* MOBILE CONTENT */}
              <div className="relative pl-20 pr-4 w-full md:hidden">
                <div className="mb-4 text-left">
                    <div className="text-2xl font-bold text-neutral-500 dark:text-neutral-500">
                        {new Date(item.startDate).getFullYear()}
                    </div>
                     <div className="text-sm text-neutral-400">
                        {formatDate(item.startDate)} - {item.endDate ? formatDate(item.endDate) : 'Present'}
                     </div>
                </div>
                
                <h3 className="text-2xl mb-4 text-left font-bold text-zinc-800 dark:text-zinc-200">
                  <div>{item.role}</div>
                  <div className="text-indigo-600">@ {item.company}</div>
                </h3>

                <div className="mb-8">
                     <div className="flex flex-wrap gap-2 mb-4">
                        {item.technologies?.map(tech => (
                            <span key={tech} className="px-3 py-1 bg-white dark:bg-zinc-900/50 rounded-full text-sm font-medium text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 shadow-sm">
                                {tech}
                            </span>
                        ))}
                    </div>
                    <ul className="list-disc list-outside space-y-2 ml-4 text-neutral-600 dark:text-neutral-400 text-sm md:text-base">
                        {item.description.map((desc, i) => (
                            <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.5 }}
                            >
                                {desc}
                            </motion.li>
                        ))}
                    </ul>
                </div>
              </div>
            </div>
          ))}
          <div
            style={{
              height: height + "px",
            }}
            className="absolute md:left-1/2 left-8 top-0 w-[2px] transform md:-translate-x-1/2 overflow-visible"
          >
            {/* Base line with mask */}
            <div 
                className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]" 
            />
            
            {/* Active glowing line */}
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute left-0 top-0 w-full bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full shadow-[0_0_20px_2px_rgba(168,85,247,0.8)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

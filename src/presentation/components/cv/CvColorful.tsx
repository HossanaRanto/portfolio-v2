import { ExternalLink, Github, Globe, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { CvData, CvTheme, contactItems, displayUrl, formatPeriod } from "./cv-config";
import { PrintPageSpacing } from "./PrintPageSpacing";
import { toPlainText } from "@/lib/rich-text";

const CONTACT_ICONS = { location: MapPin, email: Mail, phone: Phone, website: Globe, linkedin: Linkedin, github: Github };

function MainHeading({ children, theme }: { children: React.ReactNode; theme: CvTheme }) {
    return (
        <h2 className="flex items-center gap-3 text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{ color: theme.primary }}>
            {children}
            <span className="flex-1 h-px" style={{ backgroundColor: `${theme.primary}40` }} />
        </h2>
    );
}

function SideHeading({ children }: { children: React.ReactNode }) {
    return <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/70 mb-3">{children}</h2>;
}

export function CvColorful({ data, theme }: { data: CvData; theme: CvTheme }) {
    const { profile, labels, experiences, skills, projects } = data;
    const contacts = contactItems(profile);

    return (
        <article className="cv-sheet cv-colorful relative grid grid-cols-1 md:grid-cols-[34%_1fr] print:grid-cols-[34%_1fr] bg-white text-zinc-800 shadow-2xl print:shadow-none rounded-xl print:rounded-none overflow-hidden print:overflow-visible min-h-[297mm] print:min-h-0">
            {/* Print-only sidebar background: fixed elements repeat on every printed page */}
            <div
                aria-hidden
                className="cv-sidebar-print-bg hidden print:block fixed left-0 w-[34%]"
                style={{ background: `linear-gradient(180deg, ${theme.primary}, ${theme.dark})` }}
            />

            {/* Sidebar */}
            <aside className="relative p-8 print:pt-[12mm] space-y-8 text-white print:!bg-none" style={{ background: `linear-gradient(180deg, ${theme.primary}, ${theme.dark})` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={data.photoUrl}
                    alt={profile.fullName}
                    className="w-36 h-36 mx-auto rounded-full object-cover border-4 border-white/30 shadow-lg"
                />

                {contacts.length > 0 && (
                    <section>
                        <SideHeading>{labels.contact}</SideHeading>
                        <ul className="space-y-2 text-sm">
                            {contacts.map(c => {
                                const Icon = CONTACT_ICONS[c.key as keyof typeof CONTACT_ICONS];
                                return (
                                    <li key={c.key} className="flex items-start gap-2 break-all">
                                        <Icon size={14} className="mt-0.5 shrink-0 text-white/70" />
                                        {c.href ? <a href={c.href} className="hover:underline">{c.text}</a> : <span>{c.text}</span>}
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                )}

                {skills.length > 0 && (
                    <section>
                        <SideHeading>{labels.skills}</SideHeading>
                        <ul className="grid grid-cols-2 gap-2">
                            {skills.map(skill => (
                                <li key={skill.id} className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white/10 text-xs font-medium">
                                    {skill.logo && (
                                        <span className="w-5 h-5 shrink-0 rounded bg-white p-0.5 flex items-center justify-center">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={skill.logo} alt="" className="w-full h-full object-contain" />
                                        </span>
                                    )}
                                    <span className="truncate">{skill.name}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {profile.spokenLanguages.length > 0 && (
                    <section>
                        <SideHeading>{labels.languages}</SideHeading>
                        <ul className="space-y-1.5 text-sm">
                            {profile.spokenLanguages.map(l => (
                                <li key={l.name}>
                                    <div className="flex justify-between gap-2">
                                        <span className="font-medium">{l.name}</span>
                                        <span className="text-white/70">{l.level}</span>
                                    </div>
                                    {l.certificate && (
                                        <p className="text-xs text-white/70">{l.certificate}</p>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {profile.softSkills.length > 0 && (
                    <section>
                        <SideHeading>{labels.softSkills}</SideHeading>
                        <ul className="space-y-1 text-sm">
                            {profile.softSkills.map(s => (
                                <li key={s} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 shrink-0" />
                                    {s}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {profile.interests.length > 0 && (
                    <section>
                        <SideHeading>{labels.interests}</SideHeading>
                        <div className="flex flex-wrap gap-1.5">
                            {profile.interests.map(i => (
                                <span key={i} className="px-2.5 py-1 rounded-full bg-white/15 text-xs">{i}</span>
                            ))}
                        </div>
                    </section>
                )}
            </aside>

            {/* Main */}
            <div className="p-8 md:p-10 print:py-0">
                <PrintPageSpacing>
                <div className="space-y-8">
                    <header>
                        <h1 className="text-4xl font-black tracking-tight" style={{ color: theme.dark }}>{profile.fullName}</h1>
                        {profile.headline && (
                            <p className="mt-1 text-lg font-semibold" style={{ color: theme.primary }}>{profile.headline}</p>
                        )}
                    </header>

                    {profile.summary && (
                        <section>
                            <MainHeading theme={theme}>{labels.profile}</MainHeading>
                            <p className="text-sm leading-relaxed text-zinc-600">{profile.summary}</p>
                        </section>
                    )}

                    {experiences.length > 0 && (
                        <section>
                            <MainHeading theme={theme}>{labels.experience}</MainHeading>
                            <div className="space-y-5">
                                {experiences.map(exp => (
                                    <div key={exp.id} className="relative pl-5 break-inside-avoid">
                                        <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
                                        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                                            <h3 className="font-bold text-zinc-900">{exp.role}</h3>
                                            <span className="text-xs font-medium text-zinc-500">{formatPeriod(exp.startDate, exp.endDate, data)}</span>
                                        </div>
                                        <p className="text-sm font-medium" style={{ color: theme.primary }}>
                                            {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                                        </p>
                                        {exp.description.length > 0 && (
                                            <ul className="mt-2 space-y-1 text-sm text-zinc-600 list-disc pl-4">
                                                {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                                            </ul>
                                        )}
                                        {exp.technologies && exp.technologies.length > 0 && (
                                            <div className="mt-2 flex flex-wrap gap-1">
                                                {exp.technologies.map(t => (
                                                    <span key={t} className="px-2 py-0.5 rounded text-[11px] font-medium" style={{ backgroundColor: theme.soft, color: theme.dark }}>{t}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {profile.education.length > 0 && (
                        <section>
                            <MainHeading theme={theme}>{labels.education}</MainHeading>
                            <div className="space-y-4">
                                {profile.education.map((ed, i) => (
                                    <div key={i} className="break-inside-avoid">
                                        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                                            <h3 className="font-bold text-zinc-900">{ed.degree}</h3>
                                            {(ed.start || ed.end) && (
                                                <span className="text-xs font-medium text-zinc-500">{[ed.start, ed.end].filter(Boolean).join(' – ')}</span>
                                            )}
                                        </div>
                                        <p className="text-sm font-medium" style={{ color: theme.primary }}>{ed.school}</p>
                                        {ed.description && <p className="mt-1 text-sm text-zinc-600">{ed.description}</p>}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects.length > 0 && (
                        <section>
                            <MainHeading theme={theme}>{labels.projects}</MainHeading>
                            <div className="space-y-4">
                                {projects.map(p => (
                                    <div key={p.id} className="relative pl-5 break-inside-avoid">
                                        <span className="absolute left-0 top-1.5 w-2 h-2 rounded-full" style={{ backgroundColor: theme.primary }} />
                                        <h3 className="font-bold text-zinc-900">{p.title}</h3>
                                        <p className="mt-1 text-sm text-zinc-600 line-clamp-3">{toPlainText(p.description)}</p>
                                        {(p.demoUrl || p.repoUrl) && (
                                            <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium" style={{ color: theme.primary }}>
                                                {p.demoUrl && (
                                                    <a href={p.demoUrl} className="inline-flex items-center gap-1 hover:underline break-all">
                                                        <ExternalLink size={12} className="shrink-0" />
                                                        {labels.demo}: {displayUrl(p.demoUrl)}
                                                    </a>
                                                )}
                                                {p.repoUrl && (
                                                    <a href={p.repoUrl} className="inline-flex items-center gap-1 hover:underline break-all">
                                                        <Github size={12} className="shrink-0" />
                                                        {labels.code}: {displayUrl(p.repoUrl)}
                                                    </a>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}
                </div>
                </PrintPageSpacing>
            </div>
        </article>
    );
}

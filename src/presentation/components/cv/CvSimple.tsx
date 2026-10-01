import { CvData, contactItems, displayUrl, formatPeriod } from "./cv-config";
import { PrintPageSpacing } from "./PrintPageSpacing";
import { toPlainText } from "@/lib/rich-text";

function Heading({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="mt-8 mb-3 pb-1 border-b border-zinc-900 text-sm font-bold uppercase tracking-widest">
            {children}
        </h2>
    );
}

function truncate(text: string, max: number) {
    return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

/** Plain, ATS-friendly text CV: no colors, no images. */
export function CvSimple({ data }: { data: CvData }) {
    const { profile, labels, experiences, skills, projects } = data;
    const contacts = contactItems(profile);
    const skillsByCategory = skills.reduce<Record<string, string[]>>((acc, s) => {
        (acc[s.category] ||= []).push(s.name);
        return acc;
    }, {});

    return (
        <article className="cv-sheet bg-white text-zinc-900 font-mono text-[13px] leading-relaxed p-10 md:p-14 print:px-[15mm] print:py-0 shadow-2xl print:shadow-none rounded-xl print:rounded-none min-h-[297mm] print:min-h-0">
            <PrintPageSpacing>
                <header>
                    <h1 className="text-2xl font-bold uppercase tracking-wide">{profile.fullName}</h1>
                    {profile.headline && <p className="mt-1">{profile.headline}</p>}
                    {contacts.length > 0 && (
                        <p className="mt-2 text-zinc-600">
                            {contacts.map((c, i) => (
                                <span key={c.key}>
                                    {i > 0 && ' | '}
                                    {c.href ? <a href={c.href} className="hover:underline">{c.text}</a> : c.text}
                                </span>
                            ))}
                        </p>
                    )}
                </header>

                {profile.summary && (
                    <section>
                        <Heading>{labels.profile}</Heading>
                        <p>{profile.summary}</p>
                    </section>
                )}

                {experiences.length > 0 && (
                    <section>
                        <Heading>{labels.experience}</Heading>
                        <div className="space-y-5">
                            {experiences.map(exp => (
                                <div key={exp.id} className="break-inside-avoid">
                                    <p className="font-bold">{exp.role} — {exp.company}</p>
                                    <p className="text-zinc-600">
                                        {formatPeriod(exp.startDate, exp.endDate, data)}{exp.location ? ` | ${exp.location}` : ''}
                                    </p>
                                    {exp.description.length > 0 && (
                                        <ul className="mt-1">
                                            {exp.description.map((d, i) => <li key={i}>- {d}</li>)}
                                        </ul>
                                    )}
                                    {exp.technologies && exp.technologies.length > 0 && (
                                        <p className="mt-1 text-zinc-600">Stack: {exp.technologies.join(', ')}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {profile.education.length > 0 && (
                    <section>
                        <Heading>{labels.education}</Heading>
                        <div className="space-y-3">
                            {profile.education.map((ed, i) => (
                                <div key={i} className="break-inside-avoid">
                                    <p className="font-bold">{ed.degree}</p>
                                    <p className="text-zinc-600">
                                        {ed.school}{(ed.start || ed.end) ? ` | ${[ed.start, ed.end].filter(Boolean).join(' – ')}` : ''}
                                    </p>
                                    {ed.description && <p>{ed.description}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {skills.length > 0 && (
                    <section>
                        <Heading>{labels.skills}</Heading>
                        <ul>
                            {Object.entries(skillsByCategory).map(([category, names]) => (
                                <li key={category}><span className="font-bold">{category}:</span> {names.join(', ')}</li>
                            ))}
                        </ul>
                    </section>
                )}

                {projects.length > 0 && (
                    <section>
                        <Heading>{labels.projects}</Heading>
                        <div className="space-y-3">
                            {projects.map(p => (
                                <div key={p.id} className="break-inside-avoid">
                                    <p className="font-bold">{p.title}</p>
                                    <p>{truncate(toPlainText(p.description), 220)}</p>
                                    {p.demoUrl && (
                                        <p className="text-zinc-600">{labels.demo}: <a href={p.demoUrl} className="hover:underline break-all">{displayUrl(p.demoUrl)}</a></p>
                                    )}
                                    {p.repoUrl && (
                                        <p className="text-zinc-600">{labels.code}: <a href={p.repoUrl} className="hover:underline break-all">{displayUrl(p.repoUrl)}</a></p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {profile.spokenLanguages.length > 0 && (
                    <section>
                        <Heading>{labels.languages}</Heading>
                        <ul>
                            {profile.spokenLanguages.map(l => (
                                <li key={l.name}>
                                    {l.level ? `${l.name} (${l.level})` : l.name}{l.certificate ? ` — ${l.certificate}` : ''}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {profile.softSkills.length > 0 && (
                    <section>
                        <Heading>{labels.softSkills}</Heading>
                        <p>{profile.softSkills.join(', ')}</p>
                    </section>
                )}

                {profile.interests.length > 0 && (
                    <section>
                        <Heading>{labels.interests}</Heading>
                        <p>{profile.interests.join(', ')}</p>
                    </section>
                )}
            </PrintPageSpacing>
        </article>
    );
}

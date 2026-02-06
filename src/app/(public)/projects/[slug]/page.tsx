import { getProjectBySlugAction, getProjectsAction } from "@/application/use-cases/project.actions";
import { ProjectDetails } from "@/presentation/components/domain/ProjectDetails";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import Link from "next/link";

// Generate static params for all projects
export async function generateStaticParams() {
    const projects = await getProjectsAction();
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const project = await getProjectBySlugAction(slug);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    return {
        title: `${project.title} | Ranto Mahefaniaina`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: project.coverImage ? [project.coverImage] : [],
            type: 'article', // or 'website'
        },
        twitter: {
            card: 'summary_large_image',
            title: project.title,
            description: project.description,
            images: project.coverImage ? [project.coverImage] : [],
        },
        alternates: {
            canonical: `/projects/${project.slug}`,
        }
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await getProjectBySlugAction(slug);

    if (!project) {
        notFound();
    }

    // JSON-LD Structured Data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: project.title,
        description: project.description,
        image: project.coverImage,
        applicationCategory: 'Web Application',
        operatingSystem: 'Any',
        author: {
            '@type': 'Person',
            name: 'Ranto Mahefaniaina',
            url: 'https://www.rantomahefaniaina.dev'
        },
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 py-20">
             <div className="container mx-auto px-4">
                 <div className="mb-8">
                     <Link href="/" className="text-zinc-400 hover:text-white transition-colors">
                        &larr; Back to Home
                     </Link>
                 </div>
                 {/* Reusing the ProjectDetails component which is styled for dark mode */}
                 <ProjectDetails project={project} />
            </div>

            <Script
                id="project-jsonld"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        </div>
    );
}

import { MetadataRoute } from 'next'
import { getProjectsAction } from '@/application/use-cases/project.actions'
import { getExperiencesAction } from '@/application/use-cases/experience.actions'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://www.rantomahefaniaina.dev'

  // Static routes
  const routes = [
    '',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic Projects
  // We fetch 'en' by default, or maybe all if we could. 
  // Assuming 'en' and 'fr' content is similar or just translated text on same slug.
  const projects = await getProjectsAction()
  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Dynamic Experiences
  const experiences = await getExperiencesAction()
  const experienceUrls = experiences.map((experience) => ({
    url: `${baseUrl}/experiences/${experience.id}`,
    lastModified: new Date(experience.createdAt), // Experience might not have updatedAt
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...routes, ...projectUrls, ...experienceUrls]
}

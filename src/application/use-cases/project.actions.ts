'use server'

import { SupabaseProjectRepository } from "@/infrastructure/repositories/SupabaseProjectRepository"
import { Project } from "@/domain/entities/Project"
import { revalidatePath } from "next/cache"
import { sanitizeRichText } from "@/infrastructure/services/RichTextSanitizer"

const projectRepo = new SupabaseProjectRepository()

export async function getProjectsAction(lang?: string): Promise<Project[]> {
    return await projectRepo.getAll(lang)
}

export async function getFeaturedProjectsAction(lang?: string): Promise<Project[]> {
    return await projectRepo.getFeatured(lang)
}

export async function getProjectBySlugAction(slug: string): Promise<Project | null> {
    return await projectRepo.getBySlug(slug)
}

export async function createProjectAction(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
    const project = await projectRepo.create({ ...data, description: sanitizeRichText(data.description) })
    revalidatePath('/projects')
    revalidatePath('/')
    revalidatePath('/admin/projects')
    return project
}

export async function updateProjectAction(id: string, data: Partial<Project>) {
    const project = await projectRepo.update(id, {
        ...data,
        ...(data.description !== undefined && { description: sanitizeRichText(data.description) }),
    })
    revalidatePath('/projects')
    revalidatePath('/')
    revalidatePath('/admin/projects')
    return project
}

export async function deleteProjectAction(id: string) {
    await projectRepo.delete(id)
    revalidatePath('/projects')
    revalidatePath('/')
    revalidatePath('/admin/projects')
}

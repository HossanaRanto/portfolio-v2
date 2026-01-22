'use server'

import { SupabaseProjectRepository } from "@/infrastructure/repositories/SupabaseProjectRepository"
import { Project } from "@/domain/entities/Project"
import { revalidatePath } from "next/cache"

const projectRepo = new SupabaseProjectRepository()

export async function getProjectsAction(): Promise<Project[]> {
    return await projectRepo.getAll()
}

export async function getFeaturedProjectsAction(): Promise<Project[]> {
    return await projectRepo.getFeatured()
}

export async function getProjectBySlugAction(slug: string): Promise<Project | null> {
    return await projectRepo.getBySlug(slug)
}

export async function createProjectAction(data: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) {
    const project = await projectRepo.create(data)
    revalidatePath('/projects')
    revalidatePath('/')
    revalidatePath('/admin/projects')
    return project
}

export async function updateProjectAction(id: string, data: Partial<Project>) {
    const project = await projectRepo.update(id, data)
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

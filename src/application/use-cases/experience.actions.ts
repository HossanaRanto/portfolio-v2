'use server'

import { SupabaseExperienceRepository } from "@/infrastructure/repositories/SupabaseExperienceRepository"
import { Experience } from "@/domain/entities/Experience"
import { revalidatePath } from "next/cache"

const experienceRepo = new SupabaseExperienceRepository()

export async function getExperiencesAction(lang?: string): Promise<Experience[]> {
    return await experienceRepo.getAll(lang)
}

export async function getExperienceByIdAction(id: string): Promise<Experience | null> {
    return await experienceRepo.getById(id)
}

export async function createExperienceAction(data: Omit<Experience, 'id' | 'createdAt'>) {
    const experience = await experienceRepo.create(data)
    revalidatePath('/about')
    revalidatePath('/admin/experiences')
    return experience
}

export async function updateExperienceAction(id: string, data: Partial<Experience>) {
    const experience = await experienceRepo.update(id, data)
    revalidatePath('/about')
    revalidatePath('/admin/experiences')
    return experience
}

export async function deleteExperienceAction(id: string) {
    await experienceRepo.delete(id)
    revalidatePath('/about')
    revalidatePath('/admin/experiences')
}

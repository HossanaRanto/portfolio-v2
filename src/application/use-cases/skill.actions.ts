'use server'

import { SupabaseSkillRepository } from "@/infrastructure/repositories/SupabaseSkillRepository"
import { Skill } from "@/domain/entities/Skill"
import { revalidatePath } from "next/cache"

const skillRepo = new SupabaseSkillRepository()

function revalidate() {
    revalidatePath('/')
    revalidatePath('/cv')
    revalidatePath('/admin/skills')
}

export async function getSkillsAction(): Promise<Skill[]> {
    return await skillRepo.getAll()
}

export async function getSkillByIdAction(id: string): Promise<Skill | null> {
    return await skillRepo.getById(id)
}

export async function createSkillAction(data: Omit<Skill, 'id' | 'createdAt' | 'updatedAt'>) {
    const skill = await skillRepo.create(data)
    revalidate()
    return skill
}

export async function updateSkillAction(id: string, data: Partial<Skill>) {
    const skill = await skillRepo.update(id, data)
    revalidate()
    return skill
}

export async function deleteSkillAction(id: string) {
    await skillRepo.delete(id)
    revalidate()
}

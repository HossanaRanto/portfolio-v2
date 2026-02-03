'use server'

import { SupabaseServiceRepository } from "@/infrastructure/repositories/SupabaseServiceRepository"
import { Service } from "@/domain/entities/Service"
import { revalidatePath } from "next/cache"

const serviceRepo = new SupabaseServiceRepository()

export async function getServicesAction(lang?: string): Promise<Service[]> {
    return await serviceRepo.getAll(lang)
}

export async function getServiceByIdAction(id: string): Promise<Service | null> {
    return await serviceRepo.getById(id)
}

export async function createServiceAction(data: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>) {
    const service = await serviceRepo.create(data)
    revalidatePath('/')
    revalidatePath('/admin/services')
    return service
}

export async function updateServiceAction(id: string, data: Partial<Service>) {
    const service = await serviceRepo.update(id, data)
    revalidatePath('/')
    revalidatePath('/admin/services')
    return service
}

export async function deleteServiceAction(id: string) {
    await serviceRepo.delete(id)
    revalidatePath('/')
    revalidatePath('/admin/services')
}

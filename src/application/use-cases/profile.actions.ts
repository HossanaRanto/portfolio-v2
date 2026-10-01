'use server'

import { SupabaseProfileRepository } from "@/infrastructure/repositories/SupabaseProfileRepository"
import { Profile } from "@/domain/entities/Profile"
import { revalidatePath } from "next/cache"

const profileRepo = new SupabaseProfileRepository()

const DEFAULT_PHOTO_URL = '/img/profile.jpeg'

export async function getProfileAction(lang: string): Promise<Profile | null> {
    return (await profileRepo.getByLanguage(lang)) ?? (await profileRepo.getByLanguage('en'))
}

export async function getProfileForEditAction(lang: string): Promise<Profile | null> {
    return await profileRepo.getByLanguage(lang)
}

export async function getProfilePhotoAction(): Promise<string> {
    return (await profileRepo.getPhotoUrl()) || DEFAULT_PHOTO_URL
}

export async function saveProfileAction(data: Omit<Profile, 'updatedAt'>) {
    const profile = await profileRepo.upsert(data)
    revalidatePath('/cv')
    revalidatePath('/admin/profile')
    return profile
}

export async function setProfilePhotoAction(url: string) {
    await profileRepo.setPhotoUrl(url)
    revalidatePath('/about')
    revalidatePath('/cv')
    revalidatePath('/admin/profile')
}

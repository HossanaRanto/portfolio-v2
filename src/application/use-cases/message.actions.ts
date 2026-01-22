'use server'

import { SupabaseMessageRepository } from "@/infrastructure/repositories/SupabaseMessageRepository"
import { Message } from "@/domain/entities/Message"
import { revalidatePath } from "next/cache"

const messageRepo = new SupabaseMessageRepository()

export async function createMessageAction(data: Omit<Message, 'id' | 'createdAt' | 'read'>) {
    const message = await messageRepo.create(data)
    revalidatePath('/admin/messages')
    return message
}

export async function getMessagesAction(): Promise<Message[]> {
    const messages = await messageRepo.getAll()
    return messages
}

export async function markMessageReadAction(id: string) {
    await messageRepo.markAsRead(id)
    revalidatePath('/admin/messages')
}

export async function deleteMessageAction(id: string) {
    await messageRepo.delete(id)
    revalidatePath('/admin/messages')
}

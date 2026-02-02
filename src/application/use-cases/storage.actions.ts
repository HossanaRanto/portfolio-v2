'use server'

import { createAdminClient } from "@/infrastructure/supabase/server";

export async function uploadImageAction(formData: FormData): Promise<string> {
    const file = formData.get('file') as File;
    const bucket = 'projects'; // Fixed bucket for now, or could make dynamic

    if (!file) throw new Error("No file provided");

    const supabase = await createAdminClient();
    
    const filename = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error } = await supabase.storage
        .from(bucket)
        .upload(filename, buffer, {
            contentType: file.type,
            upsert: false
        });

    if (error) {
        console.error("Storage upload error:", error);
        throw new Error(`Upload failed: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(filename);
    return publicUrl;
}

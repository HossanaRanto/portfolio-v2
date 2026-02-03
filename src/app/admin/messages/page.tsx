import { getMessagesAction } from "@/application/use-cases/message.actions";
import { MessageCard } from "@/presentation/components/admin/MessageCard";

export default async function AdminMessagesPage() {
    const messages = await getMessagesAction();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">Messages</h1>
                    <p className="text-zinc-500 dark:text-zinc-400 mt-1">Manage and respond to your inquiries</p>
                </div>
                <div className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-sm font-medium text-zinc-600 dark:text-zinc-400">
                    Total: {messages.length}
                </div>
            </div>
            
            <div className="space-y-4">
                 {messages.length === 0 ? (
                    <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-2xl border border-zinc-200 dark:border-zinc-800 border-dashed">
                        <p className="text-zinc-500">No messages found</p>
                    </div>
                 ) : messages.map(msg => (
                    <MessageCard key={msg.id} message={msg} />
                ))}
            </div>
        </div>
    )
}

import { getMessagesAction, markMessageReadAction, deleteMessageAction } from "@/application/use-cases/message.actions";
import { Trash, CheckCircle } from "lucide-react";

export default async function AdminMessagesPage() {
    const messages = await getMessagesAction();

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Messages</h1>
            <div className="space-y-4">
                 {messages.length === 0 ? (
                    <p className="text-zinc-500">No messages yet.</p>
                 ) : messages.map(msg => (
                    <div key={msg.id} className={`p-4 rounded-lg border ${msg.read ? 'bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800' : 'bg-blue-50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-800'}`}>
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-bold text-lg">{msg.subject || 'No Subject'}</h3>
                                <div className="text-sm text-zinc-500 mb-2">From: {msg.name} ({msg.email})</div>
                                <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap">{msg.content}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                {!msg.read && (
                                    <form action={async () => {
                                        "use server"
                                        await markMessageReadAction(msg.id)
                                    }}>
                                        <button className="p-2 text-green-600 hover:bg-green-100 rounded" title="Mark as Read">
                                            <CheckCircle size={20} />
                                        </button>
                                    </form>
                                )}
                                <form action={async () => {
                                    "use server"
                                    await deleteMessageAction(msg.id)
                                }}>
                                    <button className="p-2 text-red-600 hover:bg-red-100 rounded" title="Delete">
                                        <Trash size={20} />
                                    </button>
                                </form>
                            </div>
                        </div>
                         <div className="text-xs text-zinc-400 mt-2">
                            {new Date(msg.createdAt).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

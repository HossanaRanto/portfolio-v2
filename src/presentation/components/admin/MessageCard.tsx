"use client"
import { useState } from "react"
import { Message } from "@/domain/entities/Message"
import { markMessageReadAction, deleteMessageAction } from "@/application/use-cases/message.actions"
import { Trash, CheckCircle, Reply, Loader2, Send, Mail } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/presentation/components/ui/dialog"
import { EmailJSService } from "@/infrastructure/services/EmailJSService";

interface MessageCardProps {
    message: Message
}

export function MessageCard({ message }: MessageCardProps) {
    const [isReplyOpen, setIsReplyOpen] = useState(false)
    const [replyContent, setReplyContent] = useState("")
    const [sending, setSending] = useState(false)

    async function handleReply() {
        if (!replyContent.trim()) return;
        setSending(true);
        
        try {
            const emailService = new EmailJSService();
            await emailService.sendReply(
                `Re: ${message.subject || 'No Subject'}`,
                message.email,
                replyContent,
                message.content);
            
            // Mark as read on server after successful email
            await markMessageReadAction(message.id);

            setIsReplyOpen(false)
            setReplyContent("")
            alert("Reply sent successfully!")
        } catch (error) {
            console.error("EmailJS Error:", error);
            alert("Failed to send reply. Please check your EmailJS configuration.");
        } finally {
            setSending(false)
        }
    }

    return (
        <div className={`p-6 rounded-xl border transition-all ${
            message.read 
            ? 'bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800' 
            : 'bg-indigo-50/50 border-indigo-100 dark:bg-indigo-950/10 dark:border-indigo-900/50 shadow-sm'
        }`}>
            <div className="flex justify-between items-start gap-4">
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                        {!message.read && (
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        )}
                        <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">
                            {message.subject || 'No Subject'}
                        </h3>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">{message.name}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                            <Mail size={12} />
                            {message.email}
                        </span>
                        <span>•</span>
                        <span>{new Date(message.createdAt).toLocaleString()}</span>
                    </div>

                    <p className="text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap mt-4 bg-zinc-50 dark:bg-zinc-950/50 p-4 rounded-lg border border-zinc-100 dark:border-zinc-800/50 text-sm leading-relaxed">
                        {message.content}
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <Dialog open={isReplyOpen} onOpenChange={setIsReplyOpen}>
                        <DialogTrigger asChild>
                            <button className="p-2 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors" title="Reply">
                                <Reply size={20} />
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-xl bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                            <DialogHeader>
                                <DialogTitle>Reply to {message.name}</DialogTitle>
                                <DialogDescription>
                                    Your response will be sent to <strong>{message.email}</strong>
                                </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Response</label>
                                    <textarea 
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        className="w-full h-40 px-4 py-3 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none font-sans"
                                        placeholder="Write your response here..."
                                    />
                                </div>
                            </div>

                            <DialogFooter>
                                <button
                                    onClick={() => setIsReplyOpen(false)}
                                    className="px-4 py-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleReply}
                                    disabled={sending || !replyContent.trim()}
                                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg flex items-center gap-2 disabled:opacity-50"
                                >
                                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                    Send Email
                                </button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    {!message.read && (
                        <button 
                            onClick={async () => await markMessageReadAction(message.id)}
                            className="p-2 text-emerald-600 dark:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors" 
                            title="Mark as Read"
                        >
                            <CheckCircle size={20} />
                        </button>
                    )}
                    
                    <button 
                        onClick={async () => {
                            if(confirm('Delete message?')) await deleteMessageAction(message.id)
                        }}
                        className="p-2 text-rose-600 dark:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors" 
                        title="Delete"
                    >
                        <Trash size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

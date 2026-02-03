export interface IEmailService {
  sendReply(title:string, toEmail: string, replyMessage: string, originalMessage: string): Promise<void>;
}

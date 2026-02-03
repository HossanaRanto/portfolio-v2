import emailjs from '@emailjs/browser';
import { IEmailService } from '@/application/interfaces/IEmailService';

export class EmailJSService implements IEmailService {
  private serviceId: string;
  private templateId: string;
  private publicKey: string;

  constructor() {
    this.serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
    this.templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
    this.publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';
  }

  async sendReply(title:string, toEmail: string, replyMessage: string, originalMessage: string): Promise<void> {
    try {
      await emailjs.send(
        this.serviceId,
        this.templateId,
        {
            title: title,
            to_email: toEmail,
            reply_message: replyMessage,
            original_message: originalMessage,
        },
        this.publicKey
      );
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }
}

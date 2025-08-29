
import nodemailer from 'nodemailer';
import EmailLog from '../models/emailLog.js';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS 
      }
    });
  }

  async sendBroadcast(subject, bodyContent, recipients) {
    const results = [];
    
    for (const recipient of recipients) {
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: recipient,
          subject: subject,
          html: bodyContent
        };

        await this.transporter.sendMail(mailOptions);
        
        const log = await EmailLog.create({
          subject,
          bodyContent,
          recipientEmail: recipient,
          deliveryStatus: 'sent',
          timestamp: new Date()
        });
        
        results.push({ email: recipient, status: 'sent', logId: log._id });
      } catch (error) {
        console.error(`Failed to send email to ${recipient}:`, error);
        
        // Log failed delivery
        const log = await EmailLog.create({
          subject,
          bodyContent,
          recipientEmail: recipient,
          deliveryStatus: 'failed',
          errorMessage: error.message,
          timestamp: new Date()
        });
        
        results.push({ 
          email: recipient, 
          status: 'failed', 
          error: error.message,
          logId: log._id 
        });
      }
    }
    
    return results;
  }

  async testConnection() {
    try {
      await this.transporter.verify();
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}

export default new EmailService();
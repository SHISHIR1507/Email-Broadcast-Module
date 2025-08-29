import nodemailer from 'nodemailer';
import EmailLog from '../models/emailLog.js';

class EmailService {
  constructor() {
    this.transporter = null;
  }

  getTransporter() {
    if (!this.transporter) {
      console.log('Creating transporter with:');
      console.log('EMAIL_USER:', process.env.EMAIL_USER);
      console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set' : 'Not set');
      
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('EMAIL_USER and EMAIL_PASS environment variables are required');
      }
      
      this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS 
        }
      });
    }
    return this.transporter;
  }

  async sendBroadcast(subject, bodyContent, recipients) {
    const transporter = this.getTransporter(); // This will create transporter when needed
    const results = [];
    
    for (const recipient of recipients) {
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: recipient,
          subject: subject,
          html: bodyContent
        };

        await transporter.sendMail(mailOptions);
        
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
      const transporter = this.getTransporter();
      await transporter.verify();
      return true;
    } catch (error) {
      console.error('Email service connection failed:', error);
      return false;
    }
  }
}

export default new EmailService();
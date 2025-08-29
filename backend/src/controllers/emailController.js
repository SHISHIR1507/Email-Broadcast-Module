import emailService from '../services/emailService.js';

export const sendBroadcast = async (req, res) => {
  try {
    const { subject, bodyContent, recipients } = req.body;

    if (!subject || !bodyContent || !recipients || !Array.isArray(recipients)) {
      return res.status(400).json({
        message: 'Subject, body content, and recipients array are required'
      });
    }

    if (recipients.length === 0) {
      return res.status(400).json({
        message: 'At least one recipient is required'
      });
    }

  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const invalidEmails = recipients.filter(email => !emailRegex.test(email));
    
    if (invalidEmails.length > 0) {
      return res.status(400).json({
        message: 'Invalid email addresses found',
        invalidEmails
      });
    }

    const results = await emailService.sendBroadcast(subject, bodyContent, recipients);
    
    const successCount = results.filter(r => r.status === 'sent').length;
    const failureCount = results.filter(r => r.status === 'failed').length;

    res.status(200).json({
      message: 'Broadcast completed',
      summary: {
        total: recipients.length,
        sent: successCount,
        failed: failureCount
      },
      results
    });

  } catch (error) {
    console.error('Broadcast error:', error);
    res.status(500).json({
      message: 'Internal server error',
      error: error.message
    });
  }
};

export const testEmailConnection = async (req, res) => {
  try {
    const isConnected = await emailService.testConnection();
    res.json({ connected: isConnected });
  } catch (error) {
    res.status(500).json({ connected: false, error: error.message });
  }
};
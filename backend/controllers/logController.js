import EmailLog from '../models/emailLog.js';
import { Parser } from 'json2csv';

export const getLogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const search = req.query.search;
    
    const skip = (page - 1) * limit;
    
    const filter = {};
    if (status && ['sent', 'failed'].includes(status)) {
      filter.deliveryStatus = status;
    }
    if (search) {
      filter.$or = [
        { subject: { $regex: search, $options: 'i' } },
        { recipientEmail: { $regex: search, $options: 'i' } }
      ];
    }

    const logs = await EmailLog.find(filter)
      .sort({ timestamp: -1 })
      .skip(skip)
      .limit(limit);

    const total = await EmailLog.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      logs: logs.map(log => ({
        _id: log._id,
        subject: log.subject,
        bodyContent: log.bodyContent.substring(0, 100) + '...', 
        recipientEmail: log.recipientEmail,
        deliveryStatus: log.deliveryStatus,
        errorMessage: log.errorMessage,
        timestamp: log.timestamp
      })),
      pagination: {
        currentPage: page,
        totalPages,
        totalLogs: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get logs error:', error);
    res.status(500).json({
      message: 'Failed to fetch logs',
      error: error.message
    });
  }
};

export const exportLogs = async (req, res) => {
  try {
    const format = req.query.format || 'csv'; // csv or excel
    const status = req.query.status;
    
    const filter = {};
    if (status && ['sent', 'failed'].includes(status)) {
      filter.deliveryStatus = status;
    }

    const logs = await EmailLog.find(filter).sort({ timestamp: -1 });

    if (format === 'csv') {
      const fields = [
        'subject',
        'recipientEmail',
        'deliveryStatus',
        'errorMessage',
        'timestamp'
      ];
      
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(logs);
      
      res.header('Content-Type', 'text/csv');
      res.attachment('email-logs.csv');
      res.send(csv);
    } else {
      // Return JSON for Excel processing on frontend
      res.json({ logs });
    }

  } catch (error) {
    console.error('Export logs error:', error);
    res.status(500).json({
      message: 'Failed to export logs',
      error: error.message
    });
  }
};
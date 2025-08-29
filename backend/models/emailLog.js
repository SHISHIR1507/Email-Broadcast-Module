import mongoose from 'mongoose';

const emailLogSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true
  },
  bodyContent: {
    type: String,
    required: true
  },
  recipientEmail: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  deliveryStatus: {
    type: String,
    required: true,
    enum: ['sent', 'failed'],
    default: 'sent'
  },
  errorMessage: {
    type: String,
    default: null
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});


emailLogSchema.index({ timestamp: -1 });
emailLogSchema.index({ deliveryStatus: 1 });
emailLogSchema.index({ recipientEmail: 1 });

const EmailLog = mongoose.models.EmailLog || mongoose.model('EmailLog', emailLogSchema);

export default EmailLog;
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import EmailEditor from '../Components/EmailEditor.jsx';
import RecipientList from '../Components/RecipientList.jsx';
import { sendBroadcast } from '../services/api';
import { Send, Loader2 } from 'lucide-react';

const BroadcastPage = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [recipients, setRecipients] = useState([]);
  const navigate = useNavigate();

  const broadcastMutation = useMutation({
    mutationFn: sendBroadcast,
    onSuccess: (data) => {
      toast.success(`Email sent successfully! ${data.summary.sent} sent, ${data.summary.failed} failed`);
      // Reset form
      setSubject('');
      setBody('');
      setRecipients([]);
      // Navigate to logs
      setTimeout(() => navigate('/logs'), 1500);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to send emails');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!subject.trim()) {
      toast.error('Subject is required');
      return;
    }
    
    if (!body.trim()) {
      toast.error('Email body is required');
      return;
    }
    
    if (recipients.length === 0) {
      toast.error('At least one recipient is required');
      return;
    }

    broadcastMutation.mutate({ subject, bodyContent: body, recipients });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Email Broadcast</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <EmailEditor
            subject={subject}
            setSubject={setSubject}
            body={body}
            setBody={setBody}
          />
          
          <RecipientList
            recipients={recipients}
            setRecipients={setRecipients}
          />
          
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={broadcastMutation.isPending}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
            >
              {broadcastMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Broadcast
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BroadcastPage;
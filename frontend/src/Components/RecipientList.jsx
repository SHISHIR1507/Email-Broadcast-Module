import React, { useState } from 'react';
import { Plus, X, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

const RecipientList = ({ recipients, setRecipients }) => {
  const [emailInput, setEmailInput] = useState('');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const addRecipient = () => {
    if (!emailInput.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    if (!validateEmail(emailInput)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (recipients.includes(emailInput)) {
      toast.error('This email is already in the list');
      return;
    }

    setRecipients([...recipients, emailInput]);
    setEmailInput('');
    toast.success('Email added successfully');
  };

  const removeRecipient = (email) => {
    setRecipients(recipients.filter(r => r !== email));
    toast.success('Email removed');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addRecipient();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Recipients *
        </label>
        <div className="flex gap-2">
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter email address..."
          />
          <button
            type="button"
            onClick={addRecipient}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add
          </button>
        </div>
      </div>

      {recipients.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="h-4 w-4" />
            <span>{recipients.length} recipient{recipients.length > 1 ? 's' : ''}</span>
          </div>
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-2 border rounded-lg bg-gray-50">
            {recipients.map((email, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                <span>{email}</span>
                <button
                  type="button"
                  onClick={() => removeRecipient(email)}
                  className="hover:bg-blue-200 rounded-full p-1 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipientList;
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, FileText, Send } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-lg border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Mail className="h-8 w-8 text-blue-600" />
            <h1 className="text-xl font-bold text-gray-800">Email Broadcast</h1>
          </div>
          
          <div className="flex space-x-4">
            <Link
              to="/broadcast"
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/broadcast'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Send className="h-4 w-4 mr-2" />
              Send Email
            </Link>
            <Link
              to="/logs"
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                location.pathname === '/logs'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <FileText className="h-4 w-4 mr-2" />
              Delivery Logs
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
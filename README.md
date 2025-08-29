# Email Broadcast Module

A full-stack email broadcasting application that allows users to send emails to multiple recipients and track delivery status with comprehensive logging and analytics.

## Features

### Module 1: Email Broadcast Page
- **Rich Text Email Composition**: HTML email editor using React Quill
- **Multiple Recipients Management**: Add, remove, and validate email addresses
- **Real-time Email Sending**: Send emails to all recipients with progress tracking
- **Delivery Status Tracking**: Automatic logging of sent/failed emails with error details

### Module 2: Delivery Log Page
- **Paginated Email Logs**: Backend-handled pagination with customizable page sizes
- **Advanced Filtering**: Filter logs by delivery status (Sent/Failed)
- **Search Functionality**: Search through email subjects, recipients, and content
- **Export Capabilities**: Download logs as CSV files
- **Real-time Updates**: Live status updates using React Query

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **TanStack React Query** - Server state management and caching
- **React Quill** - Rich text HTML editor
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Hot Toast** - Toast notifications
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **Nodemailer** - Email sending service
- **JSON2CSV** - CSV export functionality
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## Project Structure

```
Email-Broadcast-Module/
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── EmailEditor.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── RecipientList.jsx
│   │   ├── Pages/
│   │   │   ├── BroadcastPage.jsx
│   │   │   └── LogsPage.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── App.css
│   ├── package.json
│   └── vite.config.js
└── backend/
    ├── src/
    │   ├── config/
    │   │   └── database.js
    │   ├── controllers/
    │   │   ├── emailController.js
    │   │   └── logController.js
    │   ├── models/
    │   │   └── emailLog.js
    │   ├── routes/
    │   │   ├── email.js
    │   │   └── logs.js
    │   ├── services/
    │   │   └── emailService.js
    │   └── server.js
    ├── .env
    └── package.json
```

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Gmail account with App Password (for email sending)

### Manual Setup


1. **Clone the repository**
   ```
   git clone https://github.com/SHISHIR1507/Email-Broadcast-Module.git
   cd email-broadcast-module
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Set environment variables**
    Create a .env file in the project root:

   ```env
   PORT=5007
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/emailbroadcast
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-app-password (16 Characters)
   ```

5. **Setup Gmail App Password**
   - Enable 2-Factor Authentication on your Google account
   - Go to Google Account → Security → 2-Step Verification
   - Generate an "App Password" for Mail
   - Use the 16-character password in your .env file

6. **Start the backend server**
   ```bash
   npm run dev
   ```
   Server will start on `http://localhost:5007`


3. **Start the frontend server**
   ```bash
   npm run dev
   ```
   Frontend will start on `http://localhost:3003`

## API Endpoints

### Email Routes (`/api/emails`)
- `POST /api/emails/send` - Send email broadcast
- `GET /api/emails/test-connection` - Test email service connection

### Log Routes (`/api/logs`)
- `GET /api/logs` - Get paginated email logs
- `GET /api/logs/export` - Export logs to CSV


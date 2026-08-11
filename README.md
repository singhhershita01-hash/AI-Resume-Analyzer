# AI Resume Analyzer

An AI-powered web application that analyzes resumes and provides feedback to help job seekers improve their applications. Built as a portfolio project to explore full-stack development with the MERN stack combined with AI-based document processing.

## Tech Stack

**Frontend**
- React (Vite)
- react-dropzone
- Axios

**Backend**
- Node.js + Express
- MongoDB Atlas (Mongoose)
- Multer (file uploads)

**Coming soon**
- pdf-parse (text extraction)
- OCR fallback for scanned resumes
- AI-based resume analysis (Gemini API)

## Project Status

🚧 **In active development** — Week 1 complete

- [x] Backend server setup (Express)
- [x] Frontend setup (React + Vite)
- [x] MongoDB Atlas connection
- [x] PDF upload endpoint (Multer)
- [x] Drag-and-drop upload UI (React Dropzone)
- [ ] PDF text extraction
- [ ] AI-based resume analysis
- [ ] Results dashboard

## Features (so far)

- Drag-and-drop or click-to-upload interface for PDF resumes
- File type validation (PDF only)
- Files stored server-side with unique filenames
- MongoDB Atlas integration for future data persistence

## Getting Started

### Prerequisites
- Node.js (v18+)
- A MongoDB Atlas account (free tier works)

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
```

Run the server:
```bash
npm run dev
```
Server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:
```
VITE_API_BASE_URL=http://localhost:5000
```

Run the app:
```bash
npm run dev
```
App runs on `http://localhost:5173`

## Project Structure

```
AI-Resume-Analyzer/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── config/
│   │   ├── controllers/
│   │   └── routes/
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   └── App.jsx
│   └── .env
└── README.md
```

## Roadmap

**Week 2** — PDF text extraction (pdf-parse + OCR fallback for scanned documents)

**Week 3+** — AI-based resume analysis and scoring, results dashboard

## Author

Built by Hershita as a portfolio project.

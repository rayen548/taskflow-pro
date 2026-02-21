# TaskFlow Pro

A complete full-stack task management application with a beautiful modern design, built with React (frontend) and FastAPI (backend).

## 🌐 Live Demo

- **Frontend**: https://taskflow-6okpjwrgu-rayenlouati0-3584s-projects.vercel.app
- **Backend API**: https://taskflow-pro-api.onrender.com
- **API Docs**: https://taskflow-pro-api.onrender.com/docs

## Features

### Backend (FastAPI + Python)
- RESTful API with FastAPI
- Task management (CRUD operations)
- User management
- Statistics and analytics
- Auto-generated API documentation (Swagger UI)
- CORS enabled for frontend integration

### Frontend (React + Vite)
- Modern, responsive UI with gradient design
- Task management interface
- User management interface
- Real-time statistics dashboard
- Beautiful animations and transitions
- Mobile-friendly design

## Project Structure

```
project/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── README.md
└── frontend/
    ├── src/
    │   ├── App.jsx          # Main React component
    │   ├── App.css          # Styles
    │   ├── main.jsx         # Entry point
    │   └── index.css        # Global styles
    ├── index.html
    ├── package.json         # Node dependencies
    └── vite.config.js       # Vite configuration
```

## Quick Start

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the server:
```bash
python main.py
```

The API will be available at http://localhost:8000
- API Documentation: http://localhost:8000/docs

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will be available at http://localhost:3000

## API Endpoints

- `GET /` - API information
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/{id}` - Get a specific task
- `PUT /api/tasks/{id}` - Update a task
- `DELETE /api/tasks/{id}` - Delete a task
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/{id}` - Get a specific user
- `GET /api/stats` - Get statistics

## Technologies Used

### Backend
- FastAPI - Modern Python web framework
- Uvicorn - ASGI server
- Pydantic - Data validation

### Frontend
- React 18 - UI library
- Vite - Build tool
- Axios - HTTP client
- React Icons - Icon library

## Features Showcase

- ✅ Complete CRUD operations for tasks
- ✅ User management system
- ✅ Real-time statistics dashboard
- ✅ Beautiful gradient UI design
- ✅ Responsive mobile design
- ✅ Smooth animations and transitions
- ✅ Form validation
- ✅ Task completion tracking
- ✅ Progress visualization

## Development

Both frontend and backend support hot-reloading during development for a smooth development experience.

## License

MIT License - feel free to use this project for learning and development!

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
import uuid

app = FastAPI(title="TaskFlow Pro API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class Task(BaseModel):
    id: Optional[str] = None
    title: str
    description: str
    completed: bool = False
    created_at: Optional[str] = None

class User(BaseModel):
    id: Optional[str] = None
    name: str
    email: str
    joined_at: Optional[str] = None

# In-memory database
tasks_db = []
users_db = []

# Root endpoint
@app.get("/")
def read_root():
    return {
        "message": "Welcome to TaskFlow Pro API",
        "version": "1.0.0",
        "endpoints": {
            "tasks": "/api/tasks",
            "users": "/api/users",
            "stats": "/api/stats"
        }
    }

# Task endpoints
@app.get("/api/tasks", response_model=List[Task])
def get_tasks():
    return tasks_db

@app.post("/api/tasks", response_model=Task)
def create_task(task: Task):
    task.id = str(uuid.uuid4())
    task.created_at = datetime.now().isoformat()
    tasks_db.append(task)
    return task

@app.get("/api/tasks/{task_id}", response_model=Task)
def get_task(task_id: str):
    for task in tasks_db:
        if task.id == task_id:
            return task
    raise HTTPException(status_code=404, detail="Task not found")

@app.put("/api/tasks/{task_id}", response_model=Task)
def update_task(task_id: str, updated_task: Task):
    for index, task in enumerate(tasks_db):
        if task.id == task_id:
            updated_task.id = task_id
            updated_task.created_at = task.created_at
            tasks_db[index] = updated_task
            return updated_task
    raise HTTPException(status_code=404, detail="Task not found")

@app.delete("/api/tasks/{task_id}")
def delete_task(task_id: str):
    for index, task in enumerate(tasks_db):
        if task.id == task_id:
            tasks_db.pop(index)
            return {"message": "Task deleted successfully"}
    raise HTTPException(status_code=404, detail="Task not found")

# User endpoints
@app.get("/api/users", response_model=List[User])
def get_users():
    return users_db

@app.post("/api/users", response_model=User)
def create_user(user: User):
    user.id = str(uuid.uuid4())
    user.joined_at = datetime.now().isoformat()
    users_db.append(user)
    return user

@app.get("/api/users/{user_id}", response_model=User)
def get_user(user_id: str):
    for user in users_db:
        if user.id == user_id:
            return user
    raise HTTPException(status_code=404, detail="User not found")

# Stats endpoint
@app.get("/api/stats")
def get_stats():
    completed_tasks = sum(1 for task in tasks_db if task.completed)
    pending_tasks = len(tasks_db) - completed_tasks
    
    return {
        "total_tasks": len(tasks_db),
        "completed_tasks": completed_tasks,
        "pending_tasks": pending_tasks,
        "total_users": len(users_db),
        "completion_rate": round((completed_tasks / len(tasks_db) * 100) if tasks_db else 0, 2)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

import React, { useState, useEffect } from 'react';
import { FaTasks, FaUsers, FaChartLine, FaPlus, FaCheck, FaTrash, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import './App.css';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

function App() {
  const [activeTab, setActiveTab] = useState('tasks');
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    completed: false
  });

  const [userForm, setUserForm] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    fetchTasks();
    fetchUsers();
    fetchStats();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingTask) {
        await axios.put(`${API_BASE_URL}/api/tasks/${editingTask.id}`, taskForm);
        setEditingTask(null);
      } else {
        await axios.post(`${API_BASE_URL}/api/tasks`, taskForm);
      }
      setTaskForm({ title: '', description: '', completed: false });
      setShowTaskForm(false);
      fetchTasks();
      fetchStats();
    } catch (error) {
      console.error('Error creating/updating task:', error);
    }
    setLoading(false);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/api/users`, userForm);
      setUserForm({ name: '', email: '' });
      setShowUserForm(false);
      fetchUsers();
      fetchStats();
    } catch (error) {
      console.error('Error creating user:', error);
    }
    setLoading(false);
  };

  const handleToggleTask = async (task) => {
    try {
      await axios.put(`${API_BASE_URL}/api/tasks/${task.id}`, {
        ...task,
        completed: !task.completed
      });
      fetchTasks();
      fetchStats();
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/tasks/${taskId}`);
      fetchTasks();
      fetchStats();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskForm({
      title: task.title,
      description: task.description,
      completed: task.completed
    });
    setShowTaskForm(true);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">
            <FaChartLine className="logo-icon" />
            TaskFlow Pro
          </h1>
          <p className="tagline">Streamline Your Workflow with Smart Task Management</p>
        </div>
      </header>

      <div className="container">
        <nav className="nav-tabs">
          <button
            className={`nav-tab ${activeTab === 'tasks' ? 'active' : ''}`}
            onClick={() => setActiveTab('tasks')}
          >
            <FaTasks /> Tasks
          </button>
          <button
            className={`nav-tab ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <FaUsers /> Users
          </button>
          <button
            className={`nav-tab ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            <FaChartLine /> Statistics
          </button>
        </nav>

        <div className="content">
          {activeTab === 'tasks' && (
            <div className="tasks-section">
              <div className="section-header">
                <h2>Task Management</h2>
                <button
                  className="btn-primary"
                  onClick={() => {
                    setShowTaskForm(!showTaskForm);
                    setEditingTask(null);
                    setTaskForm({ title: '', description: '', completed: false });
                  }}
                >
                  <FaPlus /> {showTaskForm ? 'Cancel' : 'New Task'}
                </button>
              </div>

              {showTaskForm && (
                <form className="form-card" onSubmit={handleCreateTask}>
                  <h3>{editingTask ? 'Edit Task' : 'Create New Task'}</h3>
                  <input
                    type="text"
                    placeholder="Task title"
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                    required
                    className="input"
                  />
                  <textarea
                    placeholder="Task description"
                    value={taskForm.description}
                    onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                    required
                    className="textarea"
                    rows="4"
                  />
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={taskForm.completed}
                      onChange={(e) => setTaskForm({ ...taskForm, completed: e.target.checked })}
                    />
                    Mark as completed
                  </label>
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : editingTask ? 'Update Task' : 'Create Task'}
                  </button>
                </form>
              )}

              <div className="tasks-grid">
                {tasks.length === 0 ? (
                  <div className="empty-state">
                    <FaTasks size={48} />
                    <p>No tasks yet. Create your first task!</p>
                  </div>
                ) : (
                  tasks.map((task) => (
                    <div key={task.id} className={`task-card ${task.completed ? 'completed' : ''}`}>
                      <div className="task-header">
                        <h3>{task.title}</h3>
                        <div className="task-actions">
                          <button
                            className="btn-icon"
                            onClick={() => handleToggleTask(task)}
                            title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                          >
                            <FaCheck />
                          </button>
                          <button
                            className="btn-icon"
                            onClick={() => handleEditTask(task)}
                            title="Edit task"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn-icon btn-danger"
                            onClick={() => handleDeleteTask(task.id)}
                            title="Delete task"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                      <p className="task-description">{task.description}</p>
                      <div className="task-footer">
                        <span className={`task-status ${task.completed ? 'status-completed' : 'status-pending'}`}>
                          {task.completed ? 'Completed' : 'Pending'}
                        </span>
                        <span className="task-date">
                          {new Date(task.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="users-section">
              <div className="section-header">
                <h2>User Management</h2>
                <button
                  className="btn-primary"
                  onClick={() => setShowUserForm(!showUserForm)}
                >
                  <FaPlus /> {showUserForm ? 'Cancel' : 'New User'}
                </button>
              </div>

              {showUserForm && (
                <form className="form-card" onSubmit={handleCreateUser}>
                  <h3>Create New User</h3>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={userForm.name}
                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                    required
                    className="input"
                  />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    required
                    className="input"
                  />
                  <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Creating...' : 'Create User'}
                  </button>
                </form>
              )}

              <div className="users-grid">
                {users.length === 0 ? (
                  <div className="empty-state">
                    <FaUsers size={48} />
                    <p>No users yet. Add your first user!</p>
                  </div>
                ) : (
                  users.map((user) => (
                    <div key={user.id} className="user-card">
                      <div className="user-avatar">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <h3>{user.name}</h3>
                      <p className="user-email">{user.email}</p>
                      <span className="user-date">
                        Joined {new Date(user.joined_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="stats-section">
              <h2>Statistics Dashboard</h2>
              {stats && (
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon tasks">
                      <FaTasks />
                    </div>
                    <div className="stat-content">
                      <h3>Total Tasks</h3>
                      <p className="stat-number">{stats.total_tasks}</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon completed">
                      <FaCheck />
                    </div>
                    <div className="stat-content">
                      <h3>Completed</h3>
                      <p className="stat-number">{stats.completed_tasks}</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon pending">
                      <FaChartLine />
                    </div>
                    <div className="stat-content">
                      <h3>Pending</h3>
                      <p className="stat-number">{stats.pending_tasks}</p>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon users">
                      <FaUsers />
                    </div>
                    <div className="stat-content">
                      <h3>Total Users</h3>
                      <p className="stat-number">{stats.total_users}</p>
                    </div>
                  </div>

                  <div className="stat-card wide">
                    <div className="stat-icon rate">
                      <FaChartLine />
                    </div>
                    <div className="stat-content">
                      <h3>Completion Rate</h3>
                      <p className="stat-number">{stats.completion_rate}%</p>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${stats.completion_rate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

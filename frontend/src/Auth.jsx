import React, { useState } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import './Auth.css';

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!isLogin) {
      // Signup validation
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }

    // Simulate authentication
    const userData = {
      email: formData.email,
      name: isLogin ? formData.email.split('@')[0] : formData.name
    };

    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(userData));
    onLogin(userData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-background"></div>
      <div className="auth-card">
        <div className="auth-header">
          <h1>TaskFlow Pro</h1>
          <p>Streamline Your Workflow</p>
        </div>

        <div className="auth-tabs">
          <button
            className={`auth-tab ${isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(true);
              setError('');
            }}
          >
            Login
          </button>
          <button
            className={`auth-tab ${!isLogin ? 'active' : ''}`}
            onClick={() => {
              setIsLogin(false);
              setError('');
            }}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="form-group">
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <div className="input-wrapper">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div className="input-wrapper">
              <FaLock className="input-icon" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="auth-submit-btn">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? (
            <p>
              Don't have an account?{' '}
              <button
                className="auth-link"
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                }}
              >
                Sign up here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                className="auth-link"
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                }}
              >
                Login here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth;

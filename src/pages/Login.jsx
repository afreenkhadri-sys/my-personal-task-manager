import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Both email and password are required.');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    navigate('/dashboard');
  };

  return (
    <div style={{
      display: 'grid',
      placeItems: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif',
      background: '#f8fafc',
      padding: '20px'
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          background: 'white',
          padding: '40px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          width: '100%',
          maxWidth: '360px'
        }}
      >
        <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#1e293b', fontSize: '24px' }}>
          Task Manager
        </h2>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '6px', fontWeight: 500, color: '#334155' }}>
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '16px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
            onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
          />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '6px', fontWeight: 500, color: '#334155' }}>
            Password
          </label>
          <div style={{ position: 'relative' }}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              style={{
                width: '100%',
                padding: '12px 16px 12px 16px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '16px',
                outline: 'none',
                transition: 'border-color 0.2s'
              }}
              onFocus={(e) => e.target.style.borderColor = '#60a5fa'}
              onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#64748b',
                cursor: 'pointer',
                fontSize: '14px'
              }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {error && (
          <p style={{
            color: '#dc2626',
            fontSize: '14px',
            margin: '0 0 16px',
            textAlign: 'center'
          }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '14px',
            background: '#0ea5e9',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.background = '#0284c7'}
          onMouseLeave={(e) => e.target.style.background = '#0ea5e9'}
        >
          Sign In
        </button>
      </form>

      <p style={{
        marginTop: '24px',
        fontSize: '14px',
        color: '#64748b',
        textAlign: 'center'
      }}>
        Tip: Try any email & password — no real accounts are used.
      </p>
    </div>
  );
}

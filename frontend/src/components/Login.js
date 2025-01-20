import React, { useState } from 'react';
import axios from 'axios';
import Header from './signpages/signhead';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/login', { email, password });
            const { token, role } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            onLogin(role);
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed');
        }
    };

    return (
        <>
        <Header />
        <section className="hero-section">
        <div className="content">
          <h1>
            Learning Programmes from South India’s Leading Coaching
            Academy
          </h1>
          <ul>
            <li>
              12+ years of sterling legacy with experienced faculty & mentors
            </li>
            <li>Regular mentor support with daily topic-wise</li>
            <li>
              Best-in-class mock tests, study materials, updated computers & classes
            </li>
          </ul>
        </div>
        <div className='form-container'>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input  type="email" placeholder='Enter your email' value={email}  onChange={(e) => setEmail(e.target.value)}  required />
                <input  type="password" placeholder='Enter your password' value={password}  onChange={(e) => setPassword(e.target.value)}  required />
                <button type="submit">Login</button>
                <p className='terms'>Do you want to Join ? <a href="/signapp"> Enquire here!</a></p>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    </section>
    </>
    );
};

export default Login;

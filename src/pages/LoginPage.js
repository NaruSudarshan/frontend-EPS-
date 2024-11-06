import React, { useState } from 'react';
import { login } from '../services/authService';

function LoginPage({ onLogin }) {
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const data = await login(email, password);
            onLogin(data, role); 
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Login</h2>
            <div className="text-center mb-4">
                <button className="btn btn-primary m-2" onClick={() => setRole('employee')}>Employee</button>
                <button className="btn btn-secondary m-2" onClick={() => setRole('admin')}>Admin</button>
            </div>

            {role && (
                <div className="col-md-6 mx-auto">
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <input 
                                type="email" 
                                className="form-control" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                placeholder="Email" 
                            />
                        </div>
                        <div className="mb-3">
                            <input 
                                type="password" 
                                className="form-control" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                placeholder="Password" 
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                </div>
            )}

            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
}

export default LoginPage;


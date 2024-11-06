import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import EmployeePage from './pages/EmployeePage';
import AdminPage from './pages/AdminPage';

function App() {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState('');

    const handleLogin = (userData, userRole) => {
        setUser(userData);
        setRole(userRole);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('role', userRole);
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={user ? (role === "admin" ? <Navigate to="/admin" /> : <Navigate to="/employee" />) : <LoginPage onLogin={handleLogin} />}
                />
                <Route path="/employee" element={user ? <EmployeePage token={user.token} /> : <Navigate to="/" />} />
                <Route path="/admin" element={user ? <AdminPage token={user.token} /> : <Navigate to="/" />} />
            </Routes>
        </Router>
    );
}

export default App;

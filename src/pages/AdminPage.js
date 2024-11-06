import React, { useEffect, useState } from 'react';
import { approveLeave } from '../services/adminService';

function AdminPage({ token }) {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLeaveRequests = async () => {
            try {
                const response = await fetch('/api/admin/leaveRequests', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setLeaveRequests(data);
            } catch (err) {
                setError('Failed to load leave requests');
            }
        };

        const fetchEmployees = async () => {
            try {
                const response = await fetch('/api/admin/employees', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await response.json();
                setEmployees(data);
            } catch (err) {
                setError('Failed to load employee data');
            }
        };

        fetchLeaveRequests();
        fetchEmployees();
    }, [token]);

    const handleApproveLeave = async (leaveId) => {
        try {
            await approveLeave(leaveId, token);
            setLeaveRequests(leaveRequests.filter((request) => request._id !== leaveId));
            alert('Leave approved');
        } catch (err) {
            setError('Failed to approve leave');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Admin Dashboard</h2>
            {error && <div className="alert alert-danger">{error}</div>}

            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Leave Requests</div>
                        <div className="card-body">
                            <ul className="list-group">
                                {leaveRequests.map((request) => (
                                    <li key={request._id} className="list-group-item d-flex justify-content-between align-items-center">
                                        {request.reason} - {request.status}
                                        <button 
                                            className="btn btn-success btn-sm" 
                                            onClick={() => handleApproveLeave(request._id)}
                                        >
                                            Approve
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Manage Employees</div>
                        <div className="card-body">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {employees.map((employee) => (
                                        <tr key={employee._id}>
                                            <td>{employee.name}</td>
                                            <td>{employee.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;

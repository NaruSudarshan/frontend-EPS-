import React, { useEffect, useState } from 'react';
import { viewPayroll, requestLeave } from '../services/employeeService';

function EmployeePage({ token }) {
    const [payroll, setPayroll] = useState([]);
    const [leaveData, setLeaveData] = useState({ startDate: '', endDate: '', reason: '' });
    const [error, setError] = useState('');
    const [leaveLeft, setLeaveLeft] = useState(0);

    useEffect(() => {
        const fetchPayroll = async () => {
            try {
                const data = await viewPayroll(token);
                setPayroll(data);
                setLeaveLeft(data.leaveLeft);
            } catch (err) {
                setError('Failed to load payroll data');
            }
        };
        fetchPayroll();
    }, [token]);

    const handleLeaveRequest = async () => {
        if (leaveLeft <= 0) {
            setError('No leave left for this month!');
            return;
        }

        try {
            await requestLeave(leaveData, token);
            alert('Leave request submitted!');
            setLeaveData({ startDate: '', endDate: '', reason: '' });
        } catch (err) {
            setError('Failed to submit leave request');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Employee Dashboard</h2>

            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Payroll Records</div>
                        <div className="card-body">
                            <ul className="list-group">
                                {payroll.map((pay, index) => (
                                    <li key={index} className="list-group-item">
                                        {pay.month}/{pay.year} - ${pay.amount}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Request Leave</div>
                        <div className="card-body">
                            <div className="mb-3">
                                <label className="form-label">Start Date</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    value={leaveData.startDate} 
                                    onChange={(e) => setLeaveData({ ...leaveData, startDate: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">End Date</label>
                                <input 
                                    type="date" 
                                    className="form-control" 
                                    value={leaveData.endDate} 
                                    onChange={(e) => setLeaveData({ ...leaveData, endDate: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Reason</label>
                                <input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="Reason"
                                    value={leaveData.reason}
                                    onChange={(e) => setLeaveData({ ...leaveData, reason: e.target.value })}
                                />
                            </div>
                            <button onClick={handleLeaveRequest} className="btn btn-primary w-100">Submit Leave Request</button>

                            {error && <div className="alert alert-danger mt-3">{error}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeePage;

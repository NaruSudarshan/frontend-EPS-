import axios from 'axios';

const API_URL = "/api/employees";

export const viewPayroll = async (token) => {
    const response = await axios.get(`${API_URL}/payroll`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const requestLeave = async (leaveData, token) => {
    const response = await axios.post(`${API_URL}/leave`, leaveData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

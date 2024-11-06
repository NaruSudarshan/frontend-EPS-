import axios from 'axios';

const API_URL = "/api/admin";

export const approveLeave = async (leaveId, token) => {
    const response = await axios.put(`${API_URL}/leave/${leaveId}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

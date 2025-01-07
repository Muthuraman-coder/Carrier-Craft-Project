import React, { useState } from 'react';
import axios from 'axios';

function UpdateAttendance({ studentId }) {
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');

    const handleAttendanceSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3001/api/students/${studentId}/attendance`, {
                date,
                status,
            });

            alert('Attendance updated successfully');
            setDate('');
            setStatus('');
            console.log(response.data);
        } catch (error) {
            console.error('Error updating attendance:', error);
            alert('Failed to update attendance');
        }
    };

    return (
        <form onSubmit={handleAttendanceSubmit}>
            <label>
                Date:
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </label>
            <label>
                Status:
                <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                    <option value="">Select Status</option>
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                </select>
            </label>
            <button type="submit">Update Attendance</button>
        </form>
    );
}

export default UpdateAttendance;

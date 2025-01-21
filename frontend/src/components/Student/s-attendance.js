import React, { useState, useEffect } from 'react';
import axios from 'axios';

const S_Attendance = () => {
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        axios
            .get('http://localhost:3001/api/student-dashboard', { headers: { Authorization: `Bearer ${token}` } })
            .then((response) => {
                const student = response.data;
                setAttendance(student.attendance);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching attendance:', error);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>Your Attendance</h1>
            <ul>
                {attendance.map((entry, index) => (
                    <li key={index}>
                        {new Date(entry.date).toLocaleDateString()}: {entry.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default S_Attendance;

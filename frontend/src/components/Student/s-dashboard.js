import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentDashboard = () => {
    const [studentData, setStudentData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            axios.get('http://localhost:3001/api/student-profile', { headers: { Authorization: `Bearer ${token}` } })
                .then((response) => {
                    setStudentData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching student dashboard:', error);
                });
        }
    }, [navigate]);

    if (!studentData) return <div>Loading...</div>;

    return (
        <div>
            <h1>Welcome, {studentData.name}</h1>
            <h3>Enrolled Courses:</h3>
            <ul>
                {studentData.course.map((course) => (
                    <li key={course._id}>{course.name}</li>
                ))}
            </ul>
            <h3>Attendance:</h3>
            <ul>
                {studentData.attendance.map((entry, index) => (
                    <li key={index}>
                        {new Date(entry.date).toLocaleDateString()}: {entry.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudentDashboard;

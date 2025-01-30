import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TAttendanceGraph = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchAttendanceData = async () => {
            const token = localStorage.getItem('token')
            try {
                const response = await axios.get('http://localhost:3001/api/teacher-attendance/graph', { headers: { Authorization: `Bearer ${token}` } });
                setAttendanceData(response.data)
            } catch (err) {
                setError(err.message);
                
            }
        };

        fetchAttendanceData();
    }, []);

    const chartData = {
        labels: attendanceData.map(student => student.name), 
        datasets: [
            {
                label: 'Number of Present Days',
                data: attendanceData.map(student => student.presentCount), 
                backgroundColor: 'rgba(75, 192, 192, 0.2)', 
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <Bar data={chartData}  />
        </div>
    );
};

export default TAttendanceGraph;

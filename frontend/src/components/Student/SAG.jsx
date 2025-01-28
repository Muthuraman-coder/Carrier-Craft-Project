import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function SAttendanceGraph() {
    const [attendanceStats, setAttendanceStats] = useState({
        present: 0,
        absent: 0,
        late: 0,
    });

    useEffect(() => {
        const studentId = localStorage.getItem('studentId');

        const fetchAttendanceData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/student/${studentId}/attendance/graph`);
                setAttendanceStats(response.data);
            } catch (error) {
                console.error('Error fetching attendance stats:', error);
            }
        };

        fetchAttendanceData();
    }, []);

    const data = {
        labels: ['Present', 'Absent', 'Late'],
        datasets: [
            {
                label: 'Attendance Count',
                data: [
                    attendanceStats.present,
                    attendanceStats.absent,
                    attendanceStats.late,
                ], 
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );
}

export default SAttendanceGraph;

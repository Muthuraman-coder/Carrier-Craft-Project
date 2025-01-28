import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function SAMarksGraph() {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const studentId = localStorage.getItem('studentId')
        const fetchAssignments = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/student/${studentId}/assignments`);
                console.log(response.data)
                setAssignments(response.data);
            } catch (error) {
                console.error('Error fetching assignments:', error);
            }
        };

        fetchAssignments();
    }, [ ]);

    const data = {
        labels: assignments.map((assignment) => assignment.title), 
        datasets: [
            {
                label: 'Marks Obtained',
                data: assignments.map((assignment) => assignment.grade), 
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
            {assignments.length > 0 ? (
                <Bar data={data} options={options} />
            ) : (
                <p>No assignments found for this student.</p>
            )}
        </div>
    );
}

export default SAMarksGraph;

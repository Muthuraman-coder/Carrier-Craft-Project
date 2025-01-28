import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const TopStudentsChart = () => {
    const [data, setData] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const fetchTopStudents = async () => {
            try {
                const response = await axios.get("http://localhost:3001/api/top-students", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setData(response.data); 
                setLoading(false); 
            } catch (error) {
                console.error("Error fetching data with Axios:", error);
                setLoading(false); 
            }
        };

        fetchTopStudents();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data || data.length === 0) {
        return <div>No data available to display.</div>; 
    }

    const chartData = {
        labels: data.map((student) => student.name),
        datasets: [
            {
                label: "Total Grades",
                data: data.map((student) => student.totalGrade), 
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div style={{ width: "80%", margin: "auto" }}>
            <h2>Top Students by Grades</h2>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default TopStudentsChart;

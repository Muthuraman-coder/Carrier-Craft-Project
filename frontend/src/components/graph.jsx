import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement,  Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement,  Tooltip, Legend);

const Graph = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/students-count')
      .then(({ data }) => setChartData({
        labels: data.map(course => course.name),
        datasets: [{
          label: 'Number of Students',
          data: data.map(course => course.studentCount),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }],
      }))
      .catch(err => console.error(err));
  }, []);

  if (!chartData) return <p>Loading or no data available...</p>;

  return (
    <div >
      <Bar  data={chartData}/>
    </div>
  );
};

export default Graph;

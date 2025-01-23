import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SAttendance() {
  const { id } = useParams(); 
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token')
    async function fetchStudent() {
      try {
        const response = await axios.get('http://localhost:3001/api/student-profile', { headers: { Authorization: `Bearer ${token}` } })
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    }

    fetchStudent();
  }, [id]);

  if (!student) {
    return <p>Loading...</p>;
  }

  return (
    <div className='resume-format'>
      <h4>Attendance:</h4>
      <ul>
        {student.attendance.map((record, index) => (
          <li key={index}>
            {new Date(record.date).toLocaleDateString()}: {record.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SAttendance;

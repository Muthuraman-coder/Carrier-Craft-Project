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
    <div>
      <h4>Attendance:</h4>
      {student.attendance.length > 0 ? (
        <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {student.attendance.map((record, index) => (
              <tr key={index}>
                <td>{new Date(record.date).toLocaleDateString()}</td>
                <td>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No attendance records available.</p>
      )}
    </div>

  );
}

export default SAttendance;

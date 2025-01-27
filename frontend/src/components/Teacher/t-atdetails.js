import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TAtDetails() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token')
    async function fetchAttendance() {
      try {
        const response = await axios.get('http://localhost:3001/api/teacher-attendance', { headers: { Authorization: `Bearer ${token}` } });
        setStudents(response.data.students);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    }

    fetchAttendance();
  }, []);

  return (
    <div>
      <h2>Attendance Summary</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Course</th>
            <th>Total Present</th>
            <th>Total Absent</th>
            <th>Total Late</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const totalPresent = student.attendance.filter((a) => a.status === 'Present').length;
            const totalAbsent = student.attendance.filter((a) => a.status === 'Absent').length;
            const totalLate = student.attendance.filter((a) => a.status === 'Late').length;

            return (
              <tr key={student._id}>
                <td>{student.name}</td>
                {student.course.map((c) => (
                  <td key={c._id}>{c.name}</td>
                ))}
                <td>{totalPresent}</td>
                <td>{totalAbsent}</td>
                <td>{totalLate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TAtDetails;

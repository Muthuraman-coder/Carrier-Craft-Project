import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AttendanceSummary() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchAttendance() {
      try {
        const response = await axios.get('http://localhost:3001/api/students');
        setStudents(response.data);
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
                <td>{student.course}</td>
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

export default AttendanceSummary;

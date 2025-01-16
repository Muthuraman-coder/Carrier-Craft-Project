import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DailyAttendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState('');

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get('http://localhost:3001/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    }

    fetchStudents();
  }, []);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance({ ...attendance, [studentId]: status });
  };

  const handleSubmit = async () => {
    try {
      await Promise.all(
        students.map((student) =>
          axios.post(`http://localhost:3001/api/students/${student._id}/attendance`, {
            date: new Date(),
            status: attendance[student._id],
          })
        )
      );
      alert('Attendance updated successfully');
    } catch (error) {
      console.error('Error updating attendance:', error);
      alert('Failed to update attendance');
    }
  };

  return (
    <div>
      <h2>Daily Attendance</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>course</th>
            <th>Date</th>
            <th>Status</th>
            <th>Submit </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              {student.course.map((c) =>(
                <td key={c._id}>{c.name}</td>
              ))}
              <td><input type="date" value={date} onChange={(e) => setDate(e.target.value)} required/></td>
              <td>
                <select value={attendance[student._id]} onChange={(e) => handleAttendanceChange(student._id, e.target.value)} >
                  <option value="">select status</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                </select>
              </td>
              <td><button onClick={handleSubmit}>Click to summit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DailyAttendance;

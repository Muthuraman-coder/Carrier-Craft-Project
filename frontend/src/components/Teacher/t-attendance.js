import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TAttendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const token = localStorage.getItem('token');
    async function fetchStudents() {
      try {
        const response = await axios.get('http://localhost:3001/api/teacher-attendance', { headers: { Authorization: `Bearer ${token}` } });
        setStudents(response.data.students);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    }

    fetchStudents();
  }, [id]);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance({
      ...attendance,
      [studentId]: {
        ...attendance[studentId],
        status: status || 'Absent', 
      }
    });
  };
  
  const handleDateChange = (studentId, date) => {
    setAttendance({
      ...attendance,
      [studentId]: {
        ...attendance[studentId],
        date: date
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const updatedAttendance = students.map((student) => {
        const { date, status } = attendance[student._id] || {};
  
        if (!date || !status) {
          return;
        }
  
        return axios.post(`http://localhost:3001/api/students/${student._id}/attendance`, {
          date: date,
          status: status,
        });
      });
      await Promise.all(updatedAttendance);
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
            <th>Course</th>
            <th>Date</th>
            <th>Status</th>
            <th>Submit</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              {student.course?.map((c) => (
                <td key={c._id}>{c.name}</td>
              ))}
              <td>
                <input
                  type="date"
                  value={attendance[student._id]?.date || ''}
                  onChange={(e) => handleDateChange(student._id, e.target.value)}
                  required
                />
              </td>
              <td>
                <select value={attendance[student._id]?.status || ''} onChange={(e) => handleAttendanceChange(student._id, e.target.value)} >
                  <option value="">Select status</option>
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                </select>
              </td>
              <td>
                <button onClick={handleSubmit}>Click to submit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TAttendance;

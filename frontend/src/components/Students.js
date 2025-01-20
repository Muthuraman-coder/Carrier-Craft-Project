import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Students() {
  const [students, setStudents] = useState([]);

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

  const handledelete = (id) => {
    try {
      axios.delete(`http://localhost:3001/api/students/${id}`);
      setStudents(students.filter((student) => student._id !== id));
      alert('Student deleted successfully');
    } catch (error) {
      alert('Error deleting student');
    }
  };

  return (
    <div >
        <h2>Student List</h2>
        <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Course</th>
                <th>CGPA</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {students.map((student) => (
             <tr key={student._id}>
                <td><Link to={`/students/${student._id}`}>{student.name}</Link></td>
                {student.course.map(c =>(
                <td key={c._id}>{c.name ? c.name : 'course not selected'}</td>
                ))}
                <td>{student.grade}</td>
                <td>{student.email}</td>
                <td><button onClick={() => handledelete(student._id)}>Delete</button></td>
            </tr>
            ))}
        </tbody>
        </table>
    </div>
  );
}

export default Students;

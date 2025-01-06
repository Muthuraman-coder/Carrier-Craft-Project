import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UpdateAttendance from './Attendance';

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

  const handledelete = (id) =>{
    try{
      axios.delete(`http://localhost:3001/api/students/${id}`)
      setStudents(students.filter((student) => student._id !== id))
      alert('student deleted successfully')
    }catch(error){
      alert('errro in student delete')
    }
  }

  return (
    <div className="container">
      <div className="content">
      {students.map(student => (
        <div className="section" key={student._id}>
          <h3>{student.name}</h3>
          <p>Age: {student.age}</p>
          <p>Grade: {student.grade}</p>
          <p>Email: {student.email}</p>
          <img src={`http://localhost:3001${student.profilePicture}`} alt="profile" />
          <button onClick={() => handledelete(student._id)}>Delete</button>

          <h4>Attendance:</h4>
        <ul>
            {student.attendance.map((record, index) => (
                <li key={index}>
                    {new Date(record.date).toLocaleDateString()}: {record.status}
                </li>
            ))}
        </ul>

        <h4>Update Attendance:</h4>
        <UpdateAttendance studentId={student._id} />
        </div>
      ))}
     </div>
    </div>
  );
}

export default Students;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function StudentDetails() {
  const { id } = useParams(); 
  const [student, setStudent] = useState(null);

  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await axios.get(`http://localhost:3001/api/students/${id}`);
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
     <img src={`http://localhost:3001${student.profilePicture}`} alt="profile" />
      <h2>{student.name}'s Details</h2>
      <p>Age: {student.age}</p>
      <p>Grade: {student.grade}</p>
      <p>Email: {student.email}</p>
      {student.course.map((c) =>(
        <p key={c._id}>Course: {c.name}</p>
      ))}
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

export default StudentDetails;

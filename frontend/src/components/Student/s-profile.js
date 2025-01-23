import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function StudentProfile() {
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
     <img src={`http://localhost:3001${student.profilePicture}`} alt="profile" />
      <h2>{student.name}'s Details</h2>
      <p>Age: {student.age}</p>
      <p>Grade: {student.grade}</p>
      <p>Email: {student.email}</p>
      {student.course.map((c) =>(
        <p key={c._id}>Course: {c.name}</p>
      ))}
    </div>
  );
}

export default StudentProfile;

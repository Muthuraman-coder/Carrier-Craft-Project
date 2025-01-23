import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Tprofile() {
  const { id } = useParams();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token')
    async function fetchTeacher() {
      try {
        const response = await axios.get('http://localhost:3001/api/teacher-profile', { headers: { Authorization: `Bearer ${token}` } })
        setTeacher(response.data);
      } catch (error) {
        console.error('Error fetching teacher details:', error);
      }
    }

    fetchTeacher();
  }, [id]);

  if (!teacher) {
    return <p>Loading...</p>;
  }

  return (
    <div className='resume-format'>
        <img src={`http://localhost:3001${teacher.profilePicture}`} alt="profile" />
      <h2>{teacher.name}'s Details</h2>
      <p>Email: {teacher.email}</p>
      {teacher.course.map(c =>(
            <p key={c._id}>Course: {c.name ? c.name : 'course not selected'}</p>
          ))}
    </div>
  );
}

export default Tprofile;

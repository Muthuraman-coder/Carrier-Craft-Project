import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Teachers() {
    const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const response = await axios.get('http://localhost:3001/api/teachers');
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    }

    fetchTeachers();
  }, []);

  const handledelete = (id) =>{
    try{
      axios.delete(`http://localhost:3001/api/teachers/${id}`)
      setTeachers(teachers.filter((teacher) => teacher._id !== id))
      alert('teacher deleted successfully')
    }catch(error){
      alert('errro in  delete')
    }
  }

  return (
    <div className="container">
      <div className="content">
      {teachers.map(teacher => (
        <div className="section" key={teacher._id}>
          <h3>{teacher.name}</h3>
          <p>Subject: {teacher.subject}</p>
          <p>Email: {teacher.email}</p>
          <img src={`http://localhost:3001${teacher.profilePicture}`} alt="profile" />
          <button onClick={() => handledelete(teacher._id)}>Delete</button>
        </div>
      ))}
     </div>
    </div>
  );
}

export default Teachers;

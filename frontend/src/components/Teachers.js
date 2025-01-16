import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
    <div>
    <h2>Teacher List</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Course</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {teachers.map((teacher) => (
          <tr key={teacher._id}>
            <td>
              <Link to={`/teachers/${teacher._id}`}>{teacher.name}</Link>
            </td>
            {teacher.course.map(c =>(
              <td key={c._id}>{c.name ? c.name : 'course not selected'}</td>
            ))}
            <td>{teacher.email}</td>
            <td>
              <button onClick={() => handledelete(teacher._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>  
  );
}

export default Teachers;

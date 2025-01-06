import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await axios.get('http://localhost:3001/api/courses');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    }

    fetchCourses();
  }, []);

  const handledelete = (id) =>{
    try{
      axios.delete(`http://localhost:3001/api/courses/${id}`)
      setCourses(courses.filter((course) => course._id !== id))
      alert(' deleted successfully')
    }catch(error){
      alert('errro in delete')
    }
  }

  return (
    <div className="container">
      <div className="content">
        {courses.map((course) => (
          <div className="section" key={course._id}>
            <h3>{course.name}</h3>
            <p>Description: {course.description}</p>
            <button onClick={() => handledelete(course._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;

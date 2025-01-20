import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
      <div className="courses">
        {courses.map((course) => (
            <div  key={course._id}>
              <Link to={`/courses/${course._id}`}>
               <p >{course.name}</p>
              </Link>
              <button onClick={() => handledelete(course._id)}>Delete</button>
            </div>
        ))}
      </div>
  );
}

export default Courses;

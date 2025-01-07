import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CourseDetails() {
  const { id } = useParams(); 
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourseDetails() {
      try {
        const response = await axios.get(`http://localhost:3001/api/courses/${id}`);
        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching course details:', error);
        setLoading(false);
      }
    }

    fetchCourseDetails();
  }, [id]);

  if (loading) {
    return <p>Loading course details...</p>;
  }

  if (!course) {
    return <p>Course not found!</p>;
  }

  return (
    <div className="course-details">
      <h2>Course Details</h2>
      <h3>{course.name}</h3>
      <p><strong>Description:</strong> {course.description}</p>
    </div>
  );
}

export default CourseDetails;

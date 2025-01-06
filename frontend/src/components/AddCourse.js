import React, { useState } from 'react';
import axios from 'axios';

function AddCourse() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [teacherId, setTeacherId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/courses', {
        name,
        description,
        teacher: teacherId,
      });
      console.log('Course added:', response.data);
      setName('')
      setDescription('')
      setTeacherId('')
      alert('added successfully')
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Course Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <textarea
        placeholder="Course Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <button type="submit">Add Course</button>
    </form>
  );
}

export default AddCourse;

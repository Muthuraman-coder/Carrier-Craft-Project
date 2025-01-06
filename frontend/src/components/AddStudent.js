import React, { useState } from 'react';
import axios from 'axios';

function AddStudent() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [email, setEmail] = useState('');
  const [course , setcourse] = useState('')
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('age', age);
    formData.append('grade', grade);
    formData.append('email', email);
    formData.append('course', course)
    formData.append('profilePicture', profilePicture);

    try {
      const response = await axios.post('http://localhost:3001/api/students', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Student added:', response.data);
      setName('');
      setAge('');
      setGrade('');
      setEmail('');
      setcourse('');
      setProfilePicture(null);
      alert('student added successfully')
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required />
      <input type="text" placeholder="CGPA" value={grade} onChange={(e) => setGrade(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="text" placeholder="Course" value={course} onChange={(e) => setcourse(e.target.value)} required />
      <input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} />
      <button type="submit">Add Student</button>
    </form>
  );
}

export default AddStudent;

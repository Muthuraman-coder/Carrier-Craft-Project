import React, { useState } from 'react';
import axios from 'axios';

function AddTeacher() {
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('subject', subject);
    formData.append('email', email);
    formData.append('profilePicture', profilePicture);

    try {
      const response = await axios.post('http://localhost:3001/api/teachers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Teacher added:', response.data);
      setName('')
      setSubject('')
      setEmail('')
      setProfilePicture(null)
      alert('added successfully')
    } catch (error) {
      console.error('Error adding teacher:', error);
      alert('erro in adding')
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Courses" value={subject} onChange={(e) => setSubject(e.target.value)} required />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="file" onChange={(e) => setProfilePicture(e.target.files[0])} />
      <button type="submit">Add Teacher</button>
    </form>
  );
}

export default AddTeacher;

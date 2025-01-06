import React, { useState } from 'react';
import axios from 'axios';

function AddNotice() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/notices', { title, description });
      console.log('Notice added:', response.data);
      setTitle('')
      setDescription('')
      alert('added successfully')
    } catch (error) {
      console.error('Error adding notice:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Notice Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Notice Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <button type="submit">Add Notice</button>
    </form>
  );
}

export default AddNotice;

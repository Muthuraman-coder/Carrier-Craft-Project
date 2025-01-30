import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AssignmentSubmit() {
  const { id } = useParams(); 
  const [assignment, setAssignment] = useState(null);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [studentId, setStudentId] = useState(null); 

  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/user', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, 
          },
        });
        localStorage.setItem('studentId', response.data._id); 
        setStudentId(response.data._id);  
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token')
    async function fetchAssignment() {
      try {
        const response = await axios.get(`http://localhost:3001/api/assignments/${id}`,{headers:{Authorization:`Bearer ${token}`}});
        setAssignment(response.data);
      } catch (error) {
        console.error('Error fetching assignment:', error);
      }
    }

    fetchAssignment();
  }, [id]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setMessage('Please select a file to submit.');
      return;
    }
    if (!studentId) {
      setMessage('Student ID is not available.');
      return;
    }

    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('setfile', file);
    formData.append('studentId', studentId); 

    try {
      const response = await axios.post(`http://localhost:3001/api/assignments/${id}/submit`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('post details', response.data);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error submitting assignment:', error);
      setMessage('Failed to submit the assignment.');
    }
  };

  return (
    <div>
  {assignment ? (
    <div>
      <form onSubmit={handleSubmit}>
        <table>
          <tbody>
            <tr>
              <td><strong>Title:</strong></td>
              <td>{assignment.title}</td>
            </tr>
            <tr>
              <td><strong>Description:</strong></td>
              <td>{assignment.description}</td>
            </tr>
            <tr>
              <td><label htmlFor="setfile"><strong>Choose File:</strong></label></td>
              <td><input type="file" id="setfile" name="setfile" accept=".pdf,.doc,.docx,.txt,.jpg,.png,.jpeg" onChange={handleFileChange} required /></td>
            </tr>
            <tr>
              <td colSpan="2" style={{ textAlign: 'center' }}>
                <button type="submit">Submit</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      {message && <p>{message}</p>}
    </div>
  ) : (
    <p>Loading assignment details...</p>
  )}
</div>

  );
}

export default AssignmentSubmit;

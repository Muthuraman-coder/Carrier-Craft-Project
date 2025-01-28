import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Notices() {
    const [notices, setNotices] = useState([]);
    const [userrole , setUserRole] = useState();

  useEffect(() => {
    const role = localStorage.getItem('role')
    setUserRole(role)
    async function fetchNotices() {
      try {
        const response = await axios.get('http://localhost:3001/api/notices');
        setNotices(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    }

    fetchNotices();
  }, []);

  const handledelete = (id) =>{
    try{
      axios.delete(`http://localhost:3001/api/notices/${id}`)
      setNotices(notices.filter((notice) => notice._id !== id))
      alert(' deleted successfully')
    }catch(error){
      alert('errro in delete')
    }
  }

  return (
    <div>
      {notices.length > 0 ? (
        <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              {userrole === 'admin' && (
                <th>Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {notices.map((notice) => (
              <tr key={notice._id}>
                <td>{notice.title}</td>
                <td>{notice.description}</td>
                <td>{new Date(notice.date).toLocaleDateString()}</td>
                {userrole === 'admin' && (
                <td>
                  <button onClick={() => handledelete(notice._id)}>Delete</button>
                </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No notices available.</p>
      )}
    </div>

  );
}

export default Notices;

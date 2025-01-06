import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Notices() {
    const [notices, setNotices] = useState([]);

  useEffect(() => {
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
    <div className="container">
      <div className="content">
      {notices.map(notice => (
        <div className="section" key={notice._id}>
          <h3>{notice.title}</h3>
          <p>{notice.description}</p>
          <p>{new Date(notice.date).toLocaleDateString()}</p>
          <button onClick={() => handledelete(notice._id)}>Delete</button>
        </div>
      ))}
     </div>
    </div>
  );
}

export default Notices;

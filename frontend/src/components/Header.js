import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Header({ onLogout }) {
  const [user, setUser] = useState({
    name: '',
    profilePicture: null,
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const response = await axios.get('http://localhost:3001/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser({
          name: response.data.name,
          profilePicture: response.data.profilePicture || 'default-avatar.png',
        });
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="header">
    <h1>Carrier Craft Academy</h1>
    <div className="user-info">
      <img src={`http://localhost:3001${user.profilePicture}`} alt="User" />
      <span>Welcome, {user.name}</span>
      <span ><button onClick={onLogout}>LogOut</button></span>
    </div>
  </div>
  );
}

export default Header;

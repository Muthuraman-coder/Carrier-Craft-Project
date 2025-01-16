import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
  }, []);

  return (
    <div className="sidebar">
      <div className="admin-header">
        <img src="academy-logo.jpg" alt="Admin" />
        <h2>CCA</h2>
      </div>
      <ul>
        {!userRole && (
          <><li>welcome to CCA</li></>
        )}
        {userRole === 'admin' && (
          <>
            <li><Link to="/admin"><i className="icon">🏠</i>Dashboard</Link></li>
            <li><Link to="/signup"><i className="icon">👩‍🎓</i>New Register</Link></li>
            <li><Link to="/students"><i className="icon">☰</i>Students Details</Link></li>
            <li><Link to="/teachers"><i className="icon">☰</i>Teachers Details</Link></li>
            <li><Link to="/add-course"><i className="icon">📚</i>Add Course</Link></li>
            <li><Link to="/courses"><i className="icon">☰</i>Courses Details</Link></li>
            <li><Link to="/add-notice"><i className="icon">📋</i>Add Notice</Link></li>
            <li><Link to="/notices"><i className="icon">☰</i>Notices Details</Link></li>
            <li><Link to="/allattendance">Attendance Summary</Link></li>
            <li><Link to="/dailyattendance">Daily Attendance</Link></li>
          </>
        )}

        {(userRole === 'teacher' || userRole === 'student') && (
          <>
          {(userRole === 'student') && (
            <li><Link to="/student"><i className="icon">🏠</i>Dashboard</Link></li>
          )}
          {(userRole === 'teacher') && (
            <li><Link to="/teacher"><i className="icon">🏠</i>Dashboard</Link></li>
          )}
            <li><Link to="/students"><i className="icon">☰</i>Students Details</Link></li>
            <li><Link to="/teachers"><i className="icon">☰</i>Teachers Details</Link></li>
            <li><Link to="/courses"><i className="icon">☰</i>Courses Details</Link></li>
            <li><Link to="/notices"><i className="icon">☰</i>Notices Details</Link></li>
            <li><Link to="/allattendance">Attendance Summary</Link></li>
            <li><Link to="/dailyattendance">Daily Attendance</Link></li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;

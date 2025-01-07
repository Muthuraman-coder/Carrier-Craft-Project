import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <div class="sidebar">
      <div class="admin-header">
        <img src="academy-logo.jpg" alt="Admin" />
        <h2>CCA</h2>
      </div>
      <ul>
        <li ><Link to="/"><i class="icon">🏠</i>Dashboard</Link></li>
        <li><Link to="/add-student"><i class="icon">👩‍🎓</i>Add Student</Link></li>
        <li><Link to="/students"><i class="icon">☰</i>Students Details</Link></li>
        <li><Link to="/add-teacher"><i class="icon">👨‍🏫</i>Add Teacher</Link></li>
        <li><Link to="/teachers"><i class="icon">☰</i>Teachers Details</Link></li>
        <li><Link to="/add-course"><i class="icon">📚</i>Add Course</Link></li>
        <li><Link to="/courses"><i class="icon">☰</i>Courses Details</Link></li>
        <li><Link to="/add-notice"><i class="icon">📋</i>Add Notice</Link></li>
        <li><Link to="/notices"><i class="icon">☰</i>Notices Details</Link></li>
        <li><Link to="/allattendance">Attendance Summary</Link></li>
        <li><Link to="/dailyattendance">Daily Attendance</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;


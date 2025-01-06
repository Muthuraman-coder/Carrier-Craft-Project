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
        <li><Link to="/students">Students</Link></li>
        <li><Link to="/add-teacher"><i class="icon">👨‍🏫</i>Add Teacher</Link></li>
        <li><Link to="/teachers">Teachers</Link></li>
        <li><Link to="/add-course"><i class="icon">📚</i>Add Course</Link></li>
        <li><Link to="/courses">Courses</Link></li>
        <li><Link to="/add-notice"><i class="icon">📋</i>Add Notice</Link></li>
        <li><Link to="/notices">Notices</Link></li>
      </ul>
    </div>
  );
}

export default Sidebar;


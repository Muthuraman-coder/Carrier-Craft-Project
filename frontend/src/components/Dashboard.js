import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    courses: 0,
    notices: 0,
  });

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [studentsRes, teachersRes, coursesRes, noticesRes] = await Promise.all([
          axios.get('http://localhost:3001/api/students'),
          axios.get('http://localhost:3001/api/teachers'),
          axios.get('http://localhost:3001/api/courses'),
          axios.get('http://localhost:3001/api/notices'),
        ]);

        setCounts({
          students: studentsRes.data.length || 0,
          teachers: teachersRes.data.length || 0,
          courses: coursesRes.data.length || 0,
          notices: noticesRes.data.length || 0,
        });
      } catch (error) {
        console.error('Error fetching dashboard counts:', error);
      }
    }

    fetchCounts();
  }, []);

  return (
    <div className="dashboard">
    <div className="card red">
      <div className="icon">👩‍🎓</div>
      <p>{counts.students}</p>
      <div className="title">Total Students</div>
      <a href="/students" class="more-info">More Info →</a>
    </div>
    <div className="card blue">
      <div className="icon">👨‍🏫</div>
      <p>{counts.teachers}</p>
      <div className="title">Total Staff</div>
      <a href="/teachers" class="more-info">More Info →</a>
    </div>
    <div className="card gray">
      <div className="icon">📚</div>
      <p>{counts.courses}</p>
      <div className="title">Total Courses</div>
      <a href="/courses" class="more-info">More Info →</a>
    </div>
    <div className="card pink">
      <div className="icon">📘</div>
      <p>{counts.notices}</p>
      <div className="title">Total Notices</div>
      <a href="/notices" class="more-info">More Info →</a>
    </div>
  </div>
  
  );
}

export default Dashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaStickyNote } from 'react-icons/fa';
import Graph from './graph';
import Tgraph from './teachergraph';

function Dashboard() {
  const [counts, setCounts] = useState({
    students: 0,
    teachers: 0,
    courses: 0,
    notices: 0,
  });

  const token = localStorage.getItem('token');
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [studentsRes, teachersRes, coursesRes, noticesRes] = await Promise.all([
          axios.get('http://localhost:3001/api/students', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
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
  }, [token]);

  return (
    <main className="main-dashboard">
      <div className="dashboard">
        <div className="card red">
          <div className="icon"><FaUserGraduate /></div>
          <p>{counts.students}</p>
          <div className="title">Total Students</div>
        </div>
        <div className="card blue">
          <div className="icon"><FaChalkboardTeacher /></div>
          <p>{counts.teachers}</p>
          <div className="title">Total Staff</div>
        </div>
        <div className="card gray">
          <div className="icon"><FaBook /></div>
          <p>{counts.courses}</p>
          <div className="title">Total Courses</div>
        </div>
        <div className="card pink">
          <div className="icon"><FaStickyNote /></div>
          <p>{counts.notices}</p>
          <div className="title">Total Notices</div>
        </div>
      </div>
      <section className="charts-section">
        <div className="chart">
          <h3>Students per course</h3>
          <Graph />
        </div>
        <div className="chart">
          <h3>Teachers per course</h3>
          <Tgraph />
        </div>
      </section>
    </main>
  );
}

export default Dashboard;

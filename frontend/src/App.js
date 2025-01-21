import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header'; 
import Login from './components/Login';
import TeacherDashboard from './components/TeacherDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/AdminDashboard';
import AddStudent from './components/AddStudent';
import AddTeacher from './components/AddTeacher'; 
import AddNotice from './components/AddNotice'; 
import AddCourse from './components/AddCourse'; 
import Students from './components/Students'; 
import Teachers from './components/Teachers'; 
import Courses from './components/Courses'; 
import Notices from './components/Notices';
import AttendanceSummary from './components/AtendanceAll';
import DailyAttendance from './components/dailyattendance';
import StudentDetails from './components/StudentDetail';
import TeacherDetails from './components/TeacherDetails';
import CourseDetails from './components/CourseDetails';
import Signup from './components/Signup';
import Signapp from './components/signpages/signapp';
import Enquires from './components/enquires';
import Centres from './components/signpages/centres';
import Help from './components/signpages/help';
import AboutUs from './components/signpages/about';
import Graph from './components/graph';
import StudentDashboard from './components/Student/s-dashboard';
import Schedule from './components/Student/schedule';
import Assignments from './components/Student/assignments';
import PostAssignment from './components/Teacher/Postassign';
import PostSchedule from './components/Teacher/postschedule';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    const role = localStorage.getItem('role');
    setIsAuthenticated(auth);
    setUserRole(role);
  }, []);

  const handleLogin = (role) => {
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('role', role);
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<Login onLogin={handleLogin} />} />
          <Route path="/signapp" element={<Signapp />} />
          <Route path="/centres" element={<Centres />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Header onLogout={handleLogout} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Navigate to={`/${userRole}`} />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/student" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/assignment" element={<Assignments />} />
              <Route path="/postassign" element={<PostAssignment />} />
              <Route path="/postschedule" element={<PostSchedule />} />
              <Route path="/enquires" element={<Enquires />} />
              <Route path="/add-student" element={<AddStudent />} />
              <Route path="/add-teacher" element={<AddTeacher />} />
              <Route path="/add-notice" element={<AddNotice />} />
              <Route path="/add-course" element={<AddCourse />} />
              <Route path="/students" element={<Students />} />
              <Route path="/students/:id" element={<StudentDetails />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/teachers/:id" element={<TeacherDetails />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetails />} />
              <Route path="/notices" element={<Notices />} />
              <Route path="/graph" element={<Graph />} />
              <Route path="/allattendance" element={<AttendanceSummary />} />
              <Route path="/dailyattendance" element={<DailyAttendance />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

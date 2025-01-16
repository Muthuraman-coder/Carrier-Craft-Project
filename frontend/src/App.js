import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header'; 
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
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
          <Route path="/" element={<Login onLogin={handleLogin} />} />
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
              <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
              <Route path="/teacher" element={<ProtectedRoute role="teacher"><TeacherDashboard /></ProtectedRoute>} />
              <Route path="/student" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
              <Route path="/signup" element={<Signup />} />
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

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header'; 
import Dashboard from './components/Dashboard'; 
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

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Dashboard />} />
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

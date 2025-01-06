import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar'; // Sidebar component
import Header from './components/Header'; // Header component
import Dashboard from './components/Dashboard'; // Dashboard component
import AddStudent from './components/AddStudent'; // Add Student component
import AddTeacher from './components/AddTeacher'; // Add Teacher component
import AddNotice from './components/AddNotice'; // Add Notice component
import AddCourse from './components/AddCourse'; // Add Course component
import Students from './components/Students'; // Students component
import Teachers from './components/Teachers'; // Teachers component
import Courses from './components/Courses'; // Courses component
import Notices from './components/Notices'; // Notices component

function App() {
  return (
    <Router>
      <div className="app">
        {/* Sidebar Component */}
        <Sidebar />

        {/* Main Content */}
        <div className="main-content">
          {/* Header Component */}
          <Header />

          {/* Main Container for Routes */}
          <div className="container">
            <Routes>
              {/* Dashboard Route */}
              <Route path="/" element={<Dashboard />} />

              {/* Add Components */}
              <Route path="/add-student" element={<AddStudent />} />
              <Route path="/add-teacher" element={<AddTeacher />} />
              <Route path="/add-notice" element={<AddNotice />} />
              <Route path="/add-course" element={<AddCourse />} />

              {/* View Components */}
              <Route path="/students" element={<Students />} />
              <Route path="/teachers" element={<Teachers />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/notices" element={<Notices />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import { FaHome, FaBook, FaCalendarAlt, FaBell, FaUser, FaAddressBook, FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const T_Sidebar = () => {
    const [activeItem, setActiveItem] = useState('Dashboard');

    const menuItems = [
        { name: 'Dashboard', path:'/teacher' ,icon: <FaHome /> },
        { name: 'Add Schedule', path:'/postschedule', icon: <FaCalendarAlt /> },
        { name: 'Schedule Details', path:'/schedule', icon: <FaAddressBook /> },
        { name: 'Add Assignments',path:'/postassign', icon: <FaBookOpen /> },
        { name: 'Assignment Details',path:'/assignment', icon: <FaBook /> },
        { name: 'Profile',path:'/t-profile', icon: <FaUser /> },
        { name: 'Notifications', path:'/notices' ,icon: <FaBell /> },
        { name: 'Post Attendance',path:`/t-attendance`, icon: <FaCalendarAlt /> },
        { name: 'Attendance Details',path:`/t-atdetails`, icon: <FaBook /> },
    ];

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <div className="sidebar">
            <div className="admin-header">
                <img src="academy-logo.jpg" alt="Admin" />
                <h2>CCA</h2>
            </div>
            <ul className="sidebar-menu">
                {menuItems.map((item) => (
                    <li key={item.name} className={`menu-item ${activeItem === item.name ? 'active' : ''}`} onClick={() => handleItemClick(item.name)}>
                        <Link to={item.path} >
                            <span className="menu-icon">{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default T_Sidebar;


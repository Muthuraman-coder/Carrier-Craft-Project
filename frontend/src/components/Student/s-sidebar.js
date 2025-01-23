import React, { useState } from 'react';
import { FaHome, FaBook, FaCalendarAlt, FaBell, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const S_Sidebar = () => {
    const [activeItem, setActiveItem] = useState('Dashboard');

    const menuItems = [
        { name: 'Dashboard', path:'/student' ,icon: <FaHome /> },
        { name: 'Schedule', path:'/schedule', icon: <FaCalendarAlt /> },
        { name: 'Assignments',path:'/assignment', icon: <FaBook /> },
        { name: 'Profile',path:'/s-profile', icon: <FaUser /> },
        { name: 'Notifications', path:'/notices' ,icon: <FaBell /> },
        { name: 'Attendance',path:'/s-attendance', icon: <FaCalendarAlt /> },
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

export default S_Sidebar;


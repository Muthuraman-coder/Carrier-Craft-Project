import { Link, useLocation } from 'react-router-dom';
import { AiOutlineHome, AiOutlineAppstoreAdd, AiOutlineForm, AiOutlineBook, AiOutlineFileText } from 'react-icons/ai';
import { FaUserGraduate } from 'react-icons/fa';

const A_Sidebar = () => {
    const location = useLocation();

    const adminMenu = [
        { name: 'Dashboard', path: '/admin', icon: <AiOutlineHome /> },
        { name: 'New Register', path: '/signup', icon: <FaUserGraduate /> },
        { name: 'Students Details', path: '/students', icon: <AiOutlineAppstoreAdd /> },
        { name: 'Enquires', path: '/enquires', icon: <AiOutlineForm /> },
        { name: 'Teachers Details', path: '/teachers', icon: <AiOutlineAppstoreAdd /> },
        { name: 'Add Course', path: '/add-course', icon: <AiOutlineBook /> },
        { name: 'Courses Details', path: '/courses', icon: <AiOutlineAppstoreAdd /> },
        { name: 'Add Notice', path: '/add-notice', icon: <AiOutlineFileText /> },
        { name: 'Notices Details', path: '/notices', icon: <AiOutlineAppstoreAdd /> },
        { name: 'Attendance Summary', path: '/allattendance', icon: <AiOutlineFileText /> },
        { name: 'Daily Attendance', path: '/dailyattendance', icon: <AiOutlineFileText /> },
    ];

    return (
        <div className="sidebar">
            <div className="admin-header">
                <img src="academy-logo.jpg" alt="Admin" />
                <h2>CCA</h2>
            </div>
            <ul className="sidebar-menu">
                {adminMenu.map((item) => (
                    <li key={item.name} className={`menu-item ${location.pathname === item.path ? 'active' : ''}`} >
                        <Link to={item.path} className="menu-link">
                            <span className="menu-icon">{item.icon}</span>
                            <span>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default A_Sidebar;

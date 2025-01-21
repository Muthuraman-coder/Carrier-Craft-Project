import React, { useState, useEffect } from 'react';
import A_Sidebar from './Admin/a-sidebar';
import S_Sidebar from './Student/s-sidebar';
import T_Sidebar from './Teacher/t-sidebar';

function Sidebar() {

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('role');
    setUserRole(role);
  }, []);

  return (
    <div className="sidebar">
      <ul>
        {userRole === 'admin' && (
          <>
           < A_Sidebar />
          </>
        )}

        {(userRole === 'student') && (
          <>
           <S_Sidebar />
          </>
        )}

        {(userRole === 'teacher') && (
          <>
            <T_Sidebar />
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;

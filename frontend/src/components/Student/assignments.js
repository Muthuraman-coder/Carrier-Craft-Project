import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Assignments() {
    const [assignments, setAssignments] = useState([]);
    const [userRole, setUserRole] = useState(null);
    const [studentId, setStudentId] = useState(null); 

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        const id = localStorage.getItem('studentId');  
        setUserRole(role);
        setStudentId(id);
        const fetchAssignments = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/assignments', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setAssignments(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching assignments', error);
            }
        };
        fetchAssignments();
    }, []);

    const handleDelete = (id) => {
        const token = localStorage.getItem('token');
        axios
            .delete(`http://localhost:3001/api/assignments/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                setAssignments(assignments.filter((a) => a._id !== id));
                alert('Deleted successfully');
            })
            .catch((error) => {
                console.error('Error deleting assignment:', error);
            });
    };

    return (
        <div>
            <h2>Assignments</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Due Date</th>
                        <th>Course</th>
                        {userRole === 'teacher' ? <th>Submitted Students</th> : <th>Assigned By</th>}
                        {userRole === 'teacher' ? <th>Remove</th> : <th>Submit Assignment</th>}
                        {userRole === 'student' && <th>Mark</th>}
                    </tr>
                </thead>
                <tbody>
                    {assignments.map((assignment) => (
                        <tr key={assignment._id}>
                            <td>{assignment.title}</td>
                            <td>{new Date(assignment.dueDate).toLocaleDateString()}</td>
                            <td>{assignment.course?.name}</td>
                            {userRole === 'teacher' ? (
                                <td style={{ color: 'blue' }}>
                                    <Link to={`/assignment/${assignment._id}`}>View Details</Link>
                                </td>
                            ) : (
                                <td>{assignment.assignedBy?.name}</td>
                            )}
                            {userRole === 'teacher' && (
                                <td>
                                    <button onClick={() => handleDelete(assignment._id)}>Delete</button>
                                </td>
                            )}
                            {userRole === 'student' && (
                                <td>
                                {assignment.submissions.some((submission) => submission.studentId === studentId) ? (
                                    assignment.submissions
                                        .filter((submission) => submission.studentId === studentId)
                                        .map((s, index) => (
                                            <div key={index}>{s.setfile ? 'Already submitted' : <Link to={`/assignment/${assignment._id}/summit`}><button>Submit</button></Link>}</div>
                                        ))
                                ) : (
                                    <Link to={`/assignment/${assignment._id}/summit`}><button>Submit</button></Link>
                                )}
                            </td>
                            )}
                            {userRole === 'student' && (
                                <td>
                                    {assignment.submissions.length > 0 ? (
                                        assignment.submissions
                                            .filter((submission) => submission.studentId === studentId)
                                            .map((s, index) => (
                                                <div key={index}>{s.grade ? s.grade : 'grade pending!'}</div>
                                            ))
                                    ) : (
                                        'No Submissions Yet'
                                    )}
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


export default Assignments;

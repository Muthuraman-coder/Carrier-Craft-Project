import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Assignments() {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchAssignments = async ( ) => {
            try {
                const response = await axios.get('http://localhost:3001/api/assignments'); 
                setAssignments(response.data);
            } catch (error) {
                console.error('Error fetching assignments', error);
            }
        };
        fetchAssignments();
    }, []);

    return (
        <div>
            <h2>Assignments</h2>
            <div>
                {assignments.map((assignment) => (
                    <div key={assignment._id}>
                        <h3>{assignment.title}</h3>
                        <p>{assignment.description}</p>
                        <p><strong>Due Date:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>
                        <p><strong>Course:</strong> {assignment.course?.name}</p>
                        <p><strong>Assigned By:</strong> {assignment.assignedBy?.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Assignments;

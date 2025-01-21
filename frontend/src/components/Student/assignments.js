import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Assignments() {
    const { id } = useParams();
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchAssignments = async ( ) => {
            try {
                const response = await axios.get(`http://localhost:3001/api/assignments/student/${id}`); 
                setAssignments(response.data);
            } catch (error) {
                console.error('Error fetching assignments', error);
            }
        };
        fetchAssignments();
    }, [id]);

    return (
        <div>
            <h2>Assignments</h2>
            {assignments.length === 0 ? (
                <p>No assignments found.</p>
            ) : (
                <ul>
                    {assignments.map((assignment) => (
                        <li key={assignment._id}>
                            <h3>{assignment.title}</h3>
                            <p>{assignment.description}</p>
                            <p>Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Assignments;

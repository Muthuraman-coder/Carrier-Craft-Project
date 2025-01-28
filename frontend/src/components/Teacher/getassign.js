import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AssignmentDetails = () => {
    const { id } = useParams(); 
    const [assignment, setAssignment] = useState(null);
    const [error, setError] = useState(null);
    const [grade , setgrade] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token')
        const fetchAssignment = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/assignments/${id}`,{headers:{Authorization:`Bearer ${token}`}});
                setAssignment(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : err.message);
            } 
        };

        fetchAssignment();
    }, [id]);

    const handleSubmit = async (submissionId) => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.patch(
            `http://localhost:3001/api/assignments/${id}/submissions/${submissionId}`,
            { grade },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          alert('Grade submitted successfully');
          console.log(response.data);
        } catch (error) {
          console.error('Error updating grade:', error);
          alert('Failed to update grade');
        }
      };

    const handledelete = async (submissionId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.delete(`http://localhost:3001/api/assignments/${id}/submissions/${submissionId}`,{ headers: { Authorization: `Bearer ${token}` } });
            setAssignment((pA) => ({...pA, submissions: pA.submissions.filter((submission) => submission._id !== submissionId),
            }));
            alert('Submission deleted successfully');
        } catch (error) {
            console.error('Error deleting submission:', error);
            alert('Failed to delete submission');
        }
    };
    
    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!assignment) {
        return <p>Assignment not found</p>;
    }

    return (
        <div>
            <h1>Assignment Details</h1>
            <table>
                <tbody>
                <tr>
                    <td><strong>Assignment Title:</strong></td>
                    <td>{assignment.title}</td>
                </tr>
                <tr>
                    <td><strong>Course:</strong></td>
                    <td>{assignment.course.name}</td>
                </tr>
                <tr>
                    <td><strong>Assigned By:</strong></td>
                    <td>
                    {assignment.assignedBy.name || ''} ({assignment.assignedBy.email || ''})
                    </td>
                </tr>
                </tbody>
            </table>

            <h2>Submitted Students</h2>
            {assignment.submissions.length === 0 ? (
                <p>No submissions yet.</p>
            ) : (
                <table>
                <thead>
                    <tr>
                    <th>Student</th>
                    <th>Submitted At</th>
                    <th>File</th>
                    <th>Mark</th>
                    <th>Summit Mark</th>
                    <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {assignment.submissions.map((submission, index) => (
                    <tr key={index}>
                        <td>
                        {(submission.studentId?.name || '')} ({submission.studentId?.email || ''})
                        </td>
                        <td>{submission.submittedAt ? new Date(submission.submittedAt).toLocaleString() : ''}</td>
                        <td>
                        {submission.setfile && (
                            <a
                            href={`http://localhost:3001${submission.setfile}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{color:'blue'}}
                            >
                            Download File
                            </a>
                        )}
                        </td>
                        {submission.grade ? (
                            <td>{submission.grade}</td>
                        ) :<td><input type='number' name='grade' placeholder={submission.grade || 'Enter grade'} onChange={(e)=>setgrade(e.target.value)} /></td> }
                        {submission.grade ? <td>Submitted</td>:<td><button onClick={()=>handleSubmit(submission._id)}>Summit</button></td>}
                        <td><button onClick={()=>handledelete(submission._id)}>Delete</button></td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
        </div>

    );
};

export default AssignmentDetails;

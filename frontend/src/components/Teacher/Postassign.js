import React, { useState } from 'react';
import axios from 'axios';

function PostAssignment() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [course, setCourse] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/assignments', {
                title,
                description,
                course,
                dueDate,
            });
            console.log(response)
            setMessage('Assignment posted successfully!');
        } catch (error) {
            console.error('Error posting assignment:', error);
            setMessage('Failed to post assignment.');
        }
    };

    return (
        <div>
            <h2>Post New Assignment</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Course</label>
                    <input
                        type="text"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Due Date</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Post Assignment</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default PostAssignment;

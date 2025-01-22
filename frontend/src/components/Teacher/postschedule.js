import React, { useState } from 'react';
import axios from 'axios';

function PostSchedule() {
    const [schedule, setschedule] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/api/schedule', { schedule, date, time, location, description,});
            console.log(response.data)
            alert('succesfully added')
            setMessage('Schedule posted successfully!');
        } catch (error) {
            console.error('Error posting schedule:', error);
            setMessage('Failed to post schedule.');
        }
    };

    return (
        <div>
            <h2>Post New Schedule</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Schedule for</label>
                    <input type="text" value={schedule} onChange={(e) => setschedule(e.target.value)} required />
                </div>
                <div>
                    <label>Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <div>
                    <label>Time</label>
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
                </div>
                <div>
                    <label>Location</label>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
                <div>
                    <label>Description</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type="submit">Post Schedule</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default PostSchedule;

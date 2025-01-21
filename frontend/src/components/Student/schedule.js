import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Schedule() {
    const { id } = useParams();
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/schedule/student/${id}`);
                setSchedule(response.data);
            } catch (error) {
                console.error('Error fetching schedule', error);
            }
        };
        fetchSchedule();
    }, [id]);

    return (
        <div>
            <h2>Schedule</h2>
            {schedule.length === 0 ? (
                <p>No upcoming classes.</p>
            ) : (
                <ul>
                    {schedule.map((entry) => (
                        <li key={entry._id}>
                            <h3>{new Date(entry.date).toLocaleDateString()} - {entry.time}</h3>
                            <p>{entry.location}</p>
                            <p>{entry.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Schedule;

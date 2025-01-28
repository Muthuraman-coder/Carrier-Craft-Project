import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function Schedule() {
    const { id } = useParams();
    const [schedule, setSchedule] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token){
            alert('token in not found')
        }
        const fetchSchedule = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/schedule` , {headers:{Authorization:`Bearer ${token}`}});
                setSchedule(response.data);
            } catch (error) {
                console.error('Error fetching schedule', error);
            }
        };
        fetchSchedule();
    }, [id]);

    return (
        <div>
            <h2>Schedules</h2>
            {schedule.length === 0 ? (
                <p>No upcoming schedules.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Location</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                        <tbody>
                            {schedule.map((entry) => (
                                <tr key={entry._id}>
                                    <td>{entry.schedule}</td>
                                    <td>{new Date(entry.date).toLocaleDateString()}</td>
                                    <td>{entry.time}</td>
                                    <td>{entry.location}</td>
                                    <td>{entry.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
        </div>

    );
}

export default Schedule;

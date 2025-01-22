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
            <h2>Schedule</h2>
            {schedule.length === 0 ? (
                <p>No upcoming schedules.</p>
            ) : (
                <ul>
                    {schedule.map((entry) => (
                        <li key={entry._id}>
                            <h1>{entry.schedule}</h1>
                            <h3>DATE :{new Date(entry.date).toLocaleDateString()}</h3>
                            <h3>TIME :{entry.time}</h3>
                            <p>LOCATION :{entry.location}</p>
                            <p>DESCRIPTION :{entry.description}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Schedule;

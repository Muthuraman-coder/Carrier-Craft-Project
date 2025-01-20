import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Enquires = () => {
    const [ enquires , setenquires ] = useState([]);
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/enquires'); 
                setenquires(res.data); 
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Failed to fetch data.');
            }
        };

        fetchData();
    }, []);

    const handledelete = (id) =>{
        axios.delete(`http://localhost:3001/api/enquires/${id}`)
        setenquires(enquires.filter((e) => e._id !== id))
        alert('deleted successfully')
    }
    
    return (
        <div >
            <h2>Enquires List</h2>
            <p style={{ color: 'red' }}>{error}</p>
            <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>number</th>
                    <th>Email</th>
                    <th>course</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {enquires.map((e) => (
                 <tr key={e._id}>
                    <td>{e.name}</td>
                    <td>{e.number}</td>
                    <td>{e.email}</td>
                    <td>{e.course}</td>
                    <td><button onClick={() => handledelete(e._id)}>delete</button></td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      );
    }
 
export default Enquires;
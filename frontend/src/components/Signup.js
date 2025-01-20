import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'admin',
        grade: '',
        age: '',
    });
    const [profilePicture, setProfilePicture] = useState(null);
    const [course, setCourse] = useState([]); 
    const [selectedCourse, setSelectedCourse] = useState(''); 
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCourse = (e) => {
        setSelectedCourse(e.target.value); 
    };

    const handleFile = (e) => {
        setProfilePicture(e.target.files[0]);
    };

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/courses');
                setCourse(res.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            Object.keys(formData).forEach((key) => {
                data.append(key, formData[key]);
            });

            if (profilePicture) {
                data.append('profilePicture', profilePicture);
            }

            if (selectedCourse) {
                data.append('course', selectedCourse); 
            }

            console.log([...data]);
            const response = await axios.post('http://localhost:3001/api/signup', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log(response.data);
            setSuccess('Register successful! Redirecting...');
            if (formData.role === 'student') {
                setTimeout(() => navigate('/students'), 1000);
            } else if (formData.role === 'teacher') {
                setTimeout(() => navigate('/teachers'), 2000);
            }
        } catch (err) {
            console.error('Error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <div className="register">
            <h2>Registration Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Role:</label>
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                {formData.role === 'teacher' && (
                    <div>
                        <label>Course:</label>
                        <select name="course" value={selectedCourse} onChange={handleCourse}>
                            <option value="">Select a course</option>
                            {Array.isArray(course) && course.map((course) => (
                                <option key={course._id} value={course._id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
                        <label>Profile Picture:</label>
                        <input type="file" onChange={handleFile} />
                    </div>
                )}
                {formData.role === 'student' && (
                    <div>
                        <label>Course:</label>
                        <select name="course" value={selectedCourse} onChange={handleCourse}>
                            <option value="">Select a course</option>
                            {Array.isArray(course) && course.map((course) => (
                                <option key={course._id} value={course._id}>
                                    {course.name}
                                </option>
                            ))}
                        </select>
                        <label>CGPA:</label>
                        <input
                            type="text"
                            name="grade"
                            value={formData.grade}
                            onChange={handleChange}
                            required
                        />
                        <label>Age:</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                        <label>Profile Picture:</label>
                        <input type="file" onChange={handleFile} />
                    </div>
                )}
                <button type="submit">Register</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default Signup;

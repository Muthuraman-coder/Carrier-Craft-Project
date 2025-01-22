import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostAssignment = () => {
    const [courses, setCourses] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        course: '',
        dueDate: '',
        assignedBy: '',
    });

    useEffect(() => {

        const fetchCoursesAndTeachers = async () => {
            try {
                const [coursesResponse, teachersResponse] = await Promise.all([
                    axios.get('http://localhost:3001/api/courses'),
                    axios.get('http://localhost:3001/api/teachers'),
                ]);
                setCourses(coursesResponse.data);
                setTeachers(teachersResponse.data);
            } catch (error) {
                console.error('Error fetching courses and teachers:', error);
            }
        };

        fetchCoursesAndTeachers();
    }, []);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3001/api/assignments', formData);
            setFormData({ title: '', description: '', course: '', dueDate: '', assignedBy: '' });
        } catch (error) {
            console.error('Error creating assignment:', error);
        }
    };

    return (
        <div>
            <h1>Assignments</h1>
            
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleInputChange}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleInputChange}
                ></textarea>
                <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                >
                    <option value="">Select Course</option>
                    {courses.map((course) => (
                        <option key={course._id} value={course._id}>{course.name}</option>
                    ))}
                </select>
                <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleInputChange}
                />
                <select
                    name="assignedBy"
                    value={formData.assignedBy}
                    onChange={handleInputChange}
                >
                    <option value="">Select Teacher</option>
                    {teachers.map((teacher) => (
                        <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                    ))}
                </select>
                <button type="submit">Create Assignment</button>
            </form>
        </div>
    );
};

export default PostAssignment;
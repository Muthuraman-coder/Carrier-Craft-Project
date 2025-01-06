const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');

const app = express();

app.use(cors({
    origin:'*',
    credentials:true,
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

const mdb = 'mongodb+srv://chatgpt230:123456sS@ramdatabase1.x85e3.mongodb.net/?retryWrites=true&w=majority&appName=Ramdatabase1'
mongoose.connect(mdb) 
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    grade: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String },
    course : { type: String, required: true },
    attendance: [{ date: { type: Date, required: true }, status: { type: String, required: true } }],
});

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String },
});

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

const noticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const checkschema = new mongoose.Schema({
    name:{ type : String, required:true}
})

const check = mongoose.model('check' , checkschema);
const Student = mongoose.model('Student', studentSchema);
const Teacher = mongoose.model('Teacher', teacherSchema);
const Course = mongoose.model('Course', courseSchema);
const Notice = mongoose.model('Notice', noticeSchema);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

//check
app.get('/api/check' , async (req , res ) => {
    const checks = await check.find()
    res.json(checks)
})

app.post('/api/check' , async (req ,res) =>{
    const checkdata = req.body
    const newcheck = new check(checkdata);
    const savecheck = await newcheck.save()
    res.json(savecheck)
})

// Students
app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find()
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/students/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
        res.json(student);
    } catch (err) {
        res.status(404).json({ error: 'Student not found' });
    }
});

app.post('/api/students/:id/attendance', async (req, res) => {
    try {
        const { date, status } = req.body;
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        student.attendance.push({ date, status });
        await student.save();

        res.json({ message: 'Attendance updated successfully', student });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/students/:id' , async (req , res) =>{
    try{
        const  {id}  = req.params
        await Student.findByIdAndDelete(id)
            .then(result =>{
                res.status(200).json(result)
                console.log('deleted items:' , result)
            })
    }catch(error){
        res.json(error)
        console.log('error is here :', error)
    }
})

app.post('/api/students', upload.single('profilePicture'), async (req, res) => {
    try {
        const studentData = req.body;
        if (req.file) studentData.profilePicture = `/uploads/${req.file.filename}`;
        const newStudent = new Student(studentData);
        const savedStudent = await newStudent.save();
        res.json(savedStudent);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Teachers
app.get('/api/teachers', async (req, res) => {
    try {
        const teachers = await Teacher.find()
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/api/teachers/:id', async (req, res) => {
    try {
        const teacher = await Teacher.findById(req.params.id)
        res.json(teacher);
    } catch (err) {
        res.status(404).json({ error: 'Teacher not found' });
    }
});

app.delete('/api/teachers/:id' , async (req , res) =>{
    try{
        const  {id}  = req.params
        await Teacher.findByIdAndDelete(id)
            .then(result =>{
                res.status(200).json(result)
                console.log('deleted items:' , result)
            })
    }catch(error){
        res.json(error)
        console.log('error is here :', error)
    }
})

app.post('/api/teachers', upload.single('profilePicture'), async (req, res) => {
    try {
        const teacherData = req.body;
        if (req.file) teacherData.profilePicture = `/uploads/${req.file.filename}`;
        const newTeacher = new Teacher(teacherData);
        const savedTeacher = await newTeacher.save();
        res.json(savedTeacher);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Courses
app.get('/api/courses', async (req, res) => {
    try {
        const courses = await Course.find()
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/courses/:id' , async (req , res) =>{
    try{
        const  {id}  = req.params
        await Course.findByIdAndDelete(id)
            .then(result =>{
                res.status(200).json(result)
                console.log('deleted items:' , result)
            })
    }catch(error){
        res.json(error)
        console.log('error is here :', error)
    }
})

app.post('/api/courses', async (req, res) => {
    try {
        const courseData = req.body;
        const newCourse = new Course(courseData);
        const savedCourse = await newCourse.save();
        res.json(savedCourse);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Notices
app.get('/api/notices', async (req, res) => {
    try {
        const notices = await Notice.find().sort({ date: -1 });
        res.json(notices);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/api/notices/:id' , async (req , res) =>{
    try{
        const  {id}  = req.params
        await Notice.findByIdAndDelete(id)
            .then(result =>{
                res.status(200).json(result)
                console.log('deleted items:' , result)
            })
    }catch(error){
        res.json(error)
        console.log('error is here :', error)
    }
})

app.post('/api/notices', async (req, res) => {
    try {
        const newNotice = new Notice(req.body);
        const savedNotice = await newNotice.save();
        res.json(savedNotice);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


const frontendPath = path.join(__dirname, 'frontend', 'public');
app.use(express.static(frontendPath));
app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(3001, () => console.log(`Server running on port 3001`));
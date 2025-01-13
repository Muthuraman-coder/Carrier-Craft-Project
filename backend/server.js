const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const secret = 'secret-muthu';


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
    password: { type: String, required: true },
    profilePicture: { type: String },
    course: { type: String, required: true },
    attendance: [{ date: { type: Date, required: true }, status: { type: String, required: true } }],
    role: { type: String, default: "student" }
});
    

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    role: { type: String, default: "teacher" } 
});

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" }
});

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
},{timeStamp:true});

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
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);
const Notice = mongoose.model('Notice', noticeSchema);

//middleware authentication
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid Token' });
        req.user = user;
        next();
    });
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Permission Denied' });
        }
        next();
    };
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

//signup

app.post('/api/signup', upload.single('profilePicture') , async (req, res) => {
    try {
        const { name, email, password, role, subject ,course , grade , age } = req.body;
        
        if (role === 'teacher' && !subject) {
            return res.status(400).json({ message: 'Subject is required for teachers' });
        }

        if (role === 'student' && (!course || !grade || !age)) {
            return res.status(400).json({ message: 'All student fields are required' });
        }        

        const hashedPassword = await bcrypt.hash(password, 10);
        
        let profilePicture = null
        if(req.file){
            profilePicture = `/uploads/${req.file.filename}`
        }

        let newUser;
        if (role === 'admin') {
            newUser = new Admin({ name, email, password: hashedPassword });
        } else if (role === 'teacher') {
            newUser = new Teacher({ name, email, password: hashedPassword, subject , profilePicture});
        } else {
            newUser = new Student({ name, email, password: hashedPassword , course , grade , age , profilePicture});
        }

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//signin
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await Admin.findOne({ email }) || 
                     await Teacher.findOne({ email }) || 
                     await Student.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, secret, { expiresIn: '99 years' });
        res.json({ token, role: user.role });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//user details 
app.get('/api/user', authenticateToken, async (req, res) => {
    try {
      const { id, role } = req.user;
  
      let user;
      if (role === 'admin') {
        user = await Admin.findById(id).select('name profilePicture');
      } else if (role === 'teacher') {
        user = await Teacher.findById(id).select('name profilePicture');
      } else if (role === 'student') {
        user = await Student.findById(id).select('name profilePicture');
      }
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
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

//middleware users
app.get('/api/admin/dashboard', authenticateToken, authorizeRoles('admin'), (req, res) => {
    res.json({ message: 'Welcome Admin!' });
});

app.get('/api/teacher/dashboard', authenticateToken, authorizeRoles('teacher'), (req, res) => {
    res.json({ message: 'Welcome Teacher!' });
});

app.get('/api/student/dashboard', authenticateToken, authorizeRoles('student'), (req, res) => {
    res.json({ message: 'Welcome Student!' });
});

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

app.get('/api/courses/:id', async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.json(course);
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
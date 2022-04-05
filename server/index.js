const dotenv = require("dotenv");
dotenv.config();

const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");



app.use(cors());

let mongooseConnected;

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB connection successful");
        mongooseConnected = 'Mongoose is connected!';
    }
        )
    .catch((err) => {
        mongooseConnected = 'Mongoose is not connected';
        console.log("DATABASE CONNECTION ERROR: ", err);
    });

const db = mongoose.connection.useDb('yamaha');

app.use(express.json());


app.get('/', (req, res) => {
    res.send(`Backend Server Connected. ${mongooseConnected}`);
});



const teacherSchema = new mongoose.Schema(
    {   name: String, 
        classes: Array,
        days: Array, 
        instruments: Array 
    }
);


const pupilSchema = new mongoose.Schema(
    {   
        firstName: {
            type: String,
            required: true
        }, 
        lastName: {
            type: String,
            required: true
        },
        classes: Array
    }
);


const lessonSchema = new mongoose.Schema(
    {  
        day: {
            type: String,
            required: true
        },
        timeAsMinutesPastMidnight: {
            type: Number,
            required: true
        },
        lessonLengthInMinutes: {
            type: Number,
            required: true
        },
        teacher: {
            type: mongoose.ObjectId,
            required: true
        },
        pupils: Array,
        instrument: String,
        type: String,
        attendance: Array
    }
);

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        ages: {
            type: String,
            required: true
        }
    }
);

const instrumentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        courses: {
            type: Array,
            required: true
        }
    }
);

const newClassSchema = new mongoose.Schema(
    {
        course: {
            type: mongoose.ObjectId,
            required: true
        },
        teacher: {
            type: mongoose.ObjectId,
            required: true
        },
        day: {
            type: String,
            required: true
        },
        time: {
            type: Number,
            required: true
        },
        pupils: {
            type: Array
        },
        startDate: {
            type: Date,
            required: true
        }
    }
)

const Teacher = db.model('Teacher', teacherSchema);
const Pupil = db.model('Pupil', pupilSchema);
const Lesson = db.model('Lesson', lessonSchema);
const Course = db.model('Course', courseSchema);
const Instrument = db.model('Instrument', instrumentSchema);
const NewClass = db.model('NewClass', newClassSchema);

app.get('/teachers', async (req, res) => {
    try {
        const result = await Teacher.find({});
        res.send(result);
    } catch (e) {
        console.error(e);
    }
});

app.post('/create/teacher', async (req, res) => {
    try {
        const result = await Teacher.create(req.body);
        res.send(result);
    } catch (e) {
        console.error(e);
    }
});

app.post('/update/teacher', async (req, res) => {
    try {
        const result = await Teacher.findByIdAndUpdate(req.body.data._id, req.body.data, {new: true});
        res.send(result);
    } catch (e) {
        console.error(e);
    }
});

app.delete('/delete/teacher', async (req, res) => {
    try {
        const result = await Teacher.deleteMany(req.body);
        if(result.deletedCount) {
            result._id = req.body._id;
            res.send(result);
        }    } catch (e) {
        console.error(e);
    }
});


// PUPILS --------------------------------------------------------

app.get('/pupils', async (req, res) => {
    try {
        const result = await Pupil.find({});
        res.send(result);
    } catch (e) {
        console.error(e);
    }
});


// LESSONS -------------------------------------------------------

app.get('/lessons', async (req, res) => {
    try {
        const result = await Lesson.find({});
        res.send(result);
    } catch (e) {
        console.error(e);
    }
});

app.post('/lessons/update', async (req, res) => {
    try {
        const result = await Lesson.findByIdAndUpdate(req.body.data._id, req.body.data, {new: true});
        res.send(result);
    } catch (e) {
        console.error(e);
    }
});

// COURSES ----------------------------------------------------------------------

app.get('/courses', async (req, res) => {
    try {
        const result = await Course.find({});
        res.send(result);
    } catch (e) {
        console.error(e);
    }
});

app.post('/courses/create', async (req, res) => {
    try {
        const result = await Course.create(req.body);
        res.send(result);
    } catch (e) {
        console.error(e);
    }
});

app.post('/courses/update', async (req, res) => {
    try {
        const result = await Course.findByIdAndUpdate(req.body.data._id, req.body.data, {new: true});
        res.send(result);
    } catch (e) {
        console.error(e);
    }
});

app.delete('/courses/delete', async (req, res) => {
    try {
        const result = await Course.deleteMany(req.body);
        if(result.deletedCount) {
            result._id = req.body._id;
            res.send(result);
        }    } catch (e) {
        console.error(e);
    }
});

// INSTRUMENTS -------------------------------------------------------------------

app.get('/instruments', async (req, res) => {
    try {
        const result = await Instrument.find({});
        res.send(result);
    } catch (e) {
        console.error(e);
    }
});

app.post('/instruments/create', async (req, res) => {
    try {
        const result = await Instrument.create(req.body);
        res.send(result);
    } catch (e) {
        console.error(e);
    }
});

app.post('/instruments/update', async (req, res) => {
    try {
        const result = await Instrument.findByIdAndUpdate(req.body.data._id, req.body.data, {new: true});
        res.send(result);
    } catch (e) {
        console.error(e);
    }
});

app.delete('/instruments/delete', async (req, res) => {
    try {
        const result = await Instrument.deleteMany(req.body);
        if(result.deletedCount) {
            result._id = req.body._id;
            res.send(result);
        }
    } catch (e) {
        console.error(e);
    }
});

// newClasses ----------------------------------------------------------------------------

app.get('/newclasses', async (req, res) => {
    try {
        const result = await NewClass.find({});
        res.send(result);
    } catch (e) {
        console.error(e);
    }
});

app.post('/newclasses/create', async (req, res) => {
    try {
        const result = await NewClass.create(req.body);
        res.send(result);
    } catch (e) {
        console.error(e);
    }
});



app.listen(process.env.PORT || 8000, () => {
    console.log("Backend server is running!");
});
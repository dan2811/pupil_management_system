import mongoose from "mongoose";


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
)

export const lesson = mongoose.model('Lesson', lessonSchema);
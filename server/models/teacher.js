import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
    {   name: {
            type: String,
            required: true,
            unique: true
        }, 
        lessons: Array,
        days: Array, 
        instruments: Array 
    }
);

export const Teacher = mongoose.model('Teacher', teacherSchema);
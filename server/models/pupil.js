import mongoose from "mongoose";

const pupilSchema = new mongoose.Schema(
    {   firstName: {
            type: String,
            required: true
        }, 
        lastName: {
            type: String,
            required: true
        },
        lessons: Array
    }
);

export const pupil = mongoose.model('Pupil', pupilSchema);
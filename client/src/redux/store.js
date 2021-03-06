import { configureStore } from "@reduxjs/toolkit";
import teacherReducer from './teacherSlice';
import lessonReducer from './lessonSlice';
import courseReducer from './courseSlice';
import instrumentReducer from './instrumentSlice';
import pupilReducer from './pupilSlice';

export default configureStore({
    reducer: {
        teachers: teacherReducer,
        lessons: lessonReducer,
        courses: courseReducer,
        instruments: instrumentReducer,
        pupils: pupilReducer
    },
});
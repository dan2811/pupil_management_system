import Register from './Pages/register';
import Diary from './Pages/diary';
import Home from './Pages/home';
import Database from './Pages/database';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Tasters from './Pages/tasters';
import AdminControls from './Pages/adminControls';
import NewClasses from './Pages/newClasses';
import { getTeachers } from './redux/teacherSlice';
import { getLessons } from './redux/lessonSlice';
import { getCourses } from './redux/courseSlice';
import { getInstruments } from './redux/instrumentSlice';
import { getPupils } from './redux/pupilSlice';


function App() {
  
  const dispatch = useDispatch();
  useEffect( () => {
    const main = async () => {
        dispatch(getTeachers());
        dispatch(getLessons());
        dispatch(getCourses());
        dispatch(getInstruments());
        dispatch(getPupils());
    }
    return main();
},[]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/newclasses' element={<NewClasses />} />
        <Route path='/admincontrols' element={<AdminControls />} />
        <Route path='/database' element={<Database />} />
        <Route path='/tasters' element={<Tasters />} />
        <Route path='/register' element={<Register />} />
        <Route path='/diary' element={<Diary />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

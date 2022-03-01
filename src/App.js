import Register from './Pages/register';
import Diary from './Pages/diary';
import Home from './Pages/home';
import Database from './Pages/database';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Tasters from './Pages/tasters';


function App() {
  return (
    <BrowserRouter>
      <Routes>
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

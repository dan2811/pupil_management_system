import React from 'react';
import Navbar from '../Components/navbar';

const Home = () => {
  return (
    <div>
        <Navbar title={window.location.href}/>
    </div>
  )
}

export default Home
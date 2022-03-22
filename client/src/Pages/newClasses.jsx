import React from 'react';
import styled from 'styled-components';
import Navbar from '../Components/navbar';
import CreateNewClass from '../Components/createNewClass';

const Wrapper = styled.div`

`;

const NewClasses = () => {
  return (
    <Wrapper>
        <Navbar />
        <div>
        Plan for this page is to have a table showing the current new classes available. 
        <br />There should be functionality for the following: 
        <br />- Create a new class (assign teacher, day, time, start date and instrument)
        <br />- Add pupils to the class (press a plus button and then select the pupil from a list of pupils from the taster list)
        <br />- Change the start date after it has been set
        <br />- The class should automatically appear on the register at the correct date, because when the date hits, the class will added to the classes collection in the database.
        </div>
        <CreateNewClass />
    </Wrapper>
  )
}

export default NewClasses
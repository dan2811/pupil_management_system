import React from 'react'
import styled from 'styled-components';
import Navbar from '../Components/navbar';
import Table from '../Components/table';
import { data } from '../data';
import SearchBar from '../Components/searchBar';

const Wrapper = styled.div`
`;

const Database = () => {
  const databaseHeaders = [`Time`, `Teacher`, `Instrument`, `Type`, `First Name`, `Last Name`, `Dates`];
  return (
    <Wrapper>
        <Navbar />
        <SearchBar />
        <Table data={data.pupils} headers={databaseHeaders}/>
    </Wrapper>
  )
}

export default Database
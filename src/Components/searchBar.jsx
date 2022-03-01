import React, { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { data } from '../data';

const Wrapper = styled.div`
width: 40vw;
height: 4vh;
position: relative;
z-index: 0;
`;

const TextField = styled.input.attrs({
    type: "text"
    }
)`
    border: none;
    box-shadow: inset 0px 0px 5px black;
    height: 3vh;
    margin: 0.2rem;
    border-radius: 10px;
    outline: none;
    padding-left: 0.5rem;
    width: 10vw;
    &:focus {
        width: 30vw;
    };
`;

const Results = styled.div`
    position: inline-block;
    background-color: #2e2e2e;
    height: ${props =>
        props.height*10}'px';
    width: 30vw;
    text-align: left;
    color: white;
    box-shadow: 5px 5px 5px black;
    overflow-y: scroll;
    overflow-x: scroll;
`;

const ResultList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
`;

const Result = styled.li`
    margin-top: 10px;
    margin-bottom: 10px;
    font-weight: 100;
    &:hover {
        text-shadow: 2px 2px 2px white;
        cursor: pointer;
    }
`;

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const results = data.pupils.filter(pupil => pupil.firstName.toLowerCase().includes(query.toLowerCase()));
    
  return (
    <Wrapper>
            <TextField 
            placeholder={'Search'} 
            onChange={e => setQuery(e.target.value)} />
            {results 
            ? <Results height={results.length}>
                <ResultList>
                {results.map((result, idx) => (
                    <Result key={idx}>
                        {`${result.firstName} ${result.lastName}`}
                    </Result>
                ))}
                </ResultList>
            </Results> 
            : ''}
    </Wrapper>
  )
}

export default SearchBar
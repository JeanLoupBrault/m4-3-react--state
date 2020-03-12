import React from 'react';

import data from '../data';

import Typeahead from './Typeahead';
import GlobalStyles from './GlobalStyles';
import styled from 'styled-components';

function App(props) {
    //const App = () => {
    return (
        <>
            <GlobalStyles />
            <Wrapper>
                <Typeahead
                    suggestions={data.books}
                    handleSelect={(suggestion) => {
                        window.alert(suggestion)
                    }}
                />
            </Wrapper>
        </>
    );
}

const Wrapper = styled.div`
max-width: 800px;
height: 100vh;
display: grid;
place-content: center;
margin: auto;
`;

export default App;

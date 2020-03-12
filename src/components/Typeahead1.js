import React from 'react';
import styled from 'styled-components';

// import { clamp } from '../utils';

import Button from './Button';
// import Suggestion from './Suggestion';






const Typeahead = ({ suggestions, handleSelect }) => {
    const [value, setValue] = React.useState('');

    return (
        <Wrapper>
            <input
                type="text"
                value={value}
                onChange={ev => setValue(ev.target.value)}
                onKeyDown={ev => {
                    if (ev.key === 'Enter') {
                        handleSelect(ev.target.value);
                    }
                }}
            />
            <Button onClick={() => setValue('')}>Clear</Button>
            <ul>
                {suggestions.map(suggestion => {
                    return (
                        <li
                            key={suggestion.id}
                            onClick={() => handleSelect(suggestion.title)}
                        >
                            {suggestion.title}
                        </li>
                    );
                })}
            </ul>

        </Wrapper>
    );
};

const Wrapper = styled.div`
    position: relative;
`;

// const Button = styled.button`
//             font-size: 16px;
//             font-weight: 200;
//             color: #fff;
//             background-color: blue;
//             padding: 8px 15px 8px 15px;
//             border-radius: 3px;
//             margin: 4px;
//         `;

export default Typeahead;
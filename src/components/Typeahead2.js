import React from 'react';
import styled from 'styled-components';

import Button from './Button';

import Suggestion from './Suggestion';


const Typeahead = ({
    suggestions,
    handleSelect,
    categories,
    maxResults = 6
}) => {
    const [value, setValue] = React.useState('');
    const [isVisible, setIsVisible] = React.useState(false);
    const [selectedSuggestionIndex, setSelectedSuggestionIndex] = React.useState(
        0
    );
    let matchedSuggestions = suggestions
        .filter(suggestion => {
            const hasEnteredEnoughCharacters = value.length >= 2;
            const includesValue = suggestion.title
                .toLowerCase()
                .includes(value.toLowerCase());

            return hasEnteredEnoughCharacters && includesValue;
        })
        // We want to limit the results to the first few, based on the
        // `maxResults` prop.
        .slice(0, maxResults);

    const shouldShowSuggestions = matchedSuggestions.length > 0 && isVisible;
    const selectedSuggestion = matchedSuggestions[selectedSuggestionIndex];

    return (
        <Wrapper>
            <input
                type="text"
                value={value}
                onChange={ev => {
                    setValue(ev.target.value);
                }}
                onFocus={() => {
                    setIsVisible(true);
                }}
                onKeyDown={ev => {
                    switch (ev.key) {
                        case 'Enter': {
                            handleSelect(selectedSuggestion);
                            return;
                        }
                        default: {
                            setIsVisible(true);
                            return;
                        }
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
            {shouldShowSuggestions && (
                <Suggestions id="results">
                    {matchedSuggestions.map((suggestion, index) => {
                        const category = [suggestion.categoryId];

                        const isSelected = index === selectedSuggestionIndex;

                        return (
                            <>
                                <Suggestion
                                    key={suggestion.id}
                                    suggestion={suggestion}
                                    category={category}
                                    index={index}
                                    isSelected={isSelected}
                                    searchValue={value}
                                    onMouseEnter={() => {
                                        setSelectedSuggestionIndex(index);
                                    }}
                                    onMouseDown={() => {
                                        handleSelect(suggestion);
                                    }}
                                />
                            </>
                        );
                    })}
                </Suggestions>
            )}
            <ForScreenReaders id="typeahead-instructions">
                When autocomplete results are available use up and down arrows to review
                and enter to select. Touch device users, explore by touch or with swipe
                gestures.
      </ForScreenReaders>
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

const ForScreenReaders = styled.span`
    display: none;
`;

const Suggestions = styled.div`
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    bottom: -10px;
    padding: 10px;
    border-radius: 4px;
    box-shadow: 1px 5px 10px rgba(0, 0, 0, 0.2);
    transform: translateY(100%);
`;


export default Typeahead;
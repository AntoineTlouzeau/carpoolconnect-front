import React from 'react';
import { DebounceInput } from 'react-debounce-input';

const SearchInput = ({ value, onChange, suggestions, handleSuggestionClick, showSuggestions, customStyle, customPlaceholder }) => {
    return (
        <>
            <DebounceInput
                minLength={3}
                debounceTimeout={500}
                type="text"
                className={`${customStyle}`}
                value={value}
                onChange={onChange}
                placeholder={`${customPlaceholder}`}
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute bg-white w-1/4 border border-gray-300 shadow-md z-10">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            className="text-sm py-1.5 px-2.5 cursor-pointer hover:bg-blue-800"
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion.label}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default SearchInput;

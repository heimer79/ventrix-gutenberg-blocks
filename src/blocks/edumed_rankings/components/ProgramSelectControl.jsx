import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useLazyQuery, gql } from '@apollo/client';
import { __ } from '@wordpress/i18n';
import metadata from '../block.json';

// Debounce function to limit the number of calls to the query
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
};

const GET_CATEGORIES = gql`
    query GetSchoolRankingCategories($first: Int!, $after: String, $search: String) {
        schoolRankingCategories(first: $first, after: $after, where: { search: $search }) {
            edges {
                node {
                    id
                    name
                    slug
                }
            }
            pageInfo {
                endCursor
                hasNextPage
            }
        }
    }
`;

export const ProgramSelectControl = ({ value, onChange }) => {
    const [categories, setCategories] = useState([]);
    const [cursor, setCursor] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [loadCategories, { called, loading, error }] = useLazyQuery(GET_CATEGORIES, {
        fetchPolicy: 'cache-and-network',
        onCompleted: data => {
            const newCategories = data.schoolRankingCategories.edges.map(({ node }) => ({
                label: node.name,
                value: node.name, // Using name as the value
            }));
            setCategories(newCategories);

            if (data.schoolRankingCategories.pageInfo.hasNextPage) {
                setCursor(data.schoolRankingCategories.pageInfo.endCursor);
            } else {
                setCursor(null);
            }
        }
    });

    // Memoize the search input handler to avoid unnecessary re-renders
    const handleInputChange = useMemo(
        () =>
            debounce(inputValue => {
                setSearchTerm(inputValue);
                if (inputValue.length > 0) {
                    setShowSuggestions(true);
                    loadCategories({ variables: { first: 20, after: null, search: inputValue } });
                } else {
                    setShowSuggestions(false);
                }
            }, 300), // 300ms debounce delay
        [loadCategories]
    );

    const handleSuggestionClick = useCallback((suggestion) => {
        setSearchTerm(suggestion);
        setShowSuggestions(false);
        onChange(suggestion);
    }, [onChange]);

    const handleInputChangeDirect = useCallback((e) => {
        const inputValue = e.target.value;
        setSearchTerm(inputValue);
        onChange(inputValue);
    }, [onChange]);

    useEffect(() => {
        if (!called && searchTerm.length === 0) {
            loadCategories({ variables: { first: 20, after: cursor, search: '' } });
        }
    }, [called, cursor, loadCategories, searchTerm]);

    if (error) return <p>{__('Error loading categories', metadata.textdomain)}</p>;

    return (
        <div className="program-input-container">
            <input
                type="text"
                value={searchTerm}
                onChange={handleInputChangeDirect} // Direct input change handler for pasting text or typing directly
                onInput={e => handleInputChange(e.target.value)} // Debounced input change for predictive suggestions
                placeholder={__('Select or enter a Program...', metadata.textdomain)}
                className="program-input"
            />
            {showSuggestions && categories.length > 0 && (
                <ul className="suggestions-list">
                    {categories.map((category, index) => (
                        <li
                            key={index}
                            onClick={() => handleSuggestionClick(category.value)}
                            className="suggestion-item"
                        >
                            {category.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

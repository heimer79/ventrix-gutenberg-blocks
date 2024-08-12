import React, { useEffect, useState } from 'react'; // Import React and hooks for state and side effects
import { useLazyQuery, gql } from '@apollo/client'; // Import Apollo Client's hooks and gql template for GraphQL queries
import Select from 'react-select'; // Import the Select component from react-select
import { __ } from '@wordpress/i18n'; // Import the localization function from WordPress
import metadata from '../block.json'; // Import block metadata for textdomain

// Define the GraphQL query with pagination support
const GET_CATEGORIES = gql`
    query GetSchoolRankingCategories($first: Int!, $after: String) {
        schoolRankingCategories(first: $first, after: $after) {
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
    const [categories, setCategories] = useState([]); // Initialize state to hold categories
    const [cursor, setCursor] = useState(null); // Initialize state to manage pagination cursor

    const [loadCategories, { called, loading, error, data, fetchMore }] = useLazyQuery(GET_CATEGORIES, {
        variables: { first: 10, after: cursor }, // Fetch 10 categories per page, using the current cursor
        fetchPolicy: 'network-only', // Ensure fresh data is fetched from the server each time
        onCompleted: data => {
            // Map the fetched categories to a format suitable for react-select
            const options = data.schoolRankingCategories.edges.map(({ node }) => ({
                label: node.name, // The category name displayed in the select dropdown
                value: node.name, // The category slug used as the value for selection
            }));
            setCategories(prevCategories => [...prevCategories, ...options]); // Append new categories to the existing list

            // Check if there are more pages to fetch
            if (data.schoolRankingCategories.pageInfo.hasNextPage) {
                setCursor(data.schoolRankingCategories.pageInfo.endCursor); // Update cursor to fetch the next page
            } else {
                setCursor(null); // If no more pages, reset the cursor to stop further fetches
            }
        }
    });

    useEffect(() => {
        // Trigger the category loading when the component mounts or the cursor changes
        if (!called || cursor) {
            loadCategories(); // Load categories using the current cursor
        }
    }, [called, cursor, loadCategories]); // Dependencies: called (query status), cursor (pagination), and loadCategories (query function)

    // Display a loading message if categories are still being fetched
    if (loading && categories.length === 0) return <p>{__('Loading categories...', metadata.textdomain)}</p>;
    // Display an error message if the query fails
    if (error) return <p>{__('Error loading categories', metadata.textdomain)}</p>;

    // Render the react-select dropdown with the loaded categories
    return (
        <Select
            options={categories} // Pass the list of categories as options for the dropdown
            value={categories.find(option => option.value === value)} // Ensure the currently selected value is reflected in the dropdown
            onChange={selectedOption => onChange(selectedOption ? selectedOption.value : '')} // Update the selected value when the user changes selection
            isClearable // Allow the user to clear their selection
            placeholder={__('Select a Program...', metadata.textdomain)} // Placeholder text for the dropdown
            styles={{
                menu: provided => ({ ...provided, zIndex: 9999 }), // Ensure the dropdown menu is rendered on top of other elements
            }}
        />
    );
};

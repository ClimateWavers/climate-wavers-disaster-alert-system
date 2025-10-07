import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from './useDebounce';

/**
 * Custom hook for debounced search functionality
 * @param {Function} searchFunction - The function to call when searching
 * @param {number} delay - The debounce delay in milliseconds (default: 500ms)
 * @param {any} initialValue - Initial search value
 * @returns {Object} - Search state and handlers
 */
export const useDebouncedSearch = (searchFunction, delay = 500, initialValue = '') => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const [results, setResults] = useState({
    posts: [],
    users: [],
    hashtags: [],
    trending: []
  });
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  
  // Debounce the search term
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  // Memoized search function
  const performSearch = useCallback(async (term) => {
    if (!term || term.trim().length < 3) {
      setResults({
        posts: [],
        users: [],
        hashtags: [],
        trending: []
      });
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    setError(null);

    console.log('🔍 Performing search for:', term.trim());

    try {
      const searchResults = await searchFunction(term.trim());
      setResults(searchResults);
    } catch (err) {
      console.error('Search error:', err);
      setError(err.message || 'Search failed');
      setResults({
        posts: [],
        users: [],
        hashtags: [],
        trending: []
      });
    } finally {
      setIsSearching(false);
    }
  }, [searchFunction]);

  // Effect to trigger search when debounced term changes
  useEffect(() => {
    performSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, performSearch]);

  // Clear search results
  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setResults({
      posts: [],
      users: [],
      hashtags: [],
      trending: []
    });
    setError(null);
    setIsSearching(false);
  }, []);

  // Update search term
  const updateSearchTerm = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  return {
    searchTerm,
    debouncedSearchTerm,
    results,
    isSearching,
    error,
    updateSearchTerm,
    clearSearch,
    hasResults: results && (results.posts?.length > 0 || results.users?.length > 0 || results.hashtags?.length > 0 || results.trending?.length > 0),
    hasError: !!error,
  };
};

export default useDebouncedSearch;

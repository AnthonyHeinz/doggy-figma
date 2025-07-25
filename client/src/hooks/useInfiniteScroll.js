import { useState, useEffect, useCallback, useRef } from 'react';

export const useInfiniteScroll = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef();
  const callbackRef = useRef();

  // Set up intersection observer
  const lastElementRef = useCallback((node) => {
    if (isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();
    
    observerRef.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && callbackRef.current) {
        callbackRef.current();
      }
    }, {
      threshold: 0.1,
      rootMargin: '100px', // Start loading 100px before the element comes into view
    });
    
    if (node) observerRef.current.observe(node);
  }, [isLoading, hasMore]);

  // Set the callback function that will be called when we need to load more
  const setLoadMoreCallback = useCallback((callback) => {
    callbackRef.current = callback;
  }, []);

  // Clean up observer on unmount
  useEffect(() => {
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return {
    lastElementRef,
    setLoadMoreCallback,
    isLoading,
    setIsLoading,
    hasMore,
    setHasMore,
  };
}; 
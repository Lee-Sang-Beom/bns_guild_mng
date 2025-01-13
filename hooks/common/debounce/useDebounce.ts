"use client";
import { useState, useEffect } from "react";

// Debounce 훅
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // 이전 timeout을 클리어
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

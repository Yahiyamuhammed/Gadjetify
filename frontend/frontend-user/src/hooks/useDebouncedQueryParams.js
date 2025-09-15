import { useState, useEffect } from "react";

export function useDebouncedQueryParams(params, delay = 500) {
  const [debouncedParams, setDebouncedParams] = useState(params);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedParams(params);
    }, delay);

    return () => clearTimeout(handler);
  }, [params, delay]);

  return debouncedParams;
}

import { useEffect, useState, useCallback } from 'react';

// PUBLIC_INTERFACE
export default function useAsync(asyncFn, deps = []) {
  /** Generic async loader hook returning { data, error, loading, reload }. */
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const run = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const result = await asyncFn();
      setData(result);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    run();
  }, [run]);

  return { data, error, loading, reload: run };
}

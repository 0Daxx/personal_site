import { useCallback, useEffect, useRef, useState } from "react";
import type { Resource } from "@/types";

/** Generic async resource hook with loading/error/refetch and unmount safety. */
export function useResource<T>(fetcher: () => Promise<T>): Resource<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetcher()
      .then((result) => {
        if (mounted.current) setData(result);
      })
      .catch((err: unknown) => {
        if (mounted.current)
          setError(err instanceof Error ? err.message : "Something went wrong.");
      })
      .finally(() => {
        if (mounted.current) setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => load(), [load]);

  return { data, loading, error, refetch: load };
}

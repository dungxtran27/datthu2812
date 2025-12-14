import { useState, useEffect, useCallback } from "react";

interface GuestData {
  timestamp: string;
  name: string;
  attending: string;
  guests: string;
  message: string;
}

export function useSheetData() {
  const [data, setData] = useState<GuestData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const callbackName = "jsonpCallback" + Date.now();

      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = `${
          import.meta.env.VITE_GOOGLE_SCRIPT_URL
        }?callback=${callbackName}&t=${Date.now()}`; // Add cache busting

        window[callbackName] = (response: any) => {
          delete window[callbackName];
          document.body.removeChild(script);

          if (response.result === "success") {
            setData(response.data);
            setLastFetched(new Date());
            setError(null);
            console.log(
              "Data fetched successfully:",
              response.data.length,
              "items"
            );
            resolve(response.data);
          } else {
            setError(response.error || "Failed to fetch data");
            reject(response.error);
          }
          setLoading(false);
        };

        script.onerror = () => {
          delete window[callbackName];
          if (document.body.contains(script)) {
            document.body.removeChild(script);
          }
          setError("Failed to load data. Please check your connection.");
          setLoading(false);
          reject("Network error");
        };

        // Timeout for safety
        setTimeout(() => {
          if (window[callbackName]) {
            delete window[callbackName];
            if (document.body.contains(script)) {
              document.body.removeChild(script);
            }
            setError("Request timeout");
            setLoading(false);
            reject("Timeout");
          }
        }, 10000);

        document.body.appendChild(script);
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setLoading(false);
      console.error("Error fetching data:", err);
    }
  }, []);

  // Initial fetch and auto-refresh
  useEffect(() => {
    fetchData();

    // Auto-refresh every 30 seconds
    const intervalId = setInterval(fetchData, 30000);

    return () => clearInterval(intervalId);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    refresh: fetchData,
    lastFetched,
  };
}

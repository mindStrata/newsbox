import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            return window.matchMedia(query).matches;
        }
        return false; // Default for server-side rendering (SSR)
    });

    useEffect(() => {
        const mediaQueryList = window.matchMedia(query);

        const listener = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaQueryList.addEventListener("change", listener);

        // Cleanup function
        return () => {
            mediaQueryList.removeEventListener("change", listener);
        };
    }, [query]);

    return matches;
}

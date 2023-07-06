import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [isTrue, setIsTrue] = useState(false);

  const handleQueryMatch = (e: MediaQueryListEvent) => setIsTrue(e.matches);

  useEffect(() => {
    const media = window.matchMedia(query);

    setIsTrue(media.matches);

    media.addEventListener("change", handleQueryMatch);
    return () => media.removeEventListener("change", handleQueryMatch);
  }, []);

  return isTrue;
}

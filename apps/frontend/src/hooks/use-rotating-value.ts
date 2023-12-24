import { useEffect, useState } from "react";

export function useRotatingValue<T>(items: T[], interval: number) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [items, interval]);

  return items[index];
}

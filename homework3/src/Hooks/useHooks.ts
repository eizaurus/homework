import { RefObject, useEffect, useRef, useState } from "react";

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T|null>,
  callback: (res: boolean) => void
): void => {
  useEffect(() => {
    const handler: EventListener = (e) => {
      if (ref.current && ref.current?.contains(e.target as Node)) {
        callback(true);
        console.log("Клик по блоку");
      } else {
        callback(false);
        console.log("МИМО!");
      }
    };
    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  }, [ref]);
};

export const useHover = <T extends HTMLElement>(): [ref:RefObject<T|null>, hover: boolean] => {
  const ref = useRef<T>(null);
  const [hover, setHovered] = useState(false);
  useEffect(() => {
    const handler: EventListener = (e) => {
      if (ref.current && ref.current?.contains(e.target as Node)) {
        setHovered(true);
        console.log("Мышка навелась");
      } else {
        setHovered(false);
        console.log("Мышка ушла");
      }
    };
    document.addEventListener("mouseover", handler);
    return () => {
      document.removeEventListener("mouseover", handler);
    };
  }, [ref]);
  return [ref, hover];
};

export const useFetch = <T>(
  url: string
): [data: T | undefined, isLoading: boolean, error: string | boolean] => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string|boolean>(false);
  const [data, setData] = useState<T>();
  async function loadData() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      setData(await response.json());
      setLoading(false);
    } catch (error) {
      setError(JSON.stringify(error));
    }
  }
  setTimeout(() => loadData(), 2000);
  return [data, isLoading, error];
};

import { useEffect, useRef } from 'react';

const useClickOutside = <T extends HTMLElement = HTMLElement>(cb: () => void) => {
  const ref = useRef<T>(null);

  const handleClickOutside: EventListener = event => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      cb();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => document.removeEventListener('click', handleClickOutside, true);
  }, []);

  return ref;
};

export default useClickOutside;

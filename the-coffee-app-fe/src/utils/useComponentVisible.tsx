import { useState, useEffect, useRef } from 'react';

export default function useComponentVisible(
  initialIsVisible: boolean,
): [React.RefObject<HTMLDivElement>, boolean, React.Dispatch<React.SetStateAction<boolean>>] {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const ref = useRef<HTMLDivElement>(null);
  const escKeyCode = 27;

  const handleHideDropdown = (event: KeyboardEvent) => {
    if (event.keyCode === escKeyCode) {
      setIsComponentVisible(false);
    }
  };

  const handleClickOutside = (event: Event) => {
    if (ref.current && Array.from(ref.current.children).every((item) => !item.contains(event.target as Node))) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleHideDropdown, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('keydown', handleHideDropdown, true);
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return [ref, isComponentVisible, setIsComponentVisible];
}

import { MutableRefObject, useEffect, useState } from 'react';

export default function useScrollDirection(
  scrollRef: MutableRefObject<number>,
) {
  const [goingUp, setGoingUp] = useState(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (scrollRef.current < currentScrollY && goingUp) {
      setGoingUp(false);
    }
    if (scrollRef.current > currentScrollY && !goingUp) {
      setGoingUp(true);
    }
    scrollRef.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [goingUp]);

  return goingUp ? 'up' : 'down';
}

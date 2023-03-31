import { useEffect, useState } from 'react';

export default function useWindowWidth() {
  const [width, setWidth] = useState<number>(1000);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return width;
}

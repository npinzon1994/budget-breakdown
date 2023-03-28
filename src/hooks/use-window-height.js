import React, { useLayoutEffect, useState } from 'react';

export default function useWindowHeight() {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerHeight);
    }
    window.addEventListener('resizeHeight', updateSize);
    updateSize();
    return () => window.removeEventListener('resizeHeight', updateSize);
  }, []);
  return size;
  
}



export function ShowWindowDimensions(props) {
  const height = useWindowHeight();
  return <span>Window height: {height}</span>;
}
import React, { useLayoutEffect, useState } from 'react';

export default function useWindowWidth() {
  const [size, setSize] = useState(0);
  useLayoutEffect(() => {
    function updateSize() {
      setSize(window.innerWidth);
    }
    window.addEventListener('resizeWidth', updateSize);
    updateSize();
    return () => window.removeEventListener('resizeWidth', updateSize);
  }, []);
  return size;
}

export function ShowWindowDimensions(props) {
  const width = useWindowWidth();
  return <span>Window width: {width}</span>;
}
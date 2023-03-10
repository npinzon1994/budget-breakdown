import React, { useLayoutEffect, useState } from 'react';

export default function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  console.log(size[0]);
  return size;
}

function ShowWindowDimensions(props) {
  const [width, height] = useWindowSize();
  return <span>Window size: {width} x {height}</span>;
}
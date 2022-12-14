import { useLayoutEffect, useState } from "react";

const getViewPort = () => window?.visualViewport || {
  width: window.innerWidth,
  height: window.innerHeight,
}

export const useVisualViewport = () => {
  const [width, setWidth] = useState(getViewPort().width);
  const [height, setHeight] = useState(getViewPort().height);



  useLayoutEffect(() => {
    let timeout
    const updateVisualViewport = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        const { width, height } = getViewPort()
        setWidth(width)
        setHeight(height)
      }, 100)

    }
    window.addEventListener('resize', updateVisualViewport);
    return () => {
      window.removeEventListener('resize', updateVisualViewport)
      clearTimeout(timeout)
    };
  }, []);

  return { width, height };
}
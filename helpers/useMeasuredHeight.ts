import { useEffect, useRef, useState } from 'react';

export const useMeasuredHeight = () => {
  const measuringWrapperRef = useRef<HTMLDivElement>(null);
  const [measuredHeight, setMeasuredHeight] = useState(0);

  useEffect(() => {
    if (!measuringWrapperRef.current) {
        return;
    }

    const resizeObserver = new ResizeObserver(() => {
        setMeasuredHeight(measuringWrapperRef.current?.clientHeight || 0)
    });

    resizeObserver.observe(measuringWrapperRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return { measuringWrapperRef, measuredHeight }
}

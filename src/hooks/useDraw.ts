import { useEffect, useRef, useState } from "react";

export const useDraw = (
  DrawLine: ({ context, currentPoint, previousPoint }: Draw) => void
) => {
  const [isMouseDown, setIsMouseDown] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const previousPoint = useRef<null | Point>(null);
  const currentRef = canvasRef.current;

  const onMouseDown = () => setIsMouseDown(true);
  const onMouseOut = () => {
    previousPoint.current = null;
  };
  const clear = () => {
    if (!currentRef) return;
    const context = currentRef.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, currentRef.width, currentRef.height);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!isMouseDown) return;
      const currentPoint = computePointInCanvas(e);
      const context = currentRef?.getContext("2d");
      if (!context || !currentPoint) return;

      DrawLine({ context, currentPoint, previousPoint: previousPoint.current });
      previousPoint.current = currentPoint;
    };

    const computePointInCanvas = (e: MouseEvent) => {
      //change coordenates 0,0 to canvas border
      if (!currentRef) return;
      const rect = currentRef.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      return { x, y };
    };
    const handleMouseUp = () => {
      setIsMouseDown(false);
      previousPoint.current = null;
    };
    //add event listeners
    currentRef?.addEventListener("mousemove", handler);
    window.addEventListener("mouseup", handleMouseUp);

    //remove event listeners
    return () => {
      currentRef?.removeEventListener("mousemove", handler);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    //eslint-disable-next-line
  }, [DrawLine]);

  return { canvasRef, onMouseDown, onMouseOut, clear };
};

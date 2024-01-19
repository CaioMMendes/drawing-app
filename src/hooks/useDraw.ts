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
    if (!isMouseDown) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      const currentPoint = computePointInCanvas(e);
      const context = currentRef?.getContext("2d");
      if (!context || !currentPoint) return;

      DrawLine({ context, currentPoint, previousPoint: previousPoint.current });
      previousPoint.current = currentPoint;
    };

    const computePointInCanvas = (e: MouseEvent | TouchEvent) => {
      //change coordenates 0,0 to canvas border
      if (!currentRef) return;

      const rect = currentRef.getBoundingClientRect();
      if (e.type === "mousemove") {
        const x = (e as MouseEvent).clientX - rect.left;
        const y = (e as MouseEvent).clientY - rect.top;
        return { x, y };
      }

      if (e.type === "touchmove") {
        const x = (e as TouchEvent).touches[0].clientX - rect.left;
        const y = (e as TouchEvent).touches[0].clientY - rect.top;
        return { x, y };
      }
    };
    const handleMouseUp = () => {
      setIsMouseDown(false);
      previousPoint.current = null;
    };
    //add event listeners
    currentRef?.addEventListener("mousemove", handler);
    currentRef?.addEventListener("touchmove", handler);
    window.addEventListener("mouseup", handleMouseUp);

    //remove event listeners
    return () => {
      currentRef?.removeEventListener("mousemove", handler);
      currentRef?.removeEventListener("touchmove", handler);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    //eslint-disable-next-line
  }, [DrawLine]);

  return { canvasRef, onMouseDown, onMouseOut, clear };
};

import { useEffect, useState } from "react";

export default function useResize(
  canvasRef: React.RefObject<HTMLCanvasElement>
) {
  const [windowSize, setWindowSize] = useState({
    width: window.visualViewport?.width,
    height: window.visualViewport?.height,
  });
  const [canvasdimensions, setCanvasDimensions] = useState({
    width: 360,
    height: 360,
  });

  const updateWindowSize = () => {
    if (!window.visualViewport) return;
    setWindowSize({
      width: window.visualViewport?.width,
      height: window.visualViewport?.height,
    });
  };
  useEffect(() => {
    window.addEventListener("resize", updateWindowSize);
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    if (canvasRef.current) {
      context.fillRect(
        0,
        0,
        canvasRef.current?.width,
        canvasRef.current?.height
      );
    }
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
    //eslint-disable-next-line
  }, []);

  //aumenta o tamanho do canvas para o tamanho da tela
  useEffect(() => {
    const rect = canvasRef?.current?.getBoundingClientRect();
    const leftCanvas = rect?.left;
    const topCanvas = rect?.top;
    if (
      leftCanvas === undefined ||
      leftCanvas === null ||
      topCanvas === undefined ||
      topCanvas === null ||
      windowSize.height === undefined ||
      windowSize.width === undefined
    )
      return;

    setCanvasDimensions({
      width: windowSize.width - leftCanvas,
      height: windowSize.height - topCanvas,
    });
  }, [windowSize, canvasRef]);

  return { canvasdimensions };
}

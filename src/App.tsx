import { useEffect, useState } from "react";
import Footer from "./components/footer";
import SideBar from "./components/sidebar";
import { useDraw } from "./hooks/useDraw";

function App() {
  const [color, setColor] = useState("rgba(0, 0, 0, 1)");
  const [lineWidth, setLineWidth] = useState(5);
  const { canvasRef, onMouseDown, onMouseOut, clear, undoLast } =
    useDraw(drawLine);
  const [canvasdimensions, setCanvasDimensions] = useState({
    width: 360,
    height: 360,
  });
  // const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [drawType, setDrawType] = useState<"PNG" | "JPEG">("PNG");
  const [tool, setTool] = useState<"pencil" | "eraser">("pencil");
  const [windowSize, setWindowSize] = useState({
    width: window.visualViewport?.width,
    height: window.visualViewport?.height,
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
    context.fillStyle = drawType === "JPEG" ? "#fff" : "rgba(0,0,0,0)";
    if (!canvasRef.current) return;
    context.fillRect(0, 0, canvasRef.current?.width, canvasRef.current?.height);
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
    //eslint-disable-next-line
  }, []);

  //altera a saida de png para jpeg
  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    if (drawType === "JPEG") {
      context.fillStyle = "#fff";
    }
    if (drawType === "PNG") {
      clear();
      context.fillStyle = "rgba(0,0,0,0)";
    }
    if (!canvasRef.current) return;
    context.fillRect(0, 0, canvasRef.current?.width, canvasRef.current?.height);
    //eslint-disable-next-line
  }, [drawType, canvasRef]);

  //altera de lápis para borracha
  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    tool === "pencil"
      ? (context.globalCompositeOperation = "source-over")
      : (context.globalCompositeOperation = "destination-out");
  }, [tool, canvasRef]);

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

  //adiciona o ouvinte ctrl z para desfazer as alterações
  useEffect(() => {
    function handleUndoKey(e: KeyboardEvent) {
      if (e.ctrlKey && e.key === "z") {
        undoLast();
      }
    }
    // Adiciona o ouvinte de eventos ao documento
    document.addEventListener("keydown", handleUndoKey);

    // Remove o ouvinte de eventos quando o componente é desmontado
    return () => {
      document.removeEventListener("keydown", handleUndoKey);
    };
  }, [undoLast]); // O segundo parâmetro vazio [] garante que o efeito só é executado uma vez, sem dependências

  //não usei arrow funcion porque se não a função drawLine teria que vir antes da useDraw
  function drawLine({ context, previousPoint, currentPoint }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = color;

    const startPoint = previousPoint ?? currentPoint;
    context.beginPath();
    context.lineWidth = lineWidth;
    context.strokeStyle = lineColor;
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(currX, currY);
    context.stroke();

    context.fillStyle = lineColor;
    context.beginPath();
    context.arc(
      startPoint.x,
      startPoint.y,
      lineWidth / 2 /*Se deixar muito baixo fica zoado os pontos*/,
      0,
      2 * Math.PI,
      true
    );
    context.fill();
  }

  return (
    <div className="flex h-full flex-col select-none flex-1">
      <div className="flex h-full flex-col md:flex-row flex-1">
        <SideBar
          clear={clear}
          color={color}
          setColor={setColor}
          lineWidth={lineWidth}
          setLineWidth={setLineWidth}
          canvasRef={canvasRef}
          undoLast={undoLast}
          drawType={drawType}
          setDrawType={setDrawType}
          tool={tool}
          setTool={setTool}
        />
        <div className="md:border-l md:border-primary-2/80  border-b border-primary-1 border-t md:border-t-0">
          <canvas
            width={canvasdimensions.width}
            height={canvasdimensions.height}
            onMouseOut={onMouseOut}
            onMouseDown={onMouseDown}
            onTouchMove={onMouseDown}
            onTouchEnd={onMouseOut}
            ref={canvasRef}
            className=" bg-white touch-none "
          />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;

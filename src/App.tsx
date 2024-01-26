import { useEffect, useState } from "react";
import Footer from "./components/footer";
import SideBar from "./components/sidebar";
import { useDraw } from "./hooks/useDraw";
import useKey from "./hooks/useKey";
import useResize from "./hooks/useResize";

function App() {
  const [color, setColor] = useState("rgba(0, 0, 0, 1)");
  const [lineWidth, setLineWidth] = useState(5);
  const { canvasRef, onMouseDown, onMouseOut, clear, undoLast } =
    useDraw(drawLine);

  // const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [drawType, setDrawType] = useState<"PNG" | "JPEG">("PNG");
  const [tool, setTool] = useState<"pencil" | "eraser">("pencil");

  useKey("z", undoLast);
  const { canvasdimensions } = useResize(canvasRef);

  useEffect(() => {
    const context = canvasRef.current?.getContext("2d");
    if (!context) return;
    context.fillStyle = drawType === "JPEG" ? "#fff" : "rgba(0,0,0,0)";
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
    <div className="flex h-full flex-col select-none flex-1 ">
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

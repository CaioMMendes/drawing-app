import { useEffect, useRef, useState } from "react";
import Footer from "./components/footer";
import SideBar from "./components/sidebar";
import { useDraw } from "./hooks/useDraw";
import { ChromePicker } from "react-color";
import Input from "./components/input";
import Button from "./components/button";

function App() {
  const { canvasRef, onMouseDown, onMouseOut, clear, undoLast } =
    useDraw(drawLine);
  const downloadRef = useRef<HTMLAnchorElement | null>(null);

  const handleDownload = () => {
    if (!canvasRef.current || !downloadRef.current) return;
    downloadRef.current.href = canvasRef.current?.toDataURL("image/png");
    downloadRef.current.download = "Drawing image";
  };
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
  const [color, setColor] = useState("rgba(0, 0, 0, 1)");
  const [lineWidth, setLineWidth] = useState(5);
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
    <div className="flex h-full flex-col select-none">
      <div className="flex h-full flex-col md:flex-row">
        <SideBar clear={clear} />
        <div className="   md:border-l md:border-primary-3  border-b border-primary-1 border-t md:border-t-0">
          <canvas
            width={350}
            height={350}
            onMouseOut={onMouseOut}
            onMouseDown={onMouseDown}
            onTouchMove={onMouseDown}
            onTouchEnd={onMouseOut}
            ref={canvasRef}
            className=" bg-white touch-none "
          />
        </div>
        <div className="flex flex-col gap-3">
          <ChromePicker
            color={color}
            className="h-fit"
            onChange={(e) =>
              setColor(`rgba(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})`)
            }
          />
          <div className="flex">
            <div className="flex flex-col gap-2">
              Tamanho
              <Input
                type="range"
                className="w-full border-none outline-none accent-primary-2"
                value={lineWidth}
                step={1}
                min={1}
                max={60}
                onChange={(e) => setLineWidth(Number(e.target.value))}
              />
            </div>
            {lineWidth}
          </div>
        </div>
      </div>
      <Button onClick={undoLast}>Undo</Button>
      <a href="" download={"Drawing image"}>
        Download
      </a>
      <a ref={downloadRef}>
        <Button variant="button" onClick={handleDownload}>
          Download
        </Button>
      </a>
      <Footer />
    </div>
  );
}

export default App;

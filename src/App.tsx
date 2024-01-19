import { useState } from "react";
import Footer from "./components/footer";
import SideBar from "./components/sidebar";
import { useDraw } from "./hooks/useDraw";
import { ChromePicker } from "react-color";
import Input from "./components/input";

function App() {
  const { canvasRef, onMouseDown, onMouseOut, clear } = useDraw(drawLine);
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
    <div className="flex h-full flex-col">
      <div className="flex h-full flex-col md:flex-row">
        <SideBar clear={clear} />
        <div className="   md:border-l md:border-primary-3  border-b border-primary-1 border-t md:border-t-0">
          <canvas
            width={300}
            height={300}
            onMouseOut={onMouseOut}
            onMouseDown={onMouseDown}
            onTouchMove={onMouseDown}
            onTouchEnd={onMouseOut}
            ref={canvasRef}
            className=" bg-zinc-500 touch-none"
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
      <Footer />
    </div>
  );
}

export default App;

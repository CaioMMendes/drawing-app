import Footer from "./components/footer";
import SideBar from "./components/sidebar";
import { useDraw } from "./hooks/useDraw";

function App() {
  const { canvasRef, onMouseDown, onMouseOut, clear } = useDraw(drawLine);

  //não usei arrow funcion porque se não a função drawLine teria que vir antes da useDraw
  function drawLine({ context, previousPoint, currentPoint }: Draw) {
    const { x: currX, y: currY } = currentPoint;
    const lineColor = "#000000";
    const lineWidth = 5;

    const startPoint = previousPoint ?? currentPoint;
    context.beginPath();
    context.lineWidth = lineWidth;
    context.strokeStyle = lineColor;
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(currX, currY);
    context.stroke();

    context.fillStyle = lineColor;
    context.beginPath();
    context.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    context.fill();
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-full flex-col md:flex-row">
        <SideBar clear={clear} />
        <div className="   md:border-l md:border-primary-3  border-b border-primary-1 border-t md:border-t-0">
          <canvas
            width={500}
            height={500}
            onMouseOut={onMouseOut}
            onMouseDown={onMouseDown}
            ref={canvasRef}
            className=" bg-zinc-500 "
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;

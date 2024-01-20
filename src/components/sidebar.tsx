import { ChromePicker } from "react-color";
import Button from "./button";
import Input from "./input";
import { SetStateAction, useRef } from "react";
import { EraserIcon, PencilIcon } from "lucide-react";

type SideBarProps = {
  clear: () => void;
  color: string;
  setColor: React.Dispatch<SetStateAction<string>>;
  lineWidth: number;
  setLineWidth: React.Dispatch<SetStateAction<number>>;
  drawType: "PNG" | "JPEG";
  setDrawType: React.Dispatch<SetStateAction<"PNG" | "JPEG">>;
  tool: "pencil" | "eraser";
  setTool: React.Dispatch<SetStateAction<"pencil" | "eraser">>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  undoLast: () => void;
};

const SideBar = ({
  clear,
  color,
  setColor,
  lineWidth,
  setLineWidth,
  drawType,
  setDrawType,
  tool,
  setTool,
  canvasRef,
  undoLast,
}: SideBarProps) => {
  const year = new Date().getFullYear();
  const downloadRef = useRef<HTMLAnchorElement | null>(null);

  const handleDownload = () => {
    if (!canvasRef.current || !downloadRef.current) return;
    downloadRef.current.href = canvasRef.current?.toDataURL("image/png");
    downloadRef.current.download = "Drawing image";
  };
  return (
    <div className="flex md:flex-col md:h-full gap-2 bg-primary-1 p-2 ">
      <div className="flex flex-col md:flex-col gap-2 flex-1">
        {/* <img src="/icon.png" alt="Icon image" width={40} height={40} /> */}
        <div className="flex gap-2 justify-between md:flex-col">
          <div className="flex flex-col h-full justify-around gap-2">
            <Button
              variant="button"
              onClick={() => setTool("pencil")}
              className={`${tool === "pencil" && "!border-primary-light bg-primary-2"} flex flex-col md:flex-row border border-transparent  w-full `}
            >
              <PencilIcon
                width={20}
                height={20}
                className="w-1/3 flex justify-end"
              />
              <p className="flex flex-1 justify-start">Lápis</p>
            </Button>{" "}
            <Button
              variant="button"
              onClick={() => setTool("eraser")}
              className={`${tool === "eraser" && "!border-primary-light bg-primary-2"} flex flex-col md:flex-row  border border-transparent  w-full`}
            >
              <EraserIcon
                width={20}
                height={20}
                className="w-1/3 flex justify-end"
              />{" "}
              <p className="flex flex-1 justify-start">Borracha</p>
            </Button>
            <div className="flex flex-col gap-2">
              <div className="flex">Tamanho: {lineWidth}</div>

              <Input
                type="range"
                className="w-full  border-none outline-none accent-primary-2"
                value={lineWidth}
                step={1}
                min={1}
                max={60}
                onChange={(e) => setLineWidth(Number(e.target.value))}
              />
            </div>
          </div>
          <div className="flex  justify-center w-full">
            <ChromePicker
              color={color}
              className="flex flex-col flex-1 justify-center"
              onChange={(e) =>
                setColor(`rgba(${e.rgb.r}, ${e.rgb.g}, ${e.rgb.b}, ${e.rgb.a})`)
              }
            />
          </div>
        </div>
        <div className="flex justify-around gap-2 md:flex-col">
          <Button variant="button" onClick={undoLast}>
            Undo
          </Button>
          <Button onClick={clear} variant="button">
            Clear
          </Button>
          <Button
            variant="button"
            onClick={() =>
              setDrawType((drawType) => (drawType === "PNG" ? "JPEG" : "PNG"))
            }
          >
            {drawType}
          </Button>
          <a ref={downloadRef}>
            <Button variant="button" onClick={handleDownload}>
              Download
            </Button>
          </a>
        </div>
      </div>
      <div className="gap-2 justify-center items-center hidden text-sm md:flex">
        <p>&copy; {year}</p>
        <p>|</p>
        <p>Caio</p>
      </div>
    </div>
  );
};

export default SideBar;

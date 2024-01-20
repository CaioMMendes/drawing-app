import { ChromePicker } from "react-color";
import Button from "./button";
import Input from "./input";
import { SetStateAction, useRef } from "react";

type SideBarProps = {
  clear: () => void;
  color: string;
  setColor: React.Dispatch<SetStateAction<string>>;
  lineWidth: number;
  setLineWidth: React.Dispatch<SetStateAction<number>>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  undoLast: () => void;
};

const SideBar = ({
  clear,
  color,
  setColor,
  lineWidth,
  setLineWidth,
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
    <div className="flex md:flex-col md:h-full gap-2 bg-primary-1 p-2">
      <div className="flex flex-col gap-2 flex-1">
        {/* <img src="/icon.png" alt="Icon image" width={40} height={40} /> */}
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
        <Button variant="button" onClick={undoLast}>
          Undo
        </Button>
        <Button onClick={clear} variant="button">
          Clear
        </Button>
        <a ref={downloadRef}>
          <Button variant="button" onClick={handleDownload}>
            Download
          </Button>
        </a>
      </div>
      <div className="flex-col justify-center items-center hidden text-sm md:flex">
        <p>&copy; {year}</p>
        <p>Caio</p>
      </div>
    </div>
  );
};

export default SideBar;

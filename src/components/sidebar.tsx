import Button from "./button";

type SideBarProps = {
  clear: () => void;
};

const SideBar = ({ clear }: SideBarProps) => {
  const year = new Date().getFullYear();
  return (
    <div className="flex md:flex-col md:h-full gap-2 bg-primary-1 p-2">
      <img src="/icon.png" alt="Icon image" width={40} height={40} />
      <div className="flex-1">a</div>
      <Button onClick={clear} variant="button">
        Clear
      </Button>
      <div className="flex-col justify-center items-center hidden text-sm md:flex">
        <p>&copy; {year}</p>
        <p>Caio</p>
      </div>
    </div>
  );
};

export default SideBar;

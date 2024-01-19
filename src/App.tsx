import Footer from "./components/footer";
import SideBar from "./components/sidebar";

function App() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-full flex-col md:flex-row">
        <SideBar />
        <div className="flex flex-1   md:border-l md:border-primary-3  border-b border-primary-1 border-t md:border-t-0">
          <canvas className="flex h-full bg-zinc-500 flex-1  " />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;

import { Outlet } from "react-router-dom";
import TitleBar from "./components/layout/TitleBar";
// import GodsList from "./components/GodsList";

function App() {
  return (
    <div className="container mx-auto flex min-h-[100vh] flex-col items-center justify-between bg-[url('/img/gods-bg.jpg')] bg-cover bg-fixed bg-top px-1 pb-2 pt-6">
      <TitleBar />
      <Outlet />
      <footer className="text-xs">
        &copy; {new Date().getFullYear()} Reactaulos
      </footer>
    </div>
  );
}

export default App;

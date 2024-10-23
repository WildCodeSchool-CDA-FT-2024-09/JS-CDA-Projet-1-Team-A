import { Outlet } from "react-router-dom";
import "./App.css";
import TitleBar from "./components/layout/TitleBar";
// import GodsList from "./components/GodsList";

function App() {
  return (
    <div className="container mx-auto flex min-h-[95vh] flex-col items-center justify-between">
      <TitleBar />
      <Outlet />
      <div>&copy; 2024 Reactaulos</div>
    </div>
  );
}

export default App;

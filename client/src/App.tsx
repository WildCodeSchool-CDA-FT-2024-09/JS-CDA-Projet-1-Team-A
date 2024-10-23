import { Outlet } from "react-router-dom";
import TitleBar from "./components/layout/TitleBar";
// import GodsList from "./components/GodsList";

function App() {
  return (
    <div className="container mx-auto flex min-h-[100vh] flex-col items-center justify-between bg-[url('/img/gods-bg.jpg')] bg-cover bg-top py-2 pb-4 pt-6 xl:bg-top">
      <TitleBar />
      <Outlet />
      <div>&copy; 2024 Reactaulos</div>
    </div>
  );
}

export default App;

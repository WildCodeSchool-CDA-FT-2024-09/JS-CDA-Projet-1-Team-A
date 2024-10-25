import { Link } from "react-router-dom";
import TitleAvatar from "./TitleAvatar";

function TitleBar() {
  return (
    <header className="sticky top-6 z-10 flex w-full flex-row items-center justify-between gap-4 rounded-xl bg-blue-fd bg-opacity-85 px-2 py-2 sm:w-4/5">
      <Link to="/" className="max-w-12 lg:max-w-16">
        <img src="/img/gods_arena_logo.png" />
      </Link>
      <h1 className="font-['Dalek_Pinpoint'] text-3xl font-bold text-yellow-p shadow-slate-600 drop-shadow-2xl saturate-200 md:text-4xl lg:text-5xl lg:tracking-widest">
        Gods Arena
      </h1>
      <TitleAvatar />
    </header>
  );
}

export default TitleBar;

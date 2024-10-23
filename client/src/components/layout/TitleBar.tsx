import { Link } from "react-router-dom";

function TitleBar() {
  return (
    <header className="flex w-4/5 flex-row items-center justify-between rounded-xl bg-blue-fd bg-opacity-85 px-4 py-4 lg:px-8">
      <Link to="/" className="max-w-12 lg:max-w-16">
        <img src="/img/gods_arena_logo.png"></img>
      </Link>
      <h1 className="font-['Dalek_Pinpoint'] text-4xl font-bold tracking-widest text-yellow-p shadow-slate-600 drop-shadow-2xl saturate-200 lg:text-5xl">
        Gods Arena
      </h1>
      <div>👸</div>
    </header>
  );
}

export default TitleBar;

import "./App.css";
import GodsList from "./components/godsList";

function App() {
  return (
    <>
      <h1 className="text-2xl font-bold">Gods Arena</h1>
      <GodsList />
      <footer className="mt-12">
        <p>
          (Icons 🙏{" "}
          <a className="hover:underline" href="https://www.flaticon.com">
            FlatIcon
          </a>
          )
        </p>
      </footer>
    </>
  );
}

export default App;

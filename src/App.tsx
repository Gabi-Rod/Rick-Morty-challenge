import { Search } from "./components/search/Search";
import { CharacterList } from "./components/characterList/CharacterList";
import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Rick and Morty</h1>
      </header>
      <Search />
      <CharacterList />
    </div>
  );
}

export default App;

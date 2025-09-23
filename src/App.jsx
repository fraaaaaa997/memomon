import React, { useState } from "react";
import ScreenPage from "./components/ScreenPage";
import MemoryGame from "./components/MemoryGame";

function App() {
  const [category, setCategory] = useState(null);
  const [start, setStart] = useState(false);
  const [mode, setMode] = useState("single"); // "single" o "versus"

  return (
    <>
      {!start ? (
        <ScreenPage setCategory={setCategory} setStart={setStart} setMode={setMode} />
      ) : (
        <MemoryGame category={category} mode={mode} />
      )}
    </>
  );
}

export default App;



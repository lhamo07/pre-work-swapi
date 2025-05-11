import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Film from "./pages/film";
import "./css/style.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Characters from "./pages/Characters";
import Header from "./pages/Header";
function App() {
  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Film />} />
          <Route path="character/:id" element={<Characters />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

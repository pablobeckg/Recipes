import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Rezepte from "./pages/Rezepte/Rezepte";
import Ueberuns from "./pages/Uns/Ueberuns";
import Banner from "./components/Banner/Banner";
import { useState } from "react";
import { SearchTermContext } from "./context/searchTermContext";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <SearchTermContext.Provider value={{searchTerm, setSearchTerm}}>
      <BrowserRouter>
        <Header />
        <Banner />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rezepte" element={<Rezepte />} />
          <Route path="/ueberuns" element={<Ueberuns />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </SearchTermContext.Provider>
  );
}

export default App;

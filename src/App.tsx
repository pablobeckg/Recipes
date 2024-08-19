import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Rezepte from "./pages/Rezepte/Rezepte";
import Ueberuns from "./pages/Uns/Ueberuns";
import Banner from "./components/Banner/Banner";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Banner/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rezepte" element={<Rezepte />} />
          <Route path="/ueberuns" element={<Ueberuns />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

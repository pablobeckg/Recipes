import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Rezepte from "./pages/Rezepte/Rezepte";
import Ueberuns from "./pages/Uns/Ueberuns";
import { useState } from "react";
import { SearchTermContext } from "./context/SearchTermContext";
import { DarkModeContext } from "./context/DarkModeContext";
import RecipeDetailPage from "./pages/RecipeDetailPage/RecipeDetailPage";
import { UserProvider } from "./context/UserContext";
import LoginPage from "./pages/LoginPage/LoginPage";
import LoginStatus from "./components/LoginStatus/LoginStatus";
import Signup from "./pages/Signup/Signup";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <UserProvider>
      <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
        <div className={darkMode ? "dark-mode app-container" : "app-container"}>
          <SearchTermContext.Provider value={{ searchTerm, setSearchTerm }}>
            <BrowserRouter>
              <LoginStatus />
              <Header />
              <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<Signup />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/rezepte" element={<Rezepte />} />
                  <Route path="/ueberuns" element={<Ueberuns />} />
                  <Route path="/rezepte/:id" element={<RecipeDetailPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                </Route>
              </Routes>
              <Footer />
            </BrowserRouter>
          </SearchTermContext.Provider>
        </div>
      </DarkModeContext.Provider>
    </UserProvider>
  );
}

export default App;

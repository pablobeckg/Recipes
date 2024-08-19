import { NavLink } from "react-router-dom";
import "./Navigation.css"
import Light from "../../assets/svg/Light";
import Dark from "../../assets/svg/Dark";
import { useDarkModeContext } from "../../context/DarkModeContext";

const Navigation = () => {
    const { darkMode, setDarkMode } = useDarkModeContext();

    return (
        <nav className="header-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/rezepte">Rezepte</NavLink>
            <NavLink to="/ueberuns">Über uns</NavLink>
            <div
              className="cursor-pointer "
              onClick={() =>
                setDarkMode((darkMode) => !darkMode)
              }>
              {darkMode ? <Light /> : <Dark />}
            </div>
        </nav>
    );
}
 
export default Navigation;
import { NavLink } from "react-router-dom";
import "./Navigation.css"

const Navigation = () => {
    return (
        <nav className="header-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/rezepte">Rezepte</NavLink>
            <NavLink to="/ueberuns">Über uns</NavLink>
        </nav>
    );
}
 
export default Navigation;
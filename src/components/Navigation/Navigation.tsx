import { NavLink } from "react-router-dom";
import "./Navigation.css"

const Navigation = () => {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/rezepte">Rezepte</NavLink>
        </nav>
    );
}
 
export default Navigation;
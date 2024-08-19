import { Link } from "react-router-dom";
import Icon from "../../assets/svg/Icon";
import Navigation from "../Navigation/Navigation";
import "./Header.css"

const Header = () => {
    return (
        <header>
            <Link to="/"><div className="header-title">
                <Icon/>
                <h1>Die Rezeptwelt</h1>
            </div></Link>
            
            <Navigation/>
        </header>
    );
}
 
export default Header;
import Icon from "../../assets/svg/Icon";
import Navigation from "../Navigation/Navigation";
import "./Header.css"

const Header = () => {
    return (
        <header>
            <div className="header-title">
                <Icon/>
                <h1>Die Rezeptwelt</h1>
            </div>
            <Navigation/>
        </header>
    );
}
 
export default Header;
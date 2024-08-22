import Icon from "../../assets/svg/Icon";
import "./Footer.css"

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
            <div className="footer-title">
                <Icon/>
                <h1>Die Rezeptwelt</h1>
            </div>
            <div className="social-media">
                <h2>Social Media</h2>
                <nav>
                    <img src="/images/Youtube Icon.png" alt="" />
                    <img src="/images/Twitter Icon.png" alt="" />
                    <img src="/images/Browser Icon.png" alt="" />
                    <img src="/images/Pinterest Icon.png" alt="" />
                </nav>
            </div>
            </div>
            
        </footer>
    );
}
 
export default Footer;
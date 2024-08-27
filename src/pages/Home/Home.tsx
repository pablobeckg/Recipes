
import Banner from "../../components/Banner/Banner";
import Beliebtesten from "../../components/Beliebtesten/Beliebtesten";
import Search from "../../components/Search/Search";
import "./Home.css"

const Home = () => {
    
    return (
        <main>
             <Banner />
            <Search/>
            <Beliebtesten/>
        </main>
    );
}
 
export default Home;

import Banner from "../../components/Banner/Banner";
import FavoriteRecipes from "../../components/FavoriteRecipes/FavoriteRecipes";
import Search from "../../components/Search/Search";
import "./Home.css"

const Home = () => {
    
    return (
        <main>
             <Banner />
            <Search/>
            <FavoriteRecipes/>
        </main>
    );
}
 
export default Home;
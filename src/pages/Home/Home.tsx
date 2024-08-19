
import FavoriteRecipes from "../../components/FavoriteRecipes/FavoriteRecipes";
import Search from "../../components/Search/Search";
import "./Home.css"

const Home = () => {
    
    return (
        <main>
            <Search/>
            <FavoriteRecipes/>
        </main>
    );
}
 
export default Home;
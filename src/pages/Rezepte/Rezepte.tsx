import Banner from "../../components/Banner/Banner";
import FavoriteRecipes from "../../components/FavoriteRecipes/FavoriteRecipes";
import NewRecipes from "../../components/NewRecipes/NewRecipes";
import Search from "../../components/Search/Search";

const Rezepte = () => {
    return (
        <main>
             <Banner />
            <Search/>
            <FavoriteRecipes/>
            <NewRecipes/>
        </main>
    );
}
 
export default Rezepte;
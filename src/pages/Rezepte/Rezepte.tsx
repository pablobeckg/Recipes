import Banner from "../../components/Banner/Banner";
import Beliebtesten from "../../components/Beliebtesten/Beliebtesten";
import Favoriten from "../../components/Favoriten/Favoriten";
import NewRecipes from "../../components/NewRecipes/NewRecipes";
import Search from "../../components/Search/Search";
import { useSearchTermContext } from "../../context/SearchTermContext";

const Rezepte = () => {
    const { searchTerm } = useSearchTermContext();

    return (
        <main>
             <Banner />
            <Search/>
            {searchTerm && <Beliebtesten/>}
            {!searchTerm && <Favoriten/>}
            {!searchTerm && <NewRecipes/>}
            
        </main>
    );
}
 
export default Rezepte;
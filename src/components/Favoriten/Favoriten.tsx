import { useEffect, useState } from "react";
import "./Favoriten.css";
import supabaseClient from "../../lib/supabaseClient";
import { RecipeWithFavorite } from "../../types/supabase-types-own";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const Favoriten = () => {
  const [recipes, setRecipes] = useState<RecipeWithFavorite[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const userContext = useUserContext();
  const user = userContext?.user;

  if (!user) {
    return null;
  }

  useEffect(() => {
    const fetchRecipes = async () => {
      let selectQuery = supabaseClient
        .from("recipes")
        .select("*, ingredients(*), recipe_favorites(recipe_id)");
      const result = await selectQuery;

      if (result.error) {
        console.error(result.error);
        setRecipes([]);
      } else {
        setRecipes(result.data);
      }

      let selectFavorites = supabaseClient
        .from("recipe_favorites")
        .select("recipe_id")
        .eq("user_id", user.id);

      const resultFavorites = await selectFavorites;

      if (resultFavorites.error) {
        console.error(resultFavorites.error);
        setFavorites([]);
      } else {
        const favoriteIds = resultFavorites.data.map(
          (favorite: { recipe_id: string }) => favorite.recipe_id
        );
        setFavorites(favoriteIds);
      }
    };

    fetchRecipes();
  }, [user.id]);

  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.includes(recipe.id)
  );

  return (
    
    <section className="favorite-recipes">
    <h1>Meine Favoriten</h1>
    {!favoriteRecipes.length && <h2>Noch keine Favoriten</h2>}
      <div className="favorite-list">
        {!favoriteRecipes && <p>Loading...</p>}
        {favoriteRecipes.length > 0 &&
          favoriteRecipes.map((recipe) => (
            <article
              key={recipe.id}
              className={`favorite-list-item ${recipe.name}`}
            >
              <div
                className="favorite-image"
                style={{ backgroundImage: `url(${recipe.imageUrl})` }}
              ></div>
              <div className="favorite-information">
                <h1>{recipe.name}</h1>
                <p>{recipe.description}</p>
                <Link to={`/rezepte/${recipe.id}`}>
                  <button>Zum Rezept</button>
                </Link>
              </div>
            </article>
          ))}
      </div>
    </section>
        
  );
};

export default Favoriten;

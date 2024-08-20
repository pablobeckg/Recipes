import { useEffect, useState } from "react";
import "./FavoriteRecipes.css";
import supabaseClient from "../../lib/supabaseClient";
import { useSearchTermContext } from "../../context/SearchTermContext";
import { Recipe } from "../../types/supabase-types-own";

const FavoriteRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { searchTerm } = useSearchTermContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      let selectQuery = supabaseClient
        .from("recipes")
        .select("*")
        .order("rating", { ascending: false })
        .limit(3);

      if (searchTerm) {
        selectQuery = selectQuery.ilike("name", `%${searchTerm}%`);
      }
      const result = await selectQuery;
      if (result.error) {
        console.error(result.error);
        setRecipes([]);
      } else {
        setRecipes(result.data);
      }
    };
    fetchRecipes();
  }, [searchTerm]);

  return (
    <section className="favorite-recipes">
      {!searchTerm && <h1>Die beliebtesten Rezepte</h1>}
      <div className="favorite-list">
        {!recipes && <p>Loading...</p>}
        {recipes &&
          recipes.length > 0 &&
          recipes.map((recipe) => (
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
                <button>Zum rezept</button>
              </div>
            </article>
          ))}
      </div>
    </section>
  );
};

export default FavoriteRecipes;

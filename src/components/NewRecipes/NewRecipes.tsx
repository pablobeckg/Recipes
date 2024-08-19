import { useEffect, useState } from "react";
import supabaseClient from "../../lib/supabaseClient";
import Recipe from "../../models/Recipe";
import "./NewRecipes.css";
import { useSearchTermContext } from "../../context/searchTermContext";

const NewRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const { searchTerm } = useSearchTermContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      let selectQuery = supabaseClient
        .from("recipes")
        .select("*")
        .order("created_at", { ascending: false })
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
    <>
      {!searchTerm && (
        <section className="new-recipes">
          <h1>Neuste Rezepte</h1>
          <div className="new-list">
            {!recipes && <p>Loading...</p>}
            {recipes &&
              recipes.length > 0 &&
              recipes.map((recipe) => (
                <article
                  key={recipe.id}
                  className={`new-list-item ${recipe.name}`}
                >
                  <div
                    className="new-image"
                    style={{ backgroundImage: `url(${recipe.imageUrl})` }}
                  ></div>
                  <div className="new-information">
                    <h1>{recipe.name}</h1>
                    <p>{recipe.description}</p>
                    <button>Zum rezept</button>
                  </div>
                </article>
              ))}
          </div>
        </section>
      )}
    </>
  );
};

export default NewRecipes;

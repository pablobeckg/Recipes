import { Tables } from "./supabase-types-gen";

export type Recipe = Tables<"recipes">;
export type Ingredients = Tables<"ingredients">;
export type Categories = Tables<"categories">;
export type Profile = Tables<"profiles">;
export type RecipeFavorites = Tables<"recipe_favorites">;

export type RecipeComplete = Recipe & { ingredients: Ingredients[] };

export type RecipeWithFavorite = Recipe & {
  ingredients: Ingredients[];
  recipe_favorites: { recipe_id: string }[];
};

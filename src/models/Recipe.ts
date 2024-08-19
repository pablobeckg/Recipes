type Recipe = {
  id: number;
  name: string;
  description: string;
  servings: number;
  instructions: string;
  category_id: number;
  created_at: Date;
  imageUrl: string;
  rating: number
};

export default Recipe

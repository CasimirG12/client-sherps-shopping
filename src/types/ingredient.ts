export interface BackEndIngredient {
  id: number
  name: string;
}

export interface Ingredient extends BackEndIngredient {
  quantity: number;
}
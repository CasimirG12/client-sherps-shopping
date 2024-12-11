export interface BackEndIngredient {
  id: number
  name: string;
}

export interface Ingredient extends BackEndIngredient {
  quantity: number;
  unit: MeasureUnit;
}

export type MeasureUnit = "g" | "pc." | "kg" | "l" | "ml";
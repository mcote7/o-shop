import { CategoryEffects } from "./category.effect";
import { ProductsEffects } from "./products.effect";
import { CartEffects } from "./cart.effect";

export const effects: any[] = [CategoryEffects, ProductsEffects, CartEffects];

export * from './category.effect';
export * from './products.effect';
export * from './cart.effect';

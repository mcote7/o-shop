import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable, } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/product';
// category|product|cart store 
import { Store } from '@ngrx/store';
import * as fromStore from 'src/app/shared/store';
// new 3rdp api services 
import { NutritionService } from 'src/app/shared/services/nutrition.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { 
  popin, 
  popinDelay, 
  slideInTop, 
  popinDelayIncrement, 
  popinDelayDecrement, 
  popinDelayHandleBars, 
  listAnimationWrapCard, 
  listAnimationItemCard } from 'src/animations/anime';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    popin,
    popinDelay,
    slideInTop,
    popinDelayIncrement,
    popinDelayDecrement,
    popinDelayHandleBars,
    listAnimationWrapCard,
    listAnimationItemCard,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ProductsComponent {
  public category: string;
  // store // 
  public categories$: Observable<Category[]>;
  public products$: Observable<Product[]>;
  // new card api options 
  public isNutritionLoading: boolean;
  public currentNutrition: any = {};
  public isRecipesLoading: boolean;
  public currentRecipes: any = {};
  // 
  constructor( 
    private router: ActivatedRoute, 
    private store: Store<fromStore.ShoppingState>, 
    // 
    private recipeService: RecipeService, 
    private nutritionService: NutritionService, 
    ) { 
    
    this.categories$ = this.store.select(fromStore.getAllCategories);
    
    this.router.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.products$ = this.store.select(fromStore.getProductsByCategory({category: this.category}));
    });
  }

  // shopping cart store actions
  addToCart(product: Product) {
    this.store.dispatch(fromStore.addToCart({product}));
  }
  
  removeFromCart(product: Product) {
    this.store.dispatch(fromStore.removeFromCart({product}));
  }
  
  getProductCartQuantity(product: Product): Observable<number> {
    return this.store.select(fromStore.getProductCartQuantity({product: product.key}));
  }
  // end cart


  // new ... card modals //
  
  // display main menu 
  showCardMenu(id:any) {
    this.closeAllOtherCardModals();
    const target_menu = document.getElementById(`card-menu-${id}`);
    target_menu.style.display = 'flex';
    const target_menu_btn = document.getElementById(`card-menu-button-${id}`);
    target_menu_btn.style.display = 'none';
    const target_reset_btn = document.getElementById(`card-reset-button-${id}`);
    target_reset_btn.style.display = 'flex';
  }

  // display nutrition card & api call 
  showCardNutrition(id:any, item:string) {
    const target_menu = document.getElementById(`card-menu-${id}`);
    target_menu.style.display = 'none';
    const target_nutrition = document.getElementById(`card-nutrition-${id}`);
    target_nutrition.style.display = 'flex';
    this.isNutritionLoading = true;
    this.nutritionService.getNutritionFacts(item)
      .subscribe(res => {
        this.currentNutrition = res;
        this.isNutritionLoading = false;
        console.log(`current nutrition: ${item}`, this.currentNutrition)
      });
  }

  // display recipe card & call api 
  showCardRecipes(id:any, item:string) {
    const target_menu = document.getElementById(`card-menu-${id}`);
    target_menu.style.display = 'none';
    const target_recipes = document.getElementById(`card-recipes-${id}`);
    target_recipes.style.display = 'flex';
    this.getRecipes(item);
  }

  // get more recipes 
  getRecipes(item:string) {
    this.isRecipesLoading = true;
    this.recipeService.getRecipes(item)
      .subscribe(res => {
        this.currentRecipes = res;
        this.isRecipesLoading = false;
        console.log(`current recipes: ${item}`, this.currentRecipes)
      });
  }

  // back button 
  resetCard(id:any) {
    const target_menu = document.getElementById(`card-menu-${id}`);
    target_menu.style.display = 'none';
    const target_nutrition = document.getElementById(`card-nutrition-${id}`);
    target_nutrition.style.display = 'none';
    const target_recipes = document.getElementById(`card-recipes-${id}`);
    target_recipes.style.display = 'none';
    const target_reset_btn = document.getElementById(`card-reset-button-${id}`);
    target_reset_btn.style.display = 'none';
    const target_menu_btn = document.getElementById(`card-menu-button-${id}`);
    target_menu_btn.style.display = 'flex';
  }

  // to close other product card options if new card selected to minimize api calls 
  closeAllOtherCardModals() {
    const allOtherModels = Array.from(document.getElementsByClassName('card-menu') as HTMLCollectionOf<HTMLElement>);
    allOtherModels.forEach(el => el.style.display = 'none');
    const allOtherBacks = Array.from(document.getElementsByClassName('reset') as HTMLCollectionOf<HTMLElement>);
    allOtherBacks.forEach(el => el.style.display = 'none');
    const allOtherOptions = Array.from(document.getElementsByClassName('options') as HTMLCollectionOf<HTMLElement>);
    allOtherOptions.forEach(el => el.style.display = 'flex');
  }
  // end card modals

  // 👉 TODO: CONVERT TO  PIPES | pipe 
  trimUnderscore(word: string): string {
    return word.split('_').join(' ').toLowerCase();
  }
  roundUpPercent(num: number): number {
    return Math.ceil(num);
  }
}

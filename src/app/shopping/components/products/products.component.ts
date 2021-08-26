import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/product';

// category|product store 
import { Store } from '@ngrx/store';
import * as fromStore from 'src/app/shared/store';

// working on removing services from component 
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';

// new 3rdp api services 
import { NutritionService } from 'src/app/shared/services/nutrition.service';
import { RecipeService } from 'src/app/shared/services/recipe.service';

import { 
  popin, 
  fadeIn, 
  slideInTop, 
  listAnimationWrap, 
  listAnimationItem, 
  listAnimationWrapCard, 
  listAnimationItemCard } from 'src/animations/anime';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  animations: [
    popin,
    fadeIn,
    slideInTop,
    listAnimationWrap,
    listAnimationItem,
    listAnimationWrapCard,
    listAnimationItemCard,
  ]
})

export class ProductsComponent implements OnInit, OnDestroy {
  public isAnimeDone = false; // remove plz 
  
  public subscriptionCart: Subscription; // cart 
  public cart: any;

  // 🏪 store // 
  // category 
  public categories$: Observable<Category[]>;
  public categoriesLoading$: Observable<boolean>;
  public category: string;
  // products 
  public products$: Observable<Product[]>;
  public productsLoading$: Observable<boolean>;
  // end store //

  // new card options 
  public isNutritionLoading: boolean;
  public currentNutrition: any = {};
  public isRecipesLoading: boolean;
  public currentRecipes: any = {};
  // 

  constructor( 
    private store: Store<fromStore.ShoppingState>, 
    // 
    private cartService: ShoppingCartService, 
    // 
    private nutritionService: NutritionService, 
    private recipeService: RecipeService, 
    private router: ActivatedRoute, 
    ) { 
    
    this.categoriesLoading$ = this.store.select(fromStore.getCategoriesLoading);
    this.categories$ = this.store.select(fromStore.getAllCategories);
    this.productsLoading$ = this.store.select(fromStore.getProductsLoading);
    
    this.router.queryParamMap.subscribe(params => {
      this.category = params.get('category');
      this.products$ = this.store.select(fromStore.getProductsByCategory({category: this.category}));
    });

    // get cart from local storage 
    let cartId = localStorage.getItem('cartId'); // pass to select 
    this.subscriptionCart = this.cartService.getCart(cartId).subscribe(cart => this.cart = cart);
  }

  // dispactch load actions in app.ts^ & select state where needed 
  ngOnInit() {}


// cart services
  addToCart(product: Product, i?: string) {
    this.cartService.addToCart(product);
    // console.log("",i)
    let btn = document.getElementById(i);
    btn.animate([
      {boxShadow: '0 0 0 0 hsla(29, 79%, 56%, 1)', transform: 'scale(1.025)'},
      {boxShadow: '0 0 10px 20px rgba(255,150,44,0)', transform: 'scale(1)'}
    ], {
      duration: 150
    });
  }
  removeFromCart(product: Product, i: string) {
    this.cartService.removeFromCart(product);
    // console.log("",i)
    let btn = document.getElementById(i);
    btn.animate([
      {transform: 'rotateX(360deg)', backgroundColor: 'hsla(29, 79%, 56%, 1)'},
      {transform: 'rotateX(0deg)', backgroundColor: 'hsla(29, 79%, 56%, 1)'}
    ], {
      duration: 150
    });
  }
  
  getQuantity(product: Product): number {
    if(!this.cart) {
      return 0;
    }
    let item = this.cart.items[product.key];
    // console.log("", this.cart)
    return item ? item.quantity : 0;
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

  // CAN CONVERT TO  PIPES | pipe 
  trimUnderscore(word: string): string {
    return word.split('_').join(' ').toLowerCase();
  }
  roundUpPercent(num: number): number {
    return Math.ceil(num);
  }

  // will not need after full store implementation 
  ngOnDestroy() {
    // this.subscription.unsubscribe();
    this.subscriptionCart.unsubscribe();
  }
}

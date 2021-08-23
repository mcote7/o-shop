import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

// category store
import { Store } from '@ngrx/store';
import * as fromStore from 'src/app/shared/store';
import { Category } from 'src/app/shared/models/category';
import { Product } from 'src/app/shared/models/product';

// working on removing services from component 
import { ProductService } from 'src/app/shared/services/product.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping-cart.service';
// new services 
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
  public isAnimeDone = false;

  public subscription: Subscription;
  public subscription2: Subscription;

  public products: any[] = [];
  public filteredProducts: any[] = [];

  public cart: any;
  public totItemsInCat: number = 0;

  // 🏪 store // 

  // category 
  public categories$: Observable<Category[]>;
  public categoriesLoaded$: Observable<boolean>;
  public categoriesLoading$: Observable<boolean>;
  public category: string;
  // products 

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
    private productService: ProductService, // next to go, he he he
    private cartService: ShoppingCartService, 
    // 
    private nutritionService: NutritionService, 
    private recipeService: RecipeService, // do more NgRx first... then play
    // 
    public route: ActivatedRoute, 
    ) { 
    
    // get all products & filter by category from route params 
    this.subscription = this.productService.getAll().subscribe(prod => {
      this.products = prod;
      route.queryParamMap.subscribe( params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ? 
          this.products.filter( p => p.category === this.category ) : 
          this.products;
      })
    });
    
    // get cart from local storage 
    let cartId = localStorage.getItem('cartId');
    this.subscription2 = this.cartService.getCart(cartId).subscribe(cart => this.cart = cart);
  }

  // dispactch load products in app.ts & select state here

  ngOnInit() {
    // this.store.dispatch(fromStore.loadCategories()); in app.ts as to call only once. 
    this.categoriesLoading$ = this.store.select(fromStore.getCategoriesLoading);
    this.categories$ = this.store.select(fromStore.getAllCategories);
  }

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



  // new card modals (needs re-factor)

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

    this.isRecipesLoading = true;

    // this.recipeService.getRecipes(item)
    //   .subscribe(res => {
    //     this.currentRecipes = res;
    //     this.isRecipesLoading = false;
    //     console.log(`current recipes: ${item}`, this.currentRecipes)
    //   });
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
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }
}

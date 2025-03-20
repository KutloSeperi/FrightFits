import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addToCart } from '../../store/cart/cart.actions';
import { selectCartCount, selectCartTotal } from '../../store/cart/cart.selectors';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  stock: number;
  badge?: string;
  oldPrice?: number;
  isFeatured?: boolean;
  showQuickView?: boolean;
}

interface Essential {
  id: number;
  title: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-shop',
  standalone: false,
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  essentials: Essential[] = [];
  selectedCategory: string = 'all';
  searchQuery: string = '';
  featuredProduct?: Product;

  // Observables for cart count and total
  cartCount$: Observable<number>;
  cartTotal$: Observable<number>;

  constructor(private store: Store) {
    this.cartCount$ = this.store.select(selectCartCount);
    this.cartTotal$ = this.store.select(selectCartTotal);
  }

  ngOnInit(): void {
    this.loadProducts();
    this.loadEssentials();
  }

  loadProducts(): void {
    this.products = [
      {
        id: 1,
        name: 'Phantom Queen Costume',
        price: 89.99,
        image: 'assets/images/featured-phantom.jpg',
        category: 'featured',
        description: 'Premium silk costume with hand-stitched details, including matching gloves, crown, and veil.',
        stock: 10,
        badge: 'Limited Edition',
        oldPrice: 129.99,
        isFeatured: true,
        showQuickView: false
      },
      {
        id: 2,
        name: 'Vampire Lord',
        price: 59.99,
        image: 'assets/images/vampire.jpg',
        category: 'horror',
        description: 'Velvet cape with blood-red lining, includes fangs and medallion',
        stock: 15,
        badge: '-20%',
        oldPrice: 74.99
      },
      {
        id: 3,
        name: 'Alpha Werewolf',
        price: 69.99,
        image: 'assets/images/werewolf.jpg',
        category: 'horror',
        description: 'Realistic fur costume with glowing eyes and claw gloves',
        stock: 5,
        badge: 'New'
      },
      {
        id: 4,
        name: 'Frankenstein',
        price: 79.99,
        image: 'assets/images/frankenstein.jpg',
        category: 'horror',
        description: 'Glow-in-the-dark costume with detachable neck bolts',
        stock: 8,
        badge: 'Eco-Friendly'
      },
      {
        id: 5,
        name: 'Dark Witch',
        price: 99.99,
        image: 'assets/images/witch.jpg',
        category: 'fantasy',
        description: 'Complete set with hat, broom, and spellbook',
        stock: 12,
        badge: 'Bundle Deal'
      },
      {
        id: 6,
        name: 'Rotten Zombie',
        price: 49.99,
        image: 'assets/images/zombie.jpg',
        category: 'horror',
        description: 'Realistic wound prosthetics included',
        stock: 7
      },
      {
        id: 7,
        name: 'Spectral Ghost',
        price: 39.99,
        image: 'assets/images/ghost.jpg',
        category: 'fantasy',
        description: 'Glowing ethereal costume with motion effects',
        stock: 20
      }
    ];

    this.featuredProduct = this.products.find(p => p.isFeatured);
    this.filteredProducts = this.products.filter(p => !p.isFeatured);
  }

  loadEssentials(): void {
    this.essentials = [
      {
        id: 1,
        title: 'Hats & Wigs',
        icon: 'hat-wizard',
        description: '200+ styles from classic to crazy'
      },
      {
        id: 2,
        title: 'Masks',
        icon: 'mask',
        description: 'Latex, plastic, and fabric options'
      },
      {
        id: 3,
        title: 'Props',
        icon: 'hand-sparkles',
        description: 'Weapons, jewelry, and magical items'
      },
      {
        id: 4,
        title: 'Makeup',
        icon: 'paint-brush',
        description: 'Kits and professional supplies'
      }
    ];
  }

  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.selectedCategory === 'all' || product.category === this.selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch && !product.isFeatured;
    });
  }

  addToCart(item: Product): void {
    if (item.stock > 0) {
      this.store.dispatch(addToCart({ item }));
      item.stock--;
    }
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.filterProducts();
  }
  
  // Note: Cart total is handled by the store; local calculation is not needed.
}

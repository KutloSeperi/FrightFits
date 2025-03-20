import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addToCart } from '../../store/cart/cart.actions';
import { Product } from '../../models/product';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CurrencyPipe]
})
export class HomeComponent {
  // Products declared locally (without IDs)
  products: Product[] = [
    { 
      name: 'Spooky Ghost', 
      price: 299.99, 
      image: 'assets/images/ghost.jpg' 
    },
    { 
      name: 'Wicked Witch', 
      price: 399.99, 
      image: 'assets/images/witch.jpg' 
    },
    { 
      name: 'Zombie', 
      price: 499.99, 
      image: 'assets/images/zombie.jpg' 
    },
    { 
      name: 'Vampire', 
      price: 349.99, 
      image: 'assets/images/vampire.jpg' 
    },
    { 
      name: 'Pirate', 
      price: 449.99, 
      image: 'assets/images/pirate.jpg' 
    },
    { 
      name: 'Creepy Clown', 
      price: 399.99, 
      image: 'assets/images/clown.jpg' 
    },
    { 
      name: 'Werewolf', 
      price: 599.99, 
      image: 'assets/images/werewolf.jpg' 
    },
    { 
      name: 'Skeleton', 
      price: 249.99, 
      image: 'assets/images/skeleton.jpg' 
    },
    { 
      name: 'Mummy', 
      price: 349.99, 
      image: 'assets/images/mummy.jpg' 
    }
  ];

  constructor(private store: Store) {}

  addToCart(product: Product): void {
    this.store.dispatch(addToCart({ item: product }));
    alert(`${product.name} added to cart!`);
  }
}

import { Component } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [CurrencyPipe] // Add CurrencyPipe to providers
})
export class HomeComponent {
  // Product data array
  products = [
    { 
      name: 'Spooky Ghost', 
      price: 299.99, 
      image: 'assets/images/gst.jpg' 
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

  // Cart items array
  cartItems: any[] = [];

  addToCart(product: any) {
    this.cartItems.push(product);
    alert(`${product.name} added to cart!\nNew total: R${this.calculateTotal().toFixed(2)}`);
  }

  private calculateTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }
}
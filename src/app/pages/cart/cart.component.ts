import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  @Input() cartItems: any[] = []; // Receive cart items from parent
  @Output() removeItem = new EventEmitter<number>(); // Emit event to remove item

  // Remove an item from the cart
  removeFromCart(index: number): void {
    this.removeItem.emit(index);
  }

  // Calculate the total price of items in the cart
  get cartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
}
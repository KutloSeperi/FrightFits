import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { removeFromCart } from '../../store/cart/cart.actions';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selectors';
import { Product } from '../../models/product';

@Component({
  selector: 'app-cart',
  standalone: false,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  // Local variables for data-binding in the template
  cartItems: Product[] = [];
  cartTotal: number = 0;
  cartItemsCount: number = 0;  // New variable for item count

  // Subscription holder to clean up observables
  private subscriptions: Subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Subscribe to cart items observable from NgRx store
    const itemsSub = this.store.select(selectCartItems).subscribe(items => {
      this.cartItems = items;
      this.cartItemsCount = items.length;  // Update cart count dynamically
    });
    // Subscribe to cart total observable from NgRx store
    const totalSub = this.store.select(selectCartTotal).subscribe(total => {
      this.cartTotal = total;
    });
    // Add subscriptions to be cleaned up later
    this.subscriptions.add(itemsSub);
    this.subscriptions.add(totalSub);
  }

  // Remove the cart item at the given index
  removeFromCart(index: number): void {
    const item = this.cartItems[index];
    if (item) {
      // Dispatch action to remove the item from the centralized state
      this.store.dispatch(removeFromCart({ item }));
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions to prevent memory leaks
    this.subscriptions.unsubscribe();
  }
}

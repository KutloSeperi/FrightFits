import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCartCount } from '../../store/cart/cart.selectors';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  // Declaring the observable as a property
  cartItemsCount$: Observable<number>;

  constructor(private store: Store) {
    // Initializing the observable after 'store' is injected
    this.cartItemsCount$ = this.store.select(selectCartCount);
  }

  ngOnInit(): void {
    // Any additional logic can be added here if necessary
  }

  ngOnDestroy(): void {
    // Cleanup if necessary, no manual subscription management needed here
  }
}

import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: false,
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  product: any; // Product object to store the selected product details
  products$!: Observable<any[]>; 

  constructor(private route: ActivatedRoute, private store: Store) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.product = this.getProductById(Number(productId)); // Find product by ID
    }
  }

  // Modify this to fetch the products from your store
  getProductById(id: number): any {
    const products = [
      { id: 1, name: 'Phantom Queen Costume', price: 89.99, image: '/assets/images/featured-phantom.jpg', description: 'Premium silk costume with hand-stitched details, including matching gloves, crown, and veil.' },
      { id: 2, name: 'Vampire Lord', price: 59.99, image: '/assets/images/vampire.jpg', description: 'Velvet cape with blood-red lining, includes fangs and medallion' },
      { id: 3, name: 'Alpha Werewolf', price: 69.99, image: '/assets/images/werewolf.jpg', description: 'Realistic fur costume with glowing eyes and claw gloves' },
      { id: 4, name: 'Frankenstein', price: 79.99, image: '/assets/images/frankenstein.jpg', description: 'Glow-in-the-dark costume with detachable neck bolts' },
      { id: 5, name: 'Dark Witch', price: 99.99, image: '/assets/images/witch.jpg', description: 'Complete set with hat, broom, and spellbook' },
      { id: 6, name: 'Rotten Zombie', price: 49.99, image: '/assets/images/zombie.jpg', description: 'Realistic wound prosthetics included' },
      { id: 7, name: 'Spectral Ghost', price: 39.99, image: '/assets/images/ghost.jpg', description: 'Glowing ethereal costume with motion effects' },
    ];
    return products.find(product => product.id === id);
  }
}

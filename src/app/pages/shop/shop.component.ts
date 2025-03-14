import { Component, OnInit } from '@angular/core';

// Define Product Interface
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
  showQuickView?: boolean; // Add this property
}

// Define Accessory Interface
interface Accessory {
  id: number;
  name: string;
  price: number;
  image: string;
}

// Define Essential Interface
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
  // Component State
  products: Product[] = [];
  filteredProducts: Product[] = [];
  accessories: Accessory[] = [];
  essentials: Essential[] = [];
  cartItems: (Product | Accessory)[] = []; // Cart items array
  selectedCategory: string = 'all';
  searchQuery: string = '';
  featuredProduct?: Product;

  // Mock Data
  ngOnInit(): void {
    this.loadProducts();
    this.loadAccessories();
    this.loadEssentials();
  }

  // Load Products
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
        showQuickView: false // Initialize to false
      },
      {
        id: 2,
        name: 'Vampire Lord',
        price: 59.99,
        image: 'assets/images/vampire-costume.jpg',
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
        image: 'assets/images/werewolf-costume.jpg',
        category: 'horror',
        description: 'Realistic fur costume with glowing eyes and claw gloves',
        stock: 5,
        badge: 'New'
      },
      {
        id: 4,
        name: 'Frankenstein',
        price: 79.99,
        image: 'assets/images/frankenstein-costume.jpg',
        category: 'horror',
        description: 'Glow-in-the-dark costume with detachable neck bolts',
        stock: 8,
        badge: 'Eco-Friendly'
      },
      {
        id: 5,
        name: 'Dark Witch',
        price: 99.99,
        image: 'assets/images/witch-costume.jpg',
        category: 'fantasy',
        description: 'Complete set with hat, broom, and spellbook',
        stock: 12,
        badge: 'Bundle Deal'
      },
      {
        id: 6,
        name: 'Rotten Zombie',
        price: 49.99,
        image: 'assets/images/zombie-costume.jpg',
        category: 'horror',
        description: 'Realistic wound prosthetics included',
        stock: 7
      },
      {
        id: 7,
        name: 'Spectral Ghost',
        price: 39.99,
        image: 'assets/images/ghost-costume.jpg',
        category: 'fantasy',
        description: 'Glowing ethereal costume with motion effects',
        stock: 20
      }
    ];

    this.featuredProduct = this.products.find(p => p.isFeatured);
    this.filteredProducts = this.products.filter(p => !p.isFeatured);
  }

  // Load Accessories
  loadAccessories(): void {
    this.accessories = [
      {
        id: 1,
        name: 'Premium Vampire Fangs',
        price: 19.99,
        image: 'assets/images/vampire-fangs.jpg'
      },
      {
        id: 2,
        name: 'Retractable Claw Gloves',
        price: 29.99,
        image: 'assets/images/werewolf-claws.jpg'
      },
      {
        id: 3,
        name: 'Enchanted Witch Hat',
        price: 34.99,
        image: 'assets/images/witch-hat.jpg'
      },
      {
        id: 4,
        name: 'Professional FX Makeup Kit',
        price: 49.99,
        image: 'assets/images/zombie-makeup.jpg'
      }
    ];
  }

  // Load Essentials
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

  // Filter Products by Category and Search
  filterProducts(): void {
    this.filteredProducts = this.products.filter(product => {
      const matchesCategory = this.selectedCategory === 'all' || 
                            product.category === this.selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(
                            this.searchQuery.toLowerCase());
      return matchesCategory && matchesSearch && !product.isFeatured;
    });
  }

  // Add Item to Cart (Product or Accessory)
  addToCart(item: Product | Accessory): void {
    if ('stock' in item) {
      if (item.stock > 0) {
        this.cartItems.push(item);
        item.stock--;
      }
    } else {
      this.cartItems.push(item);
    }
  }

  // Remove Item from Cart
  removeFromCart(index: number): void {
    const removedItem = this.cartItems.splice(index, 1)[0];
    if ('stock' in removedItem) {
      removedItem.stock++; // Restore stock if it's a product
    }
  }

  // Change Selected Category
  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.filterProducts();
  }

  // Calculate Cart Total
  get cartTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
}
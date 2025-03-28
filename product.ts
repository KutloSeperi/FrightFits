export interface Product {
    id?: number;         
    name: string;
    price: number;
    image: string;
    category?: string;   // Used in Shop
    description?: string; // Used in Shop
    stock?: number;       // Used in Shop
    badge?: string;       // Used in Shop
    oldPrice?: number;    // Used in Shop
    isFeatured?: boolean; // Used in Shop
    showQuickView?: boolean; // Used in Shop
  }
  
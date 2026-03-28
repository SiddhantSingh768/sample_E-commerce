export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  thumbnails: string[];
  featured?: boolean;
}

export const CATEGORIES = ["All", "Clothing", "Electronics", "Home", "Accessories"];

export const products: Product[] = [
  {
    id: "p1",
    name: "Minimalist Chronograph Watch",
    price: 129.99,
    description: "A sleek, minimalist chronograph watch with a matte black finish and a genuine leather strap. Perfect for both casual and formal occasions.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    thumbnails: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=400"
    ],
    featured: true,
  },
  {
    id: "p2",
    name: "Wireless Noise-Cancelling Headphones",
    price: 249.50,
    description: "Experience pure sound with our industry-leading noise cancellation. Features 30-hour battery life and plush ear cushions for all-day comfort.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    thumbnails: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&q=80&w=400"
    ],
    featured: true,
  },
  {
    id: "p3",
    name: "Organic Cotton Essential Tee",
    price: 29.00,
    description: "The perfect everyday t-shirt. Made from 100% organic cotton, it's incredibly soft, breathable, and sustainably sourced.",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    thumbnails: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=400"
    ],
    featured: true,
  },
  {
    id: "p4",
    name: "Ceramic Pour-Over Coffee Maker",
    price: 45.00,
    description: "Brew the perfect cup of coffee with this elegant ceramic pour-over dripper. Designed for optimal heat retention and extraction.",
    category: "Home",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=800",
    thumbnails: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=400"
    ],
    featured: true,
  },
  {
    id: "p5",
    name: "Classic Canvas Sneakers",
    price: 65.00,
    description: "Timeless design meets modern comfort. These canvas sneakers feature a durable rubber sole and a cushioned footbed.",
    category: "Clothing",
    image: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800",
    thumbnails: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=400"
    ],
  },
  {
    id: "p6",
    name: "Smart Home Hub",
    price: 149.99,
    description: "Control your entire home with a single touch. Compatible with thousands of smart devices, featuring voice control and automation routines.",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&q=80&w=800",
    thumbnails: [
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&q=80&w=400"
    ],
  },
  {
    id: "p7",
    name: "Leather Weekend Duffel",
    price: 185.00,
    description: "Crafted from full-grain leather, this spacious duffel bag is perfect for short getaways. Features brass hardware and a detachable shoulder strap.",
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800",
    thumbnails: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?auto=format&fit=crop&q=80&w=400"
    ],
  },
  {
    id: "p8",
    name: "Hand-Poured Soy Candle",
    price: 24.00,
    description: "Fill your space with the calming scent of lavender and cedarwood. Made with 100% natural soy wax and a cotton wick for a clean burn.",
    category: "Home",
    image: "https://images.unsplash.com/photo-1602874801007-bd458cb6c975?auto=format&fit=crop&q=80&w=800",
    thumbnails: [
      "https://images.unsplash.com/photo-1602874801007-bd458cb6c975?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=400"
    ],
  }
];

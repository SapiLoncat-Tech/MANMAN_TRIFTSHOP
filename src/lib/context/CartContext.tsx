'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { allProducts } from '@/lib/data';

export type CartItem = {
  id: number;
  productId: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (productId: number) => void;
  removeFromCart: (itemId: number) => void;
  clearCart: () => void;
  totalPrice: number;
  itemCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('trifshop_cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart');
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to local storage when items change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('trifshop_cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (productId: number) => {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    setItems(prev => {
      // Periksa apakah produk sudah ada (tambahkan quantity jika ada, untuk barang preloved mungkin hanya 1 tapi anggap bisa nambah)
      const existingItem = prev.find(item => item.productId === productId);
      if (existingItem) {
        return prev.map(item => 
          item.productId === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // Jika belum ada, masukkan sebagai barang baru
      return [...prev, {
        id: Date.now(),
        productId: product.id,
        title: product.title,
        price: product.price,
        image: product.image,
        quantity: 1
      }];
    });
  };

  const removeFromCart = (itemId: number) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, totalPrice, itemCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

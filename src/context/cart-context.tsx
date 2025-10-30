"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export type CartItem = {
  cookieId: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (cookieId: string) => void;
  increaseQuantity: (cookieId: string) => void;
  decreaseQuantity: (cookieId: string) => void;
  removeItem: (cookieId: string) => void;
  clearCart: () => void;
  totalItems: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((cookieId: string) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.cookieId === cookieId);
      if (existing) {
        return prev.map((item) =>
          item.cookieId === cookieId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { cookieId, quantity: 1 }];
    });
  }, []);

  const increaseQuantity = useCallback((cookieId: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.cookieId === cookieId
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    );
  }, []);

  const decreaseQuantity = useCallback((cookieId: string) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.cookieId === cookieId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const removeItem = useCallback((cookieId: string) => {
    setItems((prev) => prev.filter((item) => item.cookieId !== cookieId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      increaseQuantity,
      decreaseQuantity,
      removeItem,
      clearCart,
      totalItems,
    }),
    [
      addItem,
      clearCart,
      decreaseQuantity,
      increaseQuantity,
      items,
      removeItem,
      totalItems,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

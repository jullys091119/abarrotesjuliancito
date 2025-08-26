"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

interface Product {
  id: string;
  nombre: string;
  precio: number;
  cantidad: number;
  inventario: number;
  proveedor: string;
  imagen: string;
  categoria: string;
}

interface Provider {
  img: string;
  navigator: string;
}

interface MyContextType {
  products: Product[];
  allProducts: Product[];
  productPerProvedor: Product[];
  quantity: Record<string, Record<string, number>>;
  data: Provider[];
  getData: () => void;
  getProducts: () => void;
  showProductsPerProveedor: (name: string) => void;
  addQuantityProducts: (proveedor: string, id: string) => void;
  restQuantityProducts: (proveedor: string, id: string) => void;
  getTotalById: (proveedor: string, id: string) => string;
  getTotalGeneral: () => string;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [productPerProvedor, setProductPerProvedor] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<Record<string, Record<string, number>>>({});
  const [data, setData] = useState<Provider[]>([]);

  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "logoProvedores"));
    const item = querySnapshot.docs.map(doc => ({
      img: doc.data().imagen,
      navigator: doc.data().nombre
    }));
    setData(item);
  };

  const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "productos"));
    const items: Product[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      precio: Number(doc.data().precio),
      cantidad: Number(doc.data().cantidad) || 0
    }));
    setProducts(items);
    setAllProducts(items);
  };

  const showProductsPerProveedor = async (name: string) => {
    const q = query(collection(db, "productos"), where("proveedor", "==", name.trim()));
    const querySnapshot = await getDocs(q);
    const items: Product[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      precio: Number(doc.data().precio),
      cantidad: Number(doc.data().cantidad) || 0
    }));
    setProductPerProvedor(items);
    setProducts(items);
  };

  const addQuantityProducts = (proveedor: string, id: string) => {
    setQuantity(prev => ({
      ...prev,
      [proveedor]: {
        ...prev[proveedor],
        [id]: (prev[proveedor]?.[id] || 0) + 1
      }
    }));
  };

  const restQuantityProducts = (proveedor: string, id: string) => {
    setQuantity(prev => ({
      ...prev,
      [proveedor]: {
        ...prev[proveedor],
        [id]: Math.max((prev[proveedor]?.[id] || 0) - 1, 0)
      }
    }));
  };

  const getTotalById = (proveedor: string, id: string): string => {
    const qty = quantity[proveedor]?.[id] || 0;
    const product = allProducts.find(p => p.id === id);
    return product ? (qty * product.precio).toFixed(2) : "0.00";
  };

  const getTotalGeneral = (): string => {
    let total = 0;
    for (const proveedor in quantity) {
      for (const id in quantity[proveedor]) {
        const qty = quantity[proveedor][id];
        const product = allProducts.find(p => p.id === id);
        if (product) total += qty * product.precio;
      }
    }
    return total.toFixed(2);
  };

  useEffect(() => {
    getProducts();
    getData();
  }, []);

  return (
    <MyContext.Provider
      value={{
        products,
        allProducts,
        productPerProvedor,
        quantity,
        data,
        getData,
        getProducts,
        showProductsPerProveedor,
        addQuantityProducts,
        restQuantityProducts,
        getTotalById,
        getTotalGeneral
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error("useMyContext must be used within MyContextProvider");
  return context;
};
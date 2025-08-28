"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

// ====================== TIPOS ======================
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

type Producto = {
  cantidad: number;
  nombre: string;
};

type QuantityState = {
  [proveedor: string]: {
    [id: string]: Producto;
  };
};

interface MyContextType {
  products: Product[];
  allProducts: Product[];
  productPerProvedor: Product[];
  quantity: QuantityState;
  data: Provider[];
  getData: () => void;
  getProducts: () => void;
  showProductsPerProveedor: (name: string) => void;
  addQuantityProducts: (proveedor: string, id: string, nombre: string) => void;
  restQuantityProducts: (proveedor: string, id: string) => void;
  getTotalById: (proveedor: string, id: string) => string;
  getTotalGeneral: () => string;
  openDrawer: boolean;
  setOpenDrawer: (open: boolean) => void;
}

// ====================== CONTEXTO ======================
const MyContext = createContext<MyContextType | undefined>(undefined);

export const MyContextProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [productPerProvedor, setProductPerProvedor] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState<QuantityState>({});
  const [data, setData] = useState<Provider[]>([]);
  const [openDrawer, setOpenDrawer] = useState(false);

  // ====================== FIREBASE ======================
  const getData = async () => {
    const querySnapshot = await getDocs(collection(db, "logoProvedores"));
    const item = querySnapshot.docs.map((doc) => ({
      img: doc.data().imagen,
      navigator: doc.data().nombre,
    }));
    setData(item);
  };

  const getProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "productos"));
    const items: Product[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      precio: Number(doc.data().precio),
      cantidad: Number(doc.data().cantidad) || 0,
    })) as Product[];
    setProducts(items);
    setAllProducts(items);
  };

  const showProductsPerProveedor = async (name: string) => {
    const q = query(collection(db, "productos"), where("proveedor", "==", name.trim()));
    const querySnapshot = await getDocs(q);
    const items: Product[] = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      precio: Number(doc.data().precio),
      cantidad: Number(doc.data().cantidad) || 0,
    })) as Product[];
    setProductPerProvedor(items);
    setProducts(items);
  };

  // ====================== LÓGICA DE CANTIDADES ======================
  const addQuantityProducts = (proveedor: string, id: string, nombre: string, precio: number, imagen: string) => {
    setQuantity((prev) => ({
      ...prev,
      [proveedor]: {
        ...prev[proveedor],
        [id]: {
          cantidad: (prev[proveedor]?.[id]?.cantidad || 0) + 1,
          nombre,
          precio,
          imagen,

        },
      },
    }));
  };

  const restQuantityProducts = (proveedor: string, id: string) => {
  setQuantity((prev) => {
    const currentCantidad = prev[proveedor]?.[id]?.cantidad || 0;

    if (currentCantidad <= 1) {
      const newProveedor = { ...prev[proveedor] };
      delete newProveedor[id];

      // Si ya no quedan productos, eliminamos el proveedor
      if (Object.keys(newProveedor).length === 0) {
        const newState = { ...prev };
        delete newState[proveedor];
        return newState;
      }

      return { ...prev, [proveedor]: newProveedor };
    }

    return {
      ...prev,
      [proveedor]: {
        ...prev[proveedor],
        [id]: {
          ...prev[proveedor][id],
          cantidad: currentCantidad - 1,
        },
      },
    };
  });
};

  const getTotalById = (proveedor: string, id: string): string => {
    const producto = quantity[proveedor]?.[id];
    if (!producto) return "0.00";
    const product = allProducts.find((p) => p.id === id);
    return product ? (producto.cantidad * product.precio).toFixed(2) : "0.00";
  };

  const getTotalGeneral = (): string => {
    let total = 0;
    for (const proveedor in quantity) {
      for (const id in quantity[proveedor]) {
        const producto = quantity[proveedor][id];
        const product = allProducts.find((p) => p.id === id);
        if (product) total += producto.cantidad * product.precio;
      }
    }
    return total.toFixed(2);
  };

  // ====================== EFECTOS ======================
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
        getTotalGeneral,
        setOpenDrawer,
        openDrawer,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

// ====================== HOOK ======================
export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) throw new Error("useMyContext must be used within MyContextProvider");
  return context;
};

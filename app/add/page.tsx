// app/add-product/page.tsx
"use client";

import { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddProduct() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState<number | "">("");
  const [cantidad, setCantidad] = useState<number | "">("");
  const [inventario, setInventario] = useState<number | "">("");
  const [categoria, setCategoria] = useState("");
  const [imagen, setImagen] = useState("");
  const [proveedor, setProveedor] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await addDoc(collection(db, "productos"), {
        nombre,
        precio: Number(precio),
        cantidad: Number(cantidad),
        inventario: Number(inventario),
        categoria,
        imagen,
        proveedor,
      });

      setMessage("Producto agregado correctamente ✅");
      // Limpiar campos
      setNombre("");
      setPrecio("");
      setCantidad("");
      setInventario("");
      setCategoria("");
      setImagen("");
      setProveedor("");
    } catch (error) {
      console.error("Error al agregar producto:", error);
      setMessage("Error al agregar producto ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Agregar Producto</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Precio (ej. 20)"
          value={precio}
          onChange={(e) => setPrecio(e.target.value ? Number(e.target.value) : "")}
          required
        />
        <input
          type="number"
          placeholder="Cantidad inicial (ej. 0)"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value ? Number(e.target.value) : "")}
          required
        />
        <input
          type="number"
          placeholder="Inventario total (ej. 20)"
          value={inventario}
          onChange={(e) => setInventario(e.target.value ? Number(e.target.value) : "")}
          required
        />
        <input
          type="text"
          placeholder="Categoría (ej. galleta)"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL de imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Proveedor (ej. gamesa)"
          value={proveedor}
          onChange={(e) => setProveedor(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {loading ? "Agregando..." : "Agregar Producto"}
        </button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}

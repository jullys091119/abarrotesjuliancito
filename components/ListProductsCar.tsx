"use client";
import { useMyContext } from "@/app/context/context";

export default function ProductList() {
  const { quantity, addQuantityProducts, restQuantityProducts, getTotalGeneral } = useMyContext();

  const totalGeneral = getTotalGeneral();

  const hasProducts = Object.keys(quantity).length > 0;

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto py-4">
      {hasProducts ? (
        <>
          {Object.entries(quantity).map(([proveedor, productos]) => (
            <div key={proveedor} className="flex flex-col gap-3">
              <h3 className="font-bold">{proveedor}</h3>
              {Object.entries(productos).map(([id, prod]) => (
                <div key={id} className="flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={prod.imagen || "/placeholder.png"}
                      alt={prod.nombre}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-semibold">{prod.nombre}</p>
                      <p className="text-sm text-gray-600">${prod.precio}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded"
                      onClick={() => restQuantityProducts(proveedor, id)}
                    >
                      -
                    </button>
                    <span>{prod.cantidad}</span>
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded"
                      onClick={() =>
                        addQuantityProducts(proveedor, id, prod.nombre, prod.precio, prod.imagen)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Total y botón Comprar */}
          <div className="mt-4 flex flex-col items-end gap-2">
            <span className="font-bold text-lg">Total: ${totalGeneral}</span>
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Comprar
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No hay compras realizadas</p>
      )}
    </div>
  );
}

"use client";

import { useMyContext } from "@/app/context/context";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function ProductList() {
  const { quantity, addQuantityProducts, restQuantityProducts, getTotalGeneral } = useMyContext();
  const router = useRouter();

  const totalGeneral = getTotalGeneral();
  const hasProducts = Object.keys(quantity).length > 0;

  const handleComprar = () => {
    // Aquí podrías guardar el pedido en tu backend antes
    // Luego rediriges a la página de seguimiento / mapa
    router.push("/order"); 
  };

  return (
    <div className="flex flex-col gap-4 max-w-md py-4 mx-auto">
      {hasProducts ? (
        <>
          {Object.entries(quantity).map(([proveedor, productos]) => (
            <div key={proveedor} className="flex flex-col gap-3 border p-2 rounded">
              <h2 className="font-bold text-lg">{proveedor}</h2>

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
                    <Button
                      isIconOnly
                      aria-label="Incrementar"
                      color="danger"
                      variant="faded"
                      onPress={() =>
                        addQuantityProducts(proveedor, id, prod.nombre, prod.precio, prod.imagen)
                      }
                    >
                      <span>+</span>
                    </Button>

                    <span className="my-2">{prod.cantidad}</span>

                    <Button
                      isIconOnly
                      aria-label="Decrementar"
                      color="warning"
                      variant="faded"
                      onPress={() => restQuantityProducts(proveedor, id)}
                    >
                      <span>-</span>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {/* Total y botón Comprar */}
          <div className="mt-4 flex flex-col items-end gap-2">
            <span className="font-bold text-lg">Total: ${totalGeneral}</span>
            <Button color="primary" onPress={handleComprar}>
              Comprar
            </Button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500">No hay compras realizadas</p>
      )}
    </div>
  );
}

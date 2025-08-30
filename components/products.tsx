"use client";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { useMyContext } from "@/app/context/context";
import { useEffect } from "react";

export default function Products() {
  const {
    productPerProvedor,
    addQuantityProducts,
    restQuantityProducts,
    quantity,
    products,
  } = useMyContext();

  useEffect(() => {
    console.log(productPerProvedor);
  }, [productPerProvedor]);

  return (
    <div className="noScrollbar py-12">
      <div className="product-grid flex justify-center items-center gap-6 flex-wrap">
        {(productPerProvedor.length ? productPerProvedor : products)?.map((item) => (
          <Card
            key={item.id}
            className="relative w-[160px] h-[300px] rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
            shadow="sm"
          >
            <Badge
              content={quantity[item.proveedor]?.[item.id]?.cantidad || 0}
              shape="circle"
              className="absolute top-3 right-3 z-10 bg-red-500 text-white"
            />

            <CardBody className="overflow-hidden p-0 flex items-center justify-center h-[180px] bg-gray-50">
              {item.imagen ? (
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className="w-full h-full object-cover rounded-t-xl"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-200">
                  <span className="text-gray-500 text-sm">No Image</span>
                </div>
              )}
            </CardBody>

            <div className="flex justify-between items-center px-4 py-2 gap-2">
              <Button
                isIconOnly
                aria-label="Incrementar"
                color="success"
                variant="faded"
                className="transition-transform hover:scale-110"
                onPress={() =>
                  addQuantityProducts(item.proveedor, item.id, item.nombre, item.precio, item.imagen)
                }
              >
                +
              </Button>
              <span className="font-semibold text-sm">
                {quantity[item.proveedor]?.[item.id]?.cantidad || 0}
              </span>
              <Button
                isIconOnly
                aria-label="Decrementar"
                color="danger"
                variant="faded"
                className="transition-transform hover:scale-110"
                onPress={() => restQuantityProducts(item.proveedor, item.id)}
              >
                -
              </Button>
            </div>

            <CardFooter className="flex flex-col items-start px-3 py-2 bg-white">
              <span className="text-sm font-semibold truncate">{item.nombre}</span>
              <span className="text-sm text-gray-700 font-bold">
                ${item.precio.toFixed(2)}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

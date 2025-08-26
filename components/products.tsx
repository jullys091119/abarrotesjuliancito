import { Card, CardBody, CardFooter } from "@heroui/card";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { useMyContext } from "@/app/context/context";

export default function Products() {
  const {
    productPerProvedor,
    addQuantityProducts,
    restQuantityProducts,
    quantity,
    products,
  } = useMyContext();

  return (
    <div className="noScrollbar py-12">
      <div
        className="
        product-grid
          flex
          justify-center
          items-center
          gap-[18px]
          justify-items-center
          flex-wrap
        "
      >
      {(productPerProvedor.length ? productPerProvedor : products)?.map((item) => (
          <Card
            key={item.id}
            className="h-[286px] relative w-[160px]"
            shadow="sm"
          >
            <Badge
              content={quantity[item.proveedor]?.[item.id] || 0}
              shape="circle"
              className="absolute top-[14px] right-5 z-2"
            />

            <CardBody className="overflow-hidden p-0 flex  h-[180px]">
              {item.imagen && (
                <img
                  src={item.imagen || "/placeholder.png"}
                  alt={item.nombre}
                  className="max-w-full max-h-full object-cover"
                />
              )}
            </CardBody>


            <div className="flex py-2 justify-between px-4 gap-2">
              <Button
                isIconOnly
                aria-label="Incrementar"
                color="danger"
                variant="faded"
                onPress={() => addQuantityProducts(item.proveedor, item.id)}
              >
                <span>+</span>
              </Button>
              <Button
                isIconOnly
                aria-label="Decrementar"
                color="warning"
                variant="faded"
                onPress={() => restQuantityProducts(item.proveedor, item.id)}
              >
                <span>-</span>
              </Button>
            </div>

            <CardFooter className="text-small justify-between px-2">
              <b className="titleProducts text-sm">{item.nombre}</b>
              <span className="text-sm">${item.precio.toFixed(2)}</span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

"use client"
import { Image } from "@heroui/image";
import { useMyContext } from "../app/context/context";
import Products from "../components/products";
import { useEffect } from "react";
import Wocomerce from "@/components/Wocomerce";

export default function ProviderSlider() {
  const { data, getData, count, showProductsPerProveedor } = useMyContext();

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <Wocomerce count={count} total={count * 10} />
      <div className="flex gap-2 overflow-x-auto noScrollbar flex-nowrap containerSlider my-6 md:flex-wrap">
        {data && data.map((item, index) => (
          <Image
            key={index}
            isZoomed
            alt={`HeroUI Fruit Image ${item}`}
            src={item.img}
            className="cardProvider"
            onClick={() => showProductsPerProveedor(item.navigator)}
          />
        ))}
      </div>
     
      <div>
        <Products />
      </div>
    </>
  );
}

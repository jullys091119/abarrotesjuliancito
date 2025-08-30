"use client";

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
      <div className="flex gap-4 overflow-x-auto noScrollbar flex-nowrap containerSlider px-4 pt-10 pb-6">
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              onClick={() => showProductsPerProveedor(item.navigator)}
              className="w-40 h-36 sm:w-44 sm:h-40 md:w-48 md:h-32 lg:w-36 lg:h-30 flex-shrink-0 bg-white rounded-xl shadow hover:shadow-lg cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-105 flex justify-center items-center"
            >
              <div className="w-full h-full flex justify-center items-center">
                <Image
                  isZoomed
                  alt={`Proveedor ${item.name || index}`}
                  src={item.img}
                  className="object-contain w-full h-full" 
                />
              </div>
            </div>
          ))}
      </div>

      <div>
        <Products />
      </div>
    </>
  );
}

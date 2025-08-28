import React, { useMemo } from "react";
import { ShoppingCart } from "lucide-react";
import { useMyContext } from "@/app/context/context";
import DrawerSales from "./DrawerSales";

export default function Wocomerce() {
  const { quantity, getTotalGeneral, openDrawer, setOpenDrawer } = useMyContext();

  const totalItems = useMemo(() => {
    return Object.values(quantity).reduce((accProv, provObj) => {
      return (
        accProv +
        Object.values(provObj).reduce((acc, prod) => acc + prod.cantidad, 0)
      );
    }, 0);
  }, [quantity]);

  const totalGeneral = useMemo(() => getTotalGeneral(), [quantity, getTotalGeneral]);

  return (
    <>
      <div
        className="fixed 
        woocommerce-button
        z-50 bg-[#1b8057]
        rounded-lg
        shadow-lg
        p-4 flex
        flex-col
        items-center
        w-[80px] h-[110px]"
        onClick={() => setOpenDrawer(true)}
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2">
          <ShoppingCart className="w-6 h-6 text-white" />
        </div>
        <div className="text-center flex gap-2 items-center mb-1">
          <span className="font-bold">{totalItems}</span>
          <span className="text-white text-sm my-1">Items</span>
        </div>
        <div className="text-white font-bold text-sm">
          <span>${totalGeneral}</span>
        </div>
      </div>
      <DrawerSales />
    </>
  );
}

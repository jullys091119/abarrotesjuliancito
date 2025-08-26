import React, { useMemo } from "react";
import { ShoppingCart } from "lucide-react";
import { useMyContext } from "@/app/context/context";

export default function Wocomerce() {
  const { quantity, getTotalGeneral } = useMyContext();

  const totalItems = useMemo(() => {
    return Object.values(quantity).reduce((accProv, provObj) => {
      return accProv + Object.values(provObj).reduce((acc, qty) => acc + qty, 0);
    }, 0);
  }, [quantity]);

  const totalGeneral = useMemo(() => getTotalGeneral(), [quantity, getTotalGeneral]);

  return (
    <div className="fixed right-6 bottom-6 z-50 bg-[#1b8057] rounded-lg shadow-lg p-4 flex flex-col items-center w-[80px] h-[110px]">
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
  );
}
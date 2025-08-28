import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerBody, DrawerFooter } from "@heroui/drawer";
import { Button } from "@heroui/button";
import { useMyContext } from "@/app/context/context";
import ListProductsCar from "./ListProductsCar";

export default function DrawerSales() {
  
  const { openDrawer,setOpenDrawer } = useMyContext();

  return (
    <>
      <Drawer isOpen={openDrawer} onClose={() => setOpenDrawer(false)} placement="right"  size="sm">
        <DrawerContent>
          <DrawerHeader>Carrito</DrawerHeader>
          <DrawerBody>
            <ListProductsCar /> 
          </DrawerBody>
          <DrawerFooter>
            <Button onClick={() => setOpenDrawer(false)}>Cerrar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
// src/components/ui/drawer.tsx

"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { cn } from "@/lib/utils";

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;
const DrawerPortal = DrawerPrimitive.Portal;
const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

// Custom Wrapper for Wallet Drawer
export const WalletDrawer = () => (
  <Drawer>
    <DrawerTrigger>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
        Open Wallet
      </button>
    </DrawerTrigger>

    <DrawerContent>
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">Select Wallet Provider</h2>
        <DynamicWidget />
      </div>
      <DrawerClose>
        <button className="mb-4 mx-auto block px-4 py-2 text-sm underline">
          Close
        </button>
      </DrawerClose>
    </DrawerContent>
  </Drawer>
);

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
};

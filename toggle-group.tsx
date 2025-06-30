<<<<<<< HEAD
import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"
=======
import * as React from "react";
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { toggleVariants } from "@/components/ui/toggle";
>>>>>>> 352ef7c (Initial commit)

const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
<<<<<<< HEAD
})
=======
});
>>>>>>> 352ef7c (Initial commit)

const ToggleGroup = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
<<<<<<< HEAD
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName
=======
));

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName;
>>>>>>> 352ef7c (Initial commit)

const ToggleGroupItem = React.forwardRef<
  React.ElementRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
<<<<<<< HEAD
  const context = React.useContext(ToggleGroupContext)
=======
  const context = React.useContext(ToggleGroupContext);
>>>>>>> 352ef7c (Initial commit)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
<<<<<<< HEAD
        className
=======
        className,
>>>>>>> 352ef7c (Initial commit)
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
<<<<<<< HEAD
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
=======
  );
});

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName;

export { ToggleGroup, ToggleGroupItem };
>>>>>>> 352ef7c (Initial commit)

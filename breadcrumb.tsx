<<<<<<< HEAD
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { ChevronRight, MoreHorizontal } from "lucide-react"

import { cn } from "@/lib/utils"
=======
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";
>>>>>>> 352ef7c (Initial commit)

const Breadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
<<<<<<< HEAD
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
Breadcrumb.displayName = "Breadcrumb"
=======
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />);
Breadcrumb.displayName = "Breadcrumb";
>>>>>>> 352ef7c (Initial commit)

const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  React.ComponentPropsWithoutRef<"ol">
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
<<<<<<< HEAD
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"
=======
      className,
    )}
    {...props}
  />
));
BreadcrumbList.displayName = "BreadcrumbList";
>>>>>>> 352ef7c (Initial commit)

const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
<<<<<<< HEAD
))
BreadcrumbItem.displayName = "BreadcrumbItem"
=======
));
BreadcrumbItem.displayName = "BreadcrumbItem";
>>>>>>> 352ef7c (Initial commit)

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
<<<<<<< HEAD
    asChild?: boolean
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a"
=======
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
>>>>>>> 352ef7c (Initial commit)

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
<<<<<<< HEAD
  )
})
BreadcrumbLink.displayName = "BreadcrumbLink"
=======
  );
});
BreadcrumbLink.displayName = "BreadcrumbLink";
>>>>>>> 352ef7c (Initial commit)

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<"span">
>(({ className, ...props }, ref) => (
  <span
    ref={ref}
    role="link"
    aria-disabled="true"
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
<<<<<<< HEAD
))
BreadcrumbPage.displayName = "BreadcrumbPage"
=======
));
BreadcrumbPage.displayName = "BreadcrumbPage";
>>>>>>> 352ef7c (Initial commit)

const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
<<<<<<< HEAD
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"
=======
);
BreadcrumbSeparator.displayName = "BreadcrumbSeparator";
>>>>>>> 352ef7c (Initial commit)

const BreadcrumbEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
<<<<<<< HEAD
)
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis"
=======
);
BreadcrumbEllipsis.displayName = "BreadcrumbElipssis";
>>>>>>> 352ef7c (Initial commit)

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
<<<<<<< HEAD
}
=======
};
>>>>>>> 352ef7c (Initial commit)

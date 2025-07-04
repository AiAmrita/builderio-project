<<<<<<< HEAD
import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"

import { cn } from "@/lib/utils"
=======
import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { Dot } from "lucide-react";

import { cn } from "@/lib/utils";
>>>>>>> 352ef7c (Initial commit)

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
  <OTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
<<<<<<< HEAD
      containerClassName
=======
      containerClassName,
>>>>>>> 352ef7c (Initial commit)
    )}
    className={cn("disabled:cursor-not-allowed", className)}
    {...props}
  />
<<<<<<< HEAD
))
InputOTP.displayName = "InputOTP"
=======
));
InputOTP.displayName = "InputOTP";
>>>>>>> 352ef7c (Initial commit)

const InputOTPGroup = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center", className)} {...props} />
<<<<<<< HEAD
))
InputOTPGroup.displayName = "InputOTPGroup"
=======
));
InputOTPGroup.displayName = "InputOTPGroup";
>>>>>>> 352ef7c (Initial commit)

const InputOTPSlot = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { index: number }
>(({ index, className, ...props }, ref) => {
<<<<<<< HEAD
  const inputOTPContext = React.useContext(OTPInputContext)
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]
=======
  const inputOTPContext = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];
>>>>>>> 352ef7c (Initial commit)

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-2 ring-ring ring-offset-background",
<<<<<<< HEAD
        className
=======
        className,
>>>>>>> 352ef7c (Initial commit)
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
<<<<<<< HEAD
  )
})
InputOTPSlot.displayName = "InputOTPSlot"
=======
  );
});
InputOTPSlot.displayName = "InputOTPSlot";
>>>>>>> 352ef7c (Initial commit)

const InputOTPSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
  <div ref={ref} role="separator" {...props}>
    <Dot />
  </div>
<<<<<<< HEAD
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
=======
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
>>>>>>> 352ef7c (Initial commit)

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "font-ui inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-emerald-700 text-white hover:bg-emerald-800 shadow-sm shadow-emerald-900/10",
        gold: "bg-gold-500 text-emerald-950 hover:bg-gold-600",
        outline:
          "border border-ink-300 bg-transparent text-ink-900 hover:border-emerald-700 hover:text-emerald-700",
        ghost: "bg-transparent text-ink-900 hover:bg-emerald-50",
        inverse: "bg-white text-emerald-800 hover:bg-emerald-50",
        link: "bg-transparent p-0 text-emerald-700 underline-offset-4 hover:underline rounded-none",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

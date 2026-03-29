/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `
  group/button inline-flex shrink-0 items-center justify-center
  rounded-2xl
  border border-transparent bg-clip-padding
  font-medium whitespace-nowrap
  transition-all duration-300
  outline-none select-none
  focus-visible:ring-2 focus-visible:ring-purple-500/50
  active:translate-y-px
  disabled:pointer-events-none disabled:opacity-50
  [&_svg]:pointer-events-none [&_svg]:shrink-0
  [&_svg:not([class*='size-'])]:size-4
  `,
  {
    variants: {
      variant: {
        default:
          "bg-purple-500 text-white hover:bg-purple-600 active:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-500",

        outline:
          "border-purple-500 text-purple-500 bg-transparent hover:bg-purple-50 dark:text-purple-400 dark:border-purple-400 dark:hover:bg-zinc-800",

        secondary:
          "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-zinc-800 dark:text-purple-300 dark:hover:bg-zinc-700",

        ghost:
          "text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-zinc-800",

        destructive:
          "bg-red-500/10 text-red-500 hover:bg-red-500/20 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30",

        link: "text-purple-500 underline-offset-4 hover:underline dark:text-purple-400",

        toggle:
          "text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-zinc-700",

        toggleActive: "bg-indigo-500 text-white shadow-md",
      },

      size: {
        default: "h-10 md:h-11 px-4 md:px-5 text-sm md:text-base gap-2",

        xs: "h-7 px-2 text-xs gap-1 rounded-md",

        sm: "h-8 md:h-9 px-3 md:px-4 text-sm gap-1.5",

        lg: "h-11 md:h-12 px-6 md:px-8 text-base md:text-lg gap-2",

        icon: "size-10 md:size-11",

        "icon-xs": "size-7",

        "icon-sm": "size-8 md:size-9",

        "icon-lg": "size-11 md:size-12",

        // 🔥 NEW: Toggle size (responsive)
        toggle:
          "flex-1 px-3 sm:px-5 md:px-6 py-2 text-xs sm:text-sm rounded-full",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };

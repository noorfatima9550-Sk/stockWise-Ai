import { forwardRef } from "react";

const VARIANT_STYLES = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-card",
  outline:
    "bg-white text-brand-600 border border-brand-600 hover:bg-brand-50",
  ghost:
    "bg-transparent text-slate-700 hover:bg-slate-100",
  white:
    "bg-white text-brand-600 hover:bg-slate-50 shadow-card"
};

const SIZE_STYLES = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-base"
};

/**
 * Shared button used on every page of the project.
 * Props:
 *  - as: "button" | "a"  (renders an anchor when a href-style CTA is needed)
 *  - variant: "primary" | "outline" | "ghost" | "white"
 *  - size: "sm" | "md" | "lg"
 *  - icon: optional lucide-react icon component rendered after the label
 */
const Button = forwardRef(
  (
    {
      as = "button",
      variant = "primary",
      size = "md",
      icon: Icon,
      iconPosition = "right",
      className = "",
      children,
      ...rest
    },
    ref
  ) => {
    const Component = as;
    const classes = [
      "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-150",
        "shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
      VARIANT_STYLES[variant],
      SIZE_STYLES[size],
      className
    ].join(" ");

    return (
      <Component ref={ref} className={classes} {...rest}>
        {Icon && iconPosition === "left" && <Icon size={18} />}
        {children}
        {Icon && iconPosition === "right" && <Icon size={18} />}
      </Component>
    );
  }
);

Button.displayName = "Button";

export default Button;

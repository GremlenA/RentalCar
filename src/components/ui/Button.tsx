import { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import css from "./Button.module.css";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary";
  size?: "large" | "medium" | "small";
  className?: string;
  href?: string; 
}

export default function Button({
  children,
  variant = "primary",
  size = "medium",
  className = "",
  href,
  ...props
}: ButtonProps) {
  const btnClass = `${css.btn} ${css[variant]} ${css[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={btnClass}>
        {children}
      </Link>
    );
  }

  return (
    <button className={btnClass} {...props}>
      {children}
    </button>
  );
}
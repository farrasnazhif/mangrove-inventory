import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export const TYPOGRAPHY_VARIANTS = {
  h4: "text-[48px] leading-[64px] max-md:text-[30px] max-md:leading-[40px]",
  h5: "text-[32px] leading-[36px] max-md:text-[24px] max-md:leading-[32px]",
  h6: "text-[28px] leading-[32px] max-md:text-[20px] max-md:leading-[28px]",
  t: "text-[20px] leading-[24px] max-md:text-[18px] max-md:leading-[24px]",
  bl: "text-[18px] leading-[24px] max-md:text-[16px] max-md:leading-[20px]",
  bm: "text-[16px] leading-[24px] max-md:text-[14px] max-md:leading-[18px]",
  bs: "text-[14px] leading-[18px] max-md:text-[12px] max-md:leading-[16px]",
  c: "text-[12px] leading-[16px] max-md:text-[10px] max-md:leading-[14px]",
} as const;

export const TYPOGRAPHY_WEIGHTS = {
  extrabold: "font-extrabold",
  bold: "font-bold",
  semibold: "font-semibold",
  medium: "font-medium",
  regular: "font-normal",
} as const;

export type TypographyVariant = keyof typeof TYPOGRAPHY_VARIANTS;
export type TypographyWeight = keyof typeof TYPOGRAPHY_WEIGHTS;

type TypographyProps<T extends ElementType> = {
  as?: T;
  variant?: TypographyVariant;
  weight?: TypographyWeight;
  className?: string;
  children: ReactNode;
};

export function Typography<T extends ElementType = "p">({
  as,
  variant = "bm",
  weight = "regular",
  className = "",
  children,
  ...props
}: TypographyProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof TypographyProps<T>>) {
  const Component: ElementType = as ?? "p";
  return (
    <Component
      {...props}
      className={`text-ink ${TYPOGRAPHY_WEIGHTS[weight]} ${TYPOGRAPHY_VARIANTS[variant]} ${className}`}
    >
      {children}
    </Component>
  );
}

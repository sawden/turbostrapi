import { cva, cx } from "@turbostrapi/cva";
import Image from "next/image";
import * as React from "react";
import styles from "./hero.module.css";

const gradientVariants = cva({
  base: "absolute mix-blend-normal will-change-filter",
  variants: {
    size: {
      logo: "h-[120px] w-[120px] opacity-90 blur-[32px]",
      background:
        "-top-[500px] h-[1000px] w-[1000px] opacity-[.15] blur-[75px]",
    },
  },
});

export interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: string;
}

const Hero = React.forwardRef<HTMLDivElement, HeroProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      className={cx(
        "relative z-0 flex flex-col items-center justify-between gap-8 pb-16 pt-12 md:pb-24 md:pt-16 lg:pb-32 lg:pt-20",
        className,
      )}
      ref={ref}
      {...props}
    >
      <div className="z-50 flex	w-full items-center	justify-center">
        <div className="absolute min-h-[614px] min-w-[614px]">
          <Image
            className="invert dark:invert-0"
            alt="Turborepo"
            height={614}
            width={614}
            src="circles.svg"
          />
        </div>
        <div className="absolute z-50 flex h-64 w-64 items-center justify-center">
          <span
            className={cx(
              gradientVariants({
                size: "logo",
              }),
              styles.heroGlow,
              styles[`heroGlow--${variant}`],
            )}
          />
        </div>

        <div className="relative z-50 h-[120px] w-[120px]">
          <div
            className={`absolute inset-0 flex justify-center transition-opacity duration-1000 ${
              variant === "turborepo"
                ? "visible opacity-100"
                : "invisible opacity-0"
            }`}
          >
            <Image
              alt="Turborepo logo"
              height={120}
              width={120}
              priority
              src="turborepo.svg"
            />
          </div>
          <div
            className={`absolute inset-0 flex justify-center transition-opacity duration-1000 ${
              variant === "strapi"
                ? "visible opacity-100"
                : "invisible opacity-0"
            }`}
          >
            <Image
              alt="Strapi logo"
              height={110}
              width={110}
              priority
              src="strapi.svg"
            />
          </div>
        </div>
      </div>
      <div className="z-50 flex flex-col items-center justify-center px-6 text-center">
        <Image
          className="w-[160px] fill-current dark:invert md:w-[200px]"
          alt="Turborepo wordmark"
          width={200}
          height={20}
          priority
          src="turborepo-wordmark.svg"
        />
      </div>
      <span
        className={cx(
          gradientVariants({
            size: "background",
          }),
          styles.heroGlow,
          styles[`heroGlow--${variant}`],
        )}
      />
    </div>
  ),
);
Hero.displayName = "Hero";

export { Hero };

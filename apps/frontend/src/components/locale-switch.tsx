"use client";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@turbostrapi/ui";
import Link from "next/link";

import { usePathname } from "next/navigation";

import { useLocale } from "@/context/locale-context";
import {
  addLocaleToPath,
  getDefaultLocaleFormLocales,
  isPathnameMissingLocale,
  removeLocaleFromPath,
} from "@/lib/localization";
import React from "react";

export type LocaleSwitchProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const LocaleSwitch = React.forwardRef<HTMLButtonElement, LocaleSwitchProps>(
  ({ ...props }, ref) => {
    const { apiLocales, locale } = useLocale();
    const pathName = usePathname();

    const redirectedPathName = (toLocale: string) => {
      const currentLocale =
        locale ?? getDefaultLocaleFormLocales(apiLocales)?.code;
      let pathNameWithoutLocale = pathName;

      if (!isPathnameMissingLocale(pathName, apiLocales) && currentLocale) {
        pathNameWithoutLocale = removeLocaleFromPath(pathName, currentLocale);
      }

      return addLocaleToPath(pathNameWithoutLocale, toLocale);
    };

    const LanguageIcon = (): JSX.Element => {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802"
          />
        </svg>
      );
    };

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" ref={ref} {...props}>
            <LanguageIcon />
            <span className="sr-only">Change language</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {apiLocales.map((locale) => {
            return (
              <Link key={locale.code} href={redirectedPathName(locale.code)}>
                <DropdownMenuItem>{locale.name}</DropdownMenuItem>
              </Link>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  },
);

LocaleSwitch.displayName = "LocaleSwitch";

export { LocaleSwitch };

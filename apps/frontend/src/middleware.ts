import { fetchLocales } from "./lib/api";

import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  addLocaleToPath,
  getDefaultLocaleFormLocales,
  isPathnameLocale,
  isPathnameMissingLocale,
  removeLocaleFromPath,
} from "./lib/localization";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locales = await fetchLocales();

  const defaultLocale = getDefaultLocaleFormLocales(locales);
  const defaultLocaleCode = defaultLocale?.code;
  const pathnameIsDefaultLocale = isPathnameLocale(pathname, defaultLocaleCode);

  // Remove default locale
  if (pathnameIsDefaultLocale && defaultLocaleCode) {
    const pathnameWithoutLocale = removeLocaleFromPath(
      pathname,
      defaultLocaleCode,
    );
    return NextResponse.redirect(new URL(pathnameWithoutLocale, request.url));
  }

  const pathnameIsMissingLocale = isPathnameMissingLocale(pathname, locales);

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    if (defaultLocaleCode) {
      const pathnameWithLocale = addLocaleToPath(pathname, defaultLocaleCode);
      return NextResponse.rewrite(new URL(pathnameWithLocale, request.url));
    }
  }
}

export const config = {
  // Do not run the middleware on the following paths
  matcher:
    "/((?!api|_next/static|_next/image|assets|manifest.json|favicon.ico).*)",
};

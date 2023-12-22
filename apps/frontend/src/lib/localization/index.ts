import type { ApiLocale } from "../api/types";

/**
 * Adds locale to root-relative URLs.
 * @param href - URL to localize
 * @param locale - Locale to add
 * @returns Localized URL if root-relative, otherwise original URL
 */
export function localizeHref(href: string, locale: string): string {
  const isRootRelative = href.startsWith("/");
  if (!isRootRelative || !locale) {
    return href;
  }
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

/**
 * Returns default locale from array of locales.
 * @param locales - Array of locales
 * @returns Default locale or undefined
 */
export function getDefaultLocaleFormLocales(
  locales: ApiLocale[],
): ApiLocale | undefined {
  return locales.find((locale) => locale.isDefault);
}

/**
 * Removes locale from given path.
 * @param path - URL path
 * @param locale - Locale code to remove
 * @returns Path without locale
 */
export function removeLocaleFromPath(path: string, locale: string): string {
  const segments = path.split("/");
  if (segments[1] === locale) {
    segments.splice(1, 1);
  }
  return segments.join("/") || "/";
}

/**
 * Adds locale to given path.
 * @param path - URL path
 * @param locale - Locale code to add
 * @returns Path with added locale
 */
export function addLocaleToPath(path: string, locale: string): string {
  if (path === "" || path === "/") {
    return `/${locale}`;
  }
  return `/${locale}${path.startsWith("/") ? "" : "/"}${path}`;
}

/**
 * Checks if a pathname is missing locale.
 * @param pathname - URL pathname
 * @param locales - Array of locales
 * @returns True if pathname is missing locale, false otherwise
 */
export function isPathnameMissingLocale(
  pathname: string,
  locales: ApiLocale[],
): boolean {
  return locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale.code}/`) &&
      pathname !== `/${locale.code}`,
  );
}

/**
 * Checks if a pathname has a specific locale.
 * @param pathname - URL pathname
 * @param localeCode - Locale code to check for
 * @returns True if pathname has the locale, false otherwise
 */
export function isPathnameLocale(
  pathname: string,
  localeCode: string | undefined,
): boolean {
  return (
    pathname.startsWith(`/${localeCode}/`) || pathname === `/${localeCode}`
  );
}

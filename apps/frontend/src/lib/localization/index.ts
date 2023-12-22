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

export function getDefaultLocaleFormLocales(
  locales: ApiLocale[],
): ApiLocale | undefined {
  return locales.find((locale) => locale.isDefault);
}

export function removeLocaleFromPath(path: string, locale: string): string {
  const segments = path.split("/");
  if (segments[1] === locale) {
    segments.splice(1, 1);
  }
  return segments.join("/") || "/";
}

export function addLocaleToPath(path: string, locale: string): string {
  if (path === "" || path === "/") {
    return `/${locale}`;
  }
  return `/${locale}${path.startsWith("/") ? "" : "/"}${path}`;
}

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

export function isPathnameLocale(
  pathname: string,
  localeCode: string | undefined,
): boolean {
  return (
    pathname.startsWith(`/${localeCode}/`) || pathname === `/${localeCode}`
  );
}

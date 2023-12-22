import type { ApiLocale } from "@/lib/api/types";
import {
  addLocaleToPath,
  getDefaultLocaleFormLocales,
  isPathnameLocale,
  isPathnameMissingLocale,
  localizeHref,
  removeLocaleFromPath,
} from "../lib/localization";

const LOCALES_MOCK = [
  {
    id: 2,
    name: "German (de)",
    code: "de",
    createdAt: "2023-12-15T20:24:52.563Z",
    updatedAt: "2023-12-15T20:24:52.563Z",
    isDefault: false,
  },
  {
    id: 1,
    name: "English (en)",
    code: "en",
    createdAt: "2023-12-15T20:24:19.257Z",
    updatedAt: "2023-12-15T20:24:19.257Z",
    isDefault: true,
  },
];

describe("localizeHref()", () => {
  describe("should localize when href is", () => {
    it("root-relative root", () => {
      const result = localizeHref("/", "en");
      expect(result).toEqual("/en");
    });

    it("root-relative", () => {
      const result = localizeHref("/pathname", "en");
      expect(result).toEqual("/en/pathname");
    });

    it("nested root-relative", () => {
      const result = localizeHref("/some/pathname", "en");
      expect(result).toEqual("/en/some/pathname");
    });
  });

  describe("should not localize href", () => {
    describe("when href is", () => {
      it("absolute", () => {
        const result = localizeHref("http://example.com/example", "en");
        expect(result).toEqual("http://example.com/example");
      });

      it("relative", () => {
        const result = localizeHref("pathname", "en");
        expect(result).toEqual("pathname");
      });

      it("anchor", () => {
        const result = localizeHref("#example", "en");
        expect(result).toEqual("#example");
      });

      it("empty", () => {
        const result = localizeHref("", "en");
        expect(result).toEqual("");
      });
    });
    it("when locale is empty", () => {
      expect(localizeHref("/example", "")).toEqual("/example");
    });
  });
});

describe("getDefaultLocaleFormLocales()", () => {
  it("returns the default locale when one is present", () => {
    const defaultLocale = getDefaultLocaleFormLocales(LOCALES_MOCK);
    expect(defaultLocale).toEqual(LOCALES_MOCK[1]);
  });

  it("returns undefined when the locales list is empty", () => {
    const locales: ApiLocale[] = [];

    const defaultLocale = getDefaultLocaleFormLocales(locales);
    expect(defaultLocale).toBeUndefined();
  });

  it("returns undefined when there is no default locale", () => {
    const locales = LOCALES_MOCK.map((locale) => ({
      ...locale,
      isDefault: false,
    }));

    const defaultLocale = getDefaultLocaleFormLocales(locales);
    expect(defaultLocale).toBeUndefined();
  });
});

describe("removeLocaleFromPath()", () => {
  it("removes locale from start of the path", () => {
    const result = removeLocaleFromPath("/en/pathname", "en");
    expect(result).toEqual("/pathname");
  });

  it("does not remove locale from middle of the path", () => {
    const result = removeLocaleFromPath("/pathname/en/abc", "en");
    expect(result).toEqual("/pathname/en/abc");
  });

  it("returns '/' when path is just the locale", () => {
    const result = removeLocaleFromPath("/en", "en");
    expect(result).toEqual("/");
  });

  it("returns original path when locale is not in the path", () => {
    const result = removeLocaleFromPath("/pathname/abc", "en");
    expect(result).toEqual("/pathname/abc");
  });

  it("returns original path when path is locale-like string", () => {
    const result = removeLocaleFromPath("/enterprise", "en");
    expect(result).toEqual("/enterprise");
  });
});

describe("addLocaleToPath()", () => {
  describe("should add locale when", () => {
    it("path is root", () => {
      const result = addLocaleToPath("/", "en");
      expect(result).toEqual("/en");
    });

    it("path is empty", () => {
      const result = addLocaleToPath("", "en");
      expect(result).toEqual("/en");
    });

    it("path is '/pathname'", () => {
      const result = addLocaleToPath("/pathname", "en");
      expect(result).toEqual("/en/pathname");
    });

    it("path is 'pathname'", () => {
      const result = addLocaleToPath("pathname", "en");
      expect(result).toEqual("/en/pathname");
    });

    it("path is nested", () => {
      const result = addLocaleToPath("/some/pathname", "en");
      expect(result).toEqual("/en/some/pathname");
    });
  });
});

describe("isPathnameMissingLocale()", () => {
  describe("should return true when", () => {
    it("pathname is missing locale", () => {
      const result = isPathnameMissingLocale("/pathname", LOCALES_MOCK);
      expect(result).toBe(true);
    });

    it("pathname starts with locale-like string", () => {
      const result = isPathnameMissingLocale("/enterprise", LOCALES_MOCK);
      expect(result).toBe(true);
    });

    it("locales list is empty", () => {
      const result = isPathnameMissingLocale("/en/pathname", []);
      expect(result).toBe(true);
    });
  });

  describe("should return false when", () => {
    it("pathname starts with locale", () => {
      const result = isPathnameMissingLocale("/en/pathname", LOCALES_MOCK);
      expect(result).toBe(false);
    });

    it("pathname is exactly the locale", () => {
      const result = isPathnameMissingLocale("/en", LOCALES_MOCK);
      expect(result).toBe(false);
    });
  });
});

describe("isPathnameLocale()", () => {
  describe("should return true", () => {
    it("when pathname starts with given locale", () => {
      const result = isPathnameLocale("/en/pathname", "en");
      expect(result).toBe(true);
    });

    it("when pathname is exactly the given locale", () => {
      const result = isPathnameLocale("/en", "en");
      expect(result).toBe(true);
    });
  });

  describe("should return false", () => {
    it("when pathname does not start with given locale", () => {
      const result = isPathnameLocale("/pathname/en", "en");
      expect(result).toBe(false);
    });

    it("when pathname starts with locale-like string of given locale", () => {
      const result = isPathnameLocale("/enterprise", "en");
      expect(result).toBe(false);
    });

    it("when given locale is undefined", () => {
      const result = isPathnameLocale("/en/pathname", undefined);
      expect(result).toBe(false);
    });

    it("when pathname is not the given locale", () => {
      const result = isPathnameLocale("/de", "en");
      expect(result).toBe(false);
    });
  });
});

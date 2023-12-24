import type { ApiLocale } from "@/lib/api/types";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface LocaleContextProps {
  locale: string | undefined;
  apiLocales: ApiLocale[];
  setLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextProps | undefined>(undefined);

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState<string | undefined>(undefined);
  const [apiLocales, setApiLocales] = useState<ApiLocale[]>([]);
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchLocales = async () => {
      try {
        const response = await fetch("/api/locales");
        const data = (await response.json()) as ApiLocale[];
        setApiLocales(data);
      } catch (error) {
        console.error("Failed to fetch locales:", error);
      }
    };

    void fetchLocales();
  }, []);

  useEffect(() => {
    const locale = pathName.split("/")[1];
    setLocale(locale);
  }, [pathName]);

  const value = {
    locale,
    apiLocales,
    setLocale: (newLocale: string) => {
      setLocale(newLocale);
      void router.push(redirectedPathName(newLocale));
    },
  };

  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};

export const useLocale = (): LocaleContextProps => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
};

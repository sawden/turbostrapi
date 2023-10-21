"use client";

import Image from "next/image";

import { Callout, Card } from "@turbostrapi/ui";
import { Hero } from "../components";
import { useRotatingValue } from "../hooks";

const UTM_PARAMS =
  "utm_source=turbostrapi-starter&utm_medium=basic&utm_campaign=turbostrapi-starter";

const LINKS = [
  {
    title: "Docs",
    href: `https://turbo.build/repo/docs?${UTM_PARAMS}`,
    description: "Find in-depth information about Turborepo features and API.",
  },
  {
    title: "Learn",
    href: `https://turbo.build/repo/docs/handbook?${UTM_PARAMS}`,
    description: "Learn more about monorepos with our handbook.",
  },
  {
    title: "Templates",
    href: `https://turbo.build/repo/docs/getting-started/from-example?${UTM_PARAMS}`,
    description: "Choose from over 15 examples and deploy with a single click.",
  },
  {
    title: "Deploy",
    href: `https://vercel.com/new?${UTM_PARAMS}`,
    description:
      "Instantly deploy your Turborepo to a shareable URL with Vercel.",
  },
];

export default function Page(): JSX.Element {
  const variants = ["strapi", "turborepo"];
  const rotatingVariant = useRotatingValue(variants, 4500);

  return (
    <>
      <div className="z-30 w-full max-w-5xl items-center justify-between font-mono text-sm md:flex">
        <Callout
          className="max-md:fixed	max-md:left-0 max-md:top-0 max-md:flex max-md:w-full max-md:justify-center max-md:rounded-none max-md:border-none max-md:pb-6 max-md:pt-8 max-md:text-xs"
          label="@turbostrapi/frontend"
        >
          apps/frontend
        </Callout>
        <div className="fixed bottom-0 left-0 flex h-36 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black md:static md:h-auto md:w-auto md:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 md:pointer-events-auto md:p-0"
            href={`https://vercel.com?${UTM_PARAMS}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Inspired by{" "}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="flex place-items-center">
        <Hero variant={rotatingVariant} />
      </div>

      <div className="z-20 grid text-center md:grid-cols-2 md:text-left lg:w-full lg:max-w-5xl lg:grid-cols-4">
        {LINKS.map(({ title, href, description }) => (
          <Card href={href} key={title} title={title}>
            {description}
          </Card>
        ))}
      </div>
    </>
  );
}

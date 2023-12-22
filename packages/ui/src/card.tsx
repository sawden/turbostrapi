import * as React from "react";

import { cx } from "@turbostrapi/cva";

export interface CardProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  title: string;
  href: string;
}

const Card = React.forwardRef<HTMLAnchorElement, CardProps>(
  ({ className, children, title, href, target, ...props }, ref) => (
    <a
      className={cx(
        "group rounded-xl border border-transparent px-5 py-4 ring-foreground ring-offset-background transition-colors hover:border-gray-300 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 hover:dark:border-neutral-300/20 hover:dark:bg-neutral-500/10",
        className,
      )}
      href={href}
      target={target}
      ref={ref}
      rel="noopener noreferrer"
      {...props}
    >
      <h2 className={`text-1xl mb-3 font-semibold`}>
        {`${title} `}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className={`m-0 max-w-[30ch] text-sm opacity-60`}>{children}</p>
    </a>
  ),
);
Card.displayName = "Card";

export { Card };

import * as React from "react";

import { cx } from "@turbostrapi/cva";

export interface CalloutProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  label: string;
}

const Callout = React.forwardRef<HTMLParagraphElement, CalloutProps>(
  ({ className, label, children, ...props }, ref) => (
    <p
      className={cx(
        "rounded-xl border border-neutral-300 bg-neutral-200 p-4 pb-[.9rem] text-sm dark:border-neutral-500/30 dark:bg-neutral-900/50",
        className,
      )}
      ref={ref}
      {...props}
    >
      {label}&nbsp;
      <code className="font-mono font-bold">{children}</code>
    </p>
  ),
);
Callout.displayName = "Callout";

export { Callout };

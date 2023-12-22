import { localizeHref } from "@/lib/localization";
import type { Attribute } from "@turbostrapi/backend";
import { cx } from "@turbostrapi/cva";
import { Card } from "@turbostrapi/ui";
import * as React from "react";

export interface LinkCardsProps extends React.HTMLAttributes<HTMLDivElement> {
  data: Attribute.GetDynamicZoneValue<
    Attribute.DynamicZone<["blocks.link-cards"]>
  >[number];
  locale: string;
}

const LinkCards = React.forwardRef<HTMLDivElement, LinkCardsProps>(
  ({ className, data, locale, ...props }, ref) => (
    <div
      className={cx(
        "z-20 grid text-center md:grid-cols-2 md:text-left lg:w-full lg:max-w-5xl lg:grid-cols-4",
        className,
      )}
      ref={ref}
      {...props}
    >
      {data.cards?.map((card) => (
        <Card
          href={localizeHref(card.url, locale)}
          key={card.id}
          title={card.title}
          target={card.target}
        >
          {card.description}
        </Card>
      ))}
    </div>
  ),
);

LinkCards.displayName = "Link Cards";

export { LinkCards };

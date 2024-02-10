"use client";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { Attribute } from "@turbostrapi/backend";
import * as React from "react";

export interface RichTextSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  section: Attribute.GetDynamicZoneValue<
    Attribute.DynamicZone<["sections.rich-text"]>
  >[number];
}

const RichTextSection = React.forwardRef<HTMLDivElement, RichTextSectionProps>(
  ({ section }, ref) => {
    if (section.content) {
      return (
        <div className="prose text-center dark:prose-invert md:text-left lg:w-full lg:max-w-5xl">
          <BlocksRenderer content={section.content} {...ref} />
        </div>
      );
    }
  },
);

RichTextSection.displayName = "Rich Text";

export { RichTextSection };

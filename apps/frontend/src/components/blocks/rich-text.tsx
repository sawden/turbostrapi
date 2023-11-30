"use client";

import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import type { RootNode } from "@strapi/blocks-react-renderer/dist/BlocksRenderer";
import type { Attribute } from "@turbostrapi/backend";
import * as React from "react";

export interface RichTextProps extends React.HTMLAttributes<HTMLDivElement> {
  section: Attribute.GetDynamicZoneValue<
    Attribute.DynamicZone<["blocks.rich-text"]>
  >[number];
}

const RichText = React.forwardRef<HTMLDivElement, RichTextProps>(
  ({ section }, ref) => {
    if (section.content) {
      // TODO: Remove 'as RootNode[]' after Strapi provides more specific types.
      const content = section.content as RootNode[];
      return (
        <div className="prose text-center dark:prose-invert md:text-left lg:w-full lg:max-w-5xl">
          <BlocksRenderer content={content} {...ref} />{" "}
        </div>
      );
    }
  },
);

RichText.displayName = "Rich Text";

export { RichText };

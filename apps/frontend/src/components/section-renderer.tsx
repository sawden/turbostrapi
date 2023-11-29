import type { Attribute } from "@turbostrapi/backend";
import { LinkCards } from "./blocks/link-cards";
import { RichText } from "./blocks/rich-text";

export function sectionRenderer(
  section: Attribute.GetDynamicZoneValue<
    Attribute.DynamicZone<["blocks.link-cards", "blocks.rich-text"]>
  >[number],
  index: number,
) {
  switch (section.__component) {
    case "blocks.link-cards":
      return <LinkCards key={index} data={section} />;
    case "blocks.rich-text":
      return <RichText key={index} section={section} />;
    default:
      return null;
  }
}

import type { Attribute } from "@turbostrapi/backend";
import { LinkCardsSection } from "./sections/link-cards";
import { RichTextSection } from "./sections/rich-text";

export function sectionRenderer(
  section: Attribute.GetDynamicZoneValue<
    Attribute.DynamicZone<["sections.link-cards", "sections.rich-text"]>
  >[number],
  index: number,
  locale: string,
) {
  switch (section.__component) {
    case "sections.link-cards":
      return <LinkCardsSection key={index} section={section} locale={locale} />;
    case "sections.rich-text":
      return <RichTextSection key={index} section={section} />;
    default:
      return null;
  }
}

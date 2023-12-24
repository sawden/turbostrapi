import type { Attribute, Schema } from "@strapi/strapi";

export interface SectionsLinkCards extends Schema.Component {
  collectionName: "components_sections_link_cards";
  info: {
    displayName: "linkCards";
    icon: "link";
    description: "";
  };
  attributes: {
    cards: Attribute.Component<"shared.link-card", true>;
  };
}

export interface SectionsRichText extends Schema.Component {
  collectionName: "components_sections_rich_texts";
  info: {
    displayName: "RichText";
    icon: "pencil";
    description: "";
  };
  attributes: {
    content: Attribute.Blocks & Attribute.Required;
  };
}

export interface SharedLinkCard extends Schema.Component {
  collectionName: "components_shared_link_cards";
  info: {
    displayName: "linkCard";
    icon: "link";
    description: "";
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    url: Attribute.String & Attribute.Required;
    target: Attribute.Enumeration<["_self", "_blank", "_parent", "_top"]> &
      Attribute.Required &
      Attribute.DefaultTo<"_self">;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: "components_shared_meta_socials";
  info: {
    displayName: "metaSocial";
    icon: "landscape";
    description: "";
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<["Facebook", "X"]> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: "components_shared_seos";
  info: {
    displayName: "Seo";
    icon: "search";
    description: "";
  };
  attributes: {
    metaTitle: Attribute.String & Attribute.Required;
    metaDescription: Attribute.Text & Attribute.Required;
    shareImage: Attribute.Media;
    metaSocial: Attribute.Component<"shared.meta-social", true>;
  };
}

declare module "@strapi/types" {
  export module Shared {
    export interface Components {
      "sections.link-cards": SectionsLinkCards;
      "sections.rich-text": SectionsRichText;
      "shared.link-card": SharedLinkCard;
      "shared.meta-social": SharedMetaSocial;
      "shared.seo": SharedSeo;
    }
  }
}

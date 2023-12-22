/**
 * @jest-environment node
 */

import { NextRequest, NextResponse } from "next/server";
import { fetchLocales } from "../lib/api";
import { middleware } from "../middleware";

jest.mock("../lib/api");

const LOCALES_MOCK = [
  {
    id: 2,
    name: "German (de)",
    code: "de",
    createdAt: "2023-12-15T20:24:52.563Z",
    updatedAt: "2023-12-15T20:24:52.563Z",
    isDefault: false,
  },
  {
    id: 1,
    name: "English (en)",
    code: "en",
    createdAt: "2023-12-15T20:24:19.257Z",
    updatedAt: "2023-12-15T20:24:19.257Z",
    isDefault: true,
  },
];

describe("middleware", () => {
  const rewriteSpy = jest.spyOn(NextResponse, "rewrite");
  const redirectSpy = jest.spyOn(NextResponse, "redirect");
  const DOMAIN_MOCK = "https://example.com";

  beforeEach(() => {
    (fetchLocales as jest.Mock).mockResolvedValue(LOCALES_MOCK);
  });

  afterEach(() => {
    rewriteSpy.mockClear();
    redirectSpy.mockClear();
  });

  describe("should remove default locale from URL", () => {
    it("when pathname starts with default locale", async () => {
      const request = new NextRequest(
        new Request(`${DOMAIN_MOCK}/en/pathname`),
      );
      const response = await middleware(request);

      expect(redirectSpy).toHaveBeenCalledTimes(1);
      expect(rewriteSpy).toHaveBeenCalledTimes(0);
      expect(response).toBeInstanceOf(NextResponse);
      expect(response?.status).toEqual(307);
      expect(response?.headers.get("Location")).toEqual(
        `${DOMAIN_MOCK}/pathname`,
      );
    });

    it("when pathname is exactly default locale", async () => {
      const request = new NextRequest(new Request(`${DOMAIN_MOCK}/en`));
      const response = await middleware(request);

      expect(redirectSpy).toHaveBeenCalledTimes(1);
      expect(rewriteSpy).toHaveBeenCalledTimes(0);
      expect(response).toBeInstanceOf(NextResponse);
      expect(response?.status).toEqual(307);
      expect(response?.headers.get("Location")).toEqual(`${DOMAIN_MOCK}/`);
    });
  });

  describe("should not modify URL", () => {
    it("when pathname starts with non-default locale", async () => {
      const request = new NextRequest(
        new Request(`${DOMAIN_MOCK}/de/pathname`),
      );
      const response = await middleware(request);

      expect(redirectSpy).toHaveBeenCalledTimes(0);
      expect(rewriteSpy).toHaveBeenCalledTimes(0);
      expect(response).toBeUndefined();
    });

    it("when pathname is exactly non-default locale", async () => {
      const request = new NextRequest(new Request(`${DOMAIN_MOCK}/de`));
      const response = await middleware(request);

      expect(redirectSpy).toHaveBeenCalledTimes(0);
      expect(rewriteSpy).toHaveBeenCalledTimes(0);
      expect(response).toBeUndefined();
    });
  });

  describe("should rewrite to default locale", () => {
    it("when pathname is missing locale", async () => {
      const request = new NextRequest(new Request(`${DOMAIN_MOCK}/pathname`));
      const response = await middleware(request);

      expect(redirectSpy).toHaveBeenCalledTimes(0);
      expect(rewriteSpy).toHaveBeenCalledTimes(1);
      expect(response).toBeInstanceOf(NextResponse);
      expect(response?.status).toEqual(200);
      expect(response?.headers.get("Location")).toEqual(null);
    });

    it("when pathname is '/'", async () => {
      const request = new NextRequest(new Request(`${DOMAIN_MOCK}/`));
      const response = await middleware(request);

      expect(redirectSpy).toHaveBeenCalledTimes(0);
      expect(rewriteSpy).toHaveBeenCalledTimes(1);
      expect(response).toBeInstanceOf(NextResponse);
      expect(response?.status).toEqual(200);
      expect(response?.headers.get("Location")).toEqual(null);
    });
  });
});

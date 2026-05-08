"use client";

import React from "react";
import { WeddingData } from "@/types/wedding";
import { FloralTemplate } from "./floral";
import BrushTemplate from "./brush";
import ModernTemplate from "./modern";
import RetroTemplate from "./retro";
import CultureTemplate from "./culture";
import SpiritualTemplate from "./spiritual";

interface Props {
  data: WeddingData;
  slug: string;
  guestName: string | null;
  tier?: "akad" | "all";
}

export default function TemplateSwitcher({ data, slug, guestName, tier = "all" }: Props) {
  const selectedTemplate = ((data as any).template || data.templateId || "floral").toLowerCase();

  switch (selectedTemplate) {
    case "culture":
      return <CultureTemplate data={data} slug={slug} guestName={guestName} tier={tier} />;
    case "spiritual":
      return <SpiritualTemplate data={data} slug={slug} guestName={guestName} tier={tier} />;
    case "retro":
      return <RetroTemplate data={data} slug={slug} guestName={guestName} />;
    case "brush":
      return <BrushTemplate data={data} slug={slug} guestName={guestName} />;
    case "modern":
      return <ModernTemplate data={data} slug={slug} guestName={guestName} />;
    case "floral":
    default:
      return <FloralTemplate data={data} slug={slug} guestName={guestName} />;
  }
}

"use client";

import React from "react";
import { WeddingData } from "@/types/wedding";
import { FloralTemplate } from "./floral";
import BrushTemplate from "./brush";
import ModernTemplate from "./modern";

interface Props {
  data: WeddingData;
  slug: string;
  guestName: string | null;
}

export default function TemplateSwitcher({ data, slug, guestName }: Props) {
  const selectedTemplate = ((data as any).template || data.templateId || "floral").toLowerCase();

  switch (selectedTemplate) {
    case "brush":
      return <BrushTemplate data={data} slug={slug} guestName={guestName} />;
    case "modern":
      return <ModernTemplate data={data} slug={slug} guestName={guestName} />;
    case "floral":
    default:
      return <FloralTemplate data={data} slug={slug} guestName={guestName} />;
  }
}

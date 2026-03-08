"use client";

import HomeHeroStatic from "@/components/HomeHeroStatic";
import HomeHeroAnimations from "@/components/HomeHeroAnimations";

export default function Logo3D({ onOpenOfferDialog }: { onOpenOfferDialog?: () => void }) {
  return (
    <>
      <HomeHeroStatic onOpenOfferDialog={onOpenOfferDialog} />
      <HomeHeroAnimations />
    </>
  );
}

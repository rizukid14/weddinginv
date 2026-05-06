import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getWeddingData } from "@/lib/wedding";
import TemplateSwitcher from "@/components/templates/TemplateSwitcher";

export const dynamic = "force-dynamic";

interface PageProps {
  params: { slug: string };
  searchParams: { to?: string };
}

// Generate premium dynamic SEO meta properties for share preview cards (WhatsApp/Facebook)
export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const data = await getWeddingData(params.slug);
  if (!data || !data.isActive) {
    return {
      title: "Undangan Pernikahan",
      description: "Undangan digital pernikahan elegan.",
    };
  }

  const guestSuffix = searchParams.to ? ` untuk ${searchParams.to}` : "";
  return {
    title: `Undangan Pernikahan ${data.brideNickname} & ${data.groomNickname}${guestSuffix}`,
    description: `Walimatul Ursy ${data.brideName} & ${data.groomName}. Temukan detail lokasi, akad, resepsi, galeri foto, konfirmasi RSVP, dan kirim ucapan tulus.`,
    openGraph: {
      title: `Undangan Pernikahan ${data.brideNickname} & ${data.groomNickname}`,
      description: `Mengharap kehadiran Anda di hari bahagia pernikahan kami.`,
      images: [
        {
          url: data.coverPhoto,
          width: 800,
          height: 1000,
          alt: `Prewedding ${data.brideNickname} & ${data.groomNickname}`,
        },
      ],
    },
  };
}

export default async function InvitationPage({ params, searchParams }: PageProps) {
  const data = await getWeddingData(params.slug);

  // If wedding slug doesn't exist or is deactivated, render 404
  if (!data || !data.isActive) {
    notFound();
  }

  // Parse guest name from 'to' query param (support spaces represented by %20 or +)
  const guestName = searchParams.to ? decodeURIComponent(searchParams.to).replace(/\+/g, " ") : null;

  return (
    <TemplateSwitcher
      data={data}
      slug={params.slug}
      guestName={guestName}
    />
  );
}


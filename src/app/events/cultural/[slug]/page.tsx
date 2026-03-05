import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { notFound } from "next/navigation";
import eventDetails from "@/data/event_details.json";
import { slugify } from "@/lib/slugify";
import CultEventDetailPage, { type DetailedEventData } from "@/components/CultEventDetailPage";

const CULT_TYPES = ["cult_flagship", "cult_formal", "cult_informal"];

const cultEvents = eventDetails.filter((e) => CULT_TYPES.includes(e.event_type));

async function getDetailedEvent(unstopEventId?: string): Promise<DetailedEventData | null> {
    if (!unstopEventId) return null;

    const filePath = path.join(process.cwd(), "src", "data", `event_${unstopEventId}.json`);
    if (!existsSync(filePath)) return null;

    const fileContent = await readFile(filePath, "utf-8");
    return JSON.parse(fileContent) as DetailedEventData;
}

export function generateStaticParams() {
    return cultEvents.map((e) => ({ slug: slugify(e.event_name) }));
}

export default async function CultEventPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const event = cultEvents.find((e) => slugify(e.event_name) === slug);

    if (!event) return notFound();

    const detailedEvent = await getDetailedEvent(event.unstop_event_id);

    return <CultEventDetailPage event={event} detailedEvent={detailedEvent} />;
}

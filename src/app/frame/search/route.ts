import { NeynarAPIClient, FeedType, FilterType } from "@neynar/nodejs-sdk";
import { AppConfig } from "../../AppConfig";
import { NextRequest } from "next/server";

const client = new NeynarAPIClient(AppConfig.neynarApiKey);

export async function GET(req: NextRequest) {
    const searchString = req.nextUrl.searchParams.get("searchString");
    if (!searchString) {
        return new Response("searchString field is required.", { status: 400 });
    }
    const result = await search(searchString);
    console.log(`channel search results count:\n${result.length}`);
    console.log(`channels:\n${JSON.stringify(result.map(r=>({id: r.id, desc: r.description, lead: r.lead?.username})), null, 2)}`);

    return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
    });
}

async function search(searchString: string) {
    const result = await client.fetchAllChannels();
    const filteredResult = result.channels.filter((c) => {
        return c.id.toLowerCase().includes(searchString) ||
            c.description != null
            ? c.description?.toLowerCase().includes(searchString)
            : false || c.name != null
            ? c.name.toLowerCase().includes(searchString)
            : false;
    });
    return filteredResult;
}

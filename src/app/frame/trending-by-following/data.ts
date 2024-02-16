import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { AppConfig } from "../../AppConfig";
import { CastWithInteractions } from "@neynar/nodejs-sdk/build/neynar-api/v2";

const client = new NeynarAPIClient(AppConfig.neynarApiKey);

export async function data(fid: number) {
    const result = await client.fetchUserFollowingFeed(fid, {
        // cursor,
        limit: 100,
        // withRecasts,
        // withReplies
    });
    // Group result by channel
    const resultGrouped = result.casts.reduce((acc, c) => {
        const channel = c.parent_url;
        // If not casted in channel, filter it out
        if (!channel) {
            return acc;
        }
        const existingChannel = acc.find((item) => item.channel === channel);
        if (existingChannel) {
            existingChannel.casts.push(c);
        } else {
            acc.push({ channel, casts: [c] });
        }
        return acc;
    }, [] as { channel: string; casts: CastWithInteractions[] }[]);
    resultGrouped.sort((a, b) => a.casts.length - b.casts.length);

    const resultSliced = resultGrouped.slice(0, 3);
    return resultSliced;
}
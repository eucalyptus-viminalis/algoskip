import { NeynarAPIClient, TimeWindow } from "@neynar/nodejs-sdk";
import { AppConfig } from "../../AppConfig";
import { CastWithInteractions, FeedResponse } from "@neynar/nodejs-sdk/build/neynar-api/v2";

export type ChannelFilter = "rootCastsFromMutuals" | string | null;

const client = new NeynarAPIClient(AppConfig.neynarApiKey);

type ChannelData = {
    id: string,
    castsFromMutuals?: number
}

export async function data(fid: number, filter?: ChannelFilter): Promise<ChannelData[]> {
    if (filter && filter == "rootCastsFromMutuals") {
        const result: FeedResponse = await client.fetchUserFollowingFeed(fid, {
            // cursor,
            limit: 100,
            // withRecasts,
            // withReplies
        });
        // Group result by channel
        const resultGrouped = result.casts.reduce((acc, c) => {
            // Switch on parent_url
            if (!c.parent_url) {
                // Case 1: no 
                return acc;
            }
            if (!c.parent_url.includes('channel')) {
                // Case 2: Parent URL is not a channel
                return acc
            }
            console.log(c.parent_url)
            const channel = c.parent_url.split('/').pop()!;
            // If not casted in channel, filter it out
            const existingChannel = acc.find(
                (item) => item.channel === channel
            );
            if (existingChannel) {
                existingChannel.casts.push(c);
            } else {
                acc.push({ channel, casts: [c] });
            }
            return acc;
        }, [] as { channel: string; casts: CastWithInteractions[] }[]);
        resultGrouped.sort((a, b) => b.casts.length - a.casts.length);

        const resultSliced = resultGrouped.slice(0, 3);
        return resultSliced.map<ChannelData>(r => {
            const channelData: ChannelData = {
                id: r.channel,
                castsFromMutuals: r.casts.length
            }
            console.log(channelData)
            return channelData
        });
    } else {
        // Global trending channels
        const res = await client.fetchTrendingChannels(TimeWindow.ONE_DAY)
        const top3Channels = res.channels.slice(0, 3)
        const channelFrameData: {
            id: string,
        }[] = top3Channels.map(c=> {
            return {
                id: c.id
            }
        })
        return channelFrameData
    }
}

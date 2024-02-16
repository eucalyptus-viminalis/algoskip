import { NeynarAPIClient, TimeWindow } from "@neynar/nodejs-sdk";
import { AppConfig } from "../../AppConfig";
import { CastWithInteractions, Channel, FeedResponse } from "@neynar/nodejs-sdk/build/neynar-api/v2";

export type ChannelFilter = "following" | 'anyone'

const client = new NeynarAPIClient(AppConfig.neynarApiKey);

type ChannelData = {
    id: string
    castsFromMutuals?: number
    castsIn1day?: number
}

export async function getData(fid: number, filter: ChannelFilter): Promise<ChannelData[]> {
    if (filter == "following") {
        const result: FeedResponse = await client.fetchUserFollowingFeed(fid, {
            // cursor,
            limit: 100,     // max limit
            // withRecasts,
            // withReplies
        });
        // Group result by channel
        const resultGrouped = result.casts.reduce((acc, c) => {
            // Switch on parent_url
            if (!c.parent_url) {
                // Case 1: no parent URL
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

        const resultSliced = resultGrouped.slice(0, 5);
        return resultSliced.map<ChannelData>(r => {
            const channelData: ChannelData = {
                id: r.channel,
                castsFromMutuals: r.casts.length
            }
            console.log(channelData)
            return channelData
        });
    } else if (filter == 'anyone') {
        // Global trending channels
        const res = await client.fetchTrendingChannels(TimeWindow.ONE_DAY) as any
        console.log(`res.channels[0]: ${JSON.stringify(res.channels[0], null, 2)}`)

        const topChannels: {
            object: string
            cast_count_1d: string
            cast_count_7d: string
            cast_count_30d: string
            channel: {
                id: string
                url: string
                name: string
                description: string
                object: string
                parent_url: string
            }
        }[] = res.channels.slice(0, 5)
        // console.log(`topChannels: ${JSON.stringify(topChannels, null, 2)}`)
        const channelFrameData: ChannelData[] = topChannels.map(c=> {
            return {
                id: c.channel.id,
                castsIn1day: +c.cast_count_1d
            }
        })
        return channelFrameData
    } else {
        throw new Error('bad channel filter: ', filter)
    }
}

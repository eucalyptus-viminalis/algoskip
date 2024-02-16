import { FrameActionPayload } from "frames.js";
import { NextRequest } from "next/server";
import { TrendingCastsFrame, TrendingCastsFrameParams } from "../trending-casts/frame";
import { SelectChannelFrame } from "../select-channel/frame";
import { ErrorFrame } from "../error/frame";

export async function POST(req: NextRequest) {
    // Params
    const channel = req.nextUrl.searchParams.get('channel')
    const algo = req.nextUrl.searchParams.get('algo')
    const filters = req.nextUrl.searchParams.get('filters')!
    const username = req.nextUrl.searchParams.get('username')!
    const pfpUrl = req.nextUrl.searchParams.get('pfpUrl')!

    const trendingCastsFrameParams = {
            filters: {
                embeds: filters.includes('embeds'),
                followerReactions: filters.includes('followerReactions'),
                mentions: filters.includes('mentions'),
            },
            pfpUrl: pfpUrl,
            username: username,
            algo: algo,
            channel: channel,
        } as TrendingCastsFrameParams

    const data: FrameActionPayload = await req.json()

    // Route request
    if (data.untrustedData.buttonIndex == 1) {
        // Case 1: pressed back button
        // - take user to trending-casts
        return TrendingCastsFrame(trendingCastsFrameParams)
    } else if (data.untrustedData.buttonIndex == 2) {
        const channelFilter = 'following'
        // Case 2: selected trending channels from people you follow
        // TODO: 
        return SelectChannelFrame({
            channelFilter,
            fid: data.untrustedData.fid,
            skip: 0,
            trendingCastsFrameParams,
        })
    } else if (data.untrustedData.buttonIndex == 3) {
        const channelFilter = 'anyone'
        return SelectChannelFrame({
            channelFilter,
            fid: data.untrustedData.fid,
            skip: 0,
            trendingCastsFrameParams,
        })
    } else {
        ErrorFrame()
    }
}
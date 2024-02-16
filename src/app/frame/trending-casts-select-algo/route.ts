import { FrameActionPayload } from "frames.js";
import { NextRequest } from "next/server";
import { TrendingCastsSelectAlgoFrame } from "./frame";
import { TrendingCastsFrame, TrendingCastsFrameParams } from "../trending-casts/frame";

export async function POST(req: NextRequest) {
    // Params
    const filters = req.nextUrl.searchParams.get('filters') ?? ''
    const algo = req.nextUrl.searchParams.get('algo')
    const channel = req.nextUrl.searchParams.get('algo')!
    const username = req.nextUrl.searchParams.get('username')!
    const pfpUrl = req.nextUrl.searchParams.get('pfpUrl')!

    // Data
    const data: FrameActionPayload = await req.json()
    // Route request
    if (data.untrustedData.buttonIndex == 1) {
        // Case 1: Toggle embeds param
        return TrendingCastsSelectAlgoFrame({
            algo: 'popular',
            filters: {
                embeds: filters?.includes('embeds'),
                followerReactions: filters?.includes('followerReactions'),
                mentions: filters?.includes('mentions')
            },
            username: username,
            pfpUrl: pfpUrl,
            channel: channel
        } as TrendingCastsFrameParams)
    } else if (data.untrustedData.buttonIndex == 2) {
        // Case 2: Toggle followerReactions param
        return TrendingCastsSelectAlgoFrame({
            algo: 'latest',
            filters: {
                embeds: filters?.includes('embeds'),
                followerReactions: filters?.includes('followerReactions'),
                mentions: filters?.includes('mentions')
            },
            username: username,
            pfpUrl: pfpUrl,
            channel: channel
        } as TrendingCastsFrameParams)
    } else if (data.untrustedData.buttonIndex == 3) {
        // Case 2: Toggle mentions param
        return TrendingCastsSelectAlgoFrame({
            algo: 'reactionsPerWord',
            filters: {
                embeds: filters?.includes('embeds'),
                followerReactions: filters?.includes('followerReactions'),
                mentions: filters?.includes('mentions')
            },
            username: username,
            pfpUrl: pfpUrl,
            channel: channel
        } as TrendingCastsFrameParams)
    } else if (data.untrustedData.buttonIndex == 4) {
        // Case 4: pressed Done button
        // = go to my-casts with filters
        return TrendingCastsFrame({
            algo: algo,
            filters: {
                embeds: filters?.includes('embeds'),
                followerReactions: filters?.includes('followerReactions'),
                mentions: filters?.includes('mentions')
            },
            username: username,
            pfpUrl: pfpUrl,
            channel: channel
        } as TrendingCastsFrameParams)
    }
}
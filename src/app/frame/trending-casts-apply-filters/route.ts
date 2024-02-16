import { FrameActionPayload } from "frames.js";
import { NextRequest } from "next/server";
import { MyCastsFrame, MyCastsFrameParams } from "../my-casts/frame";
import { TrendingCastsApplyFiltersFrame } from "./frame";
import { TrendingCastsFrame, TrendingCastsFrameParams } from "../trending-casts/frame";

export async function POST(req: NextRequest) {
    // Params
    const filters = req.nextUrl.searchParams.get('filters') ?? ''
    const channel = req.nextUrl.searchParams.get('channel')!
    const algo = req.nextUrl.searchParams.get('algo')
    const username = req.nextUrl.searchParams.get('username')!
    const pfpUrl = req.nextUrl.searchParams.get('pfpUrl')!

    // Data
    const data: FrameActionPayload = await req.json()
    // Route request
    if (data.untrustedData.buttonIndex == 1) {
        // Case 1: Toggle embeds param
        return TrendingCastsApplyFiltersFrame({
            algo: algo ?? 'popular',
            filters: {
                embeds: filters?.includes('embeds') ? false : true,
                followerReactions: filters?.includes('followerReactions'),
                mentions: filters?.includes('mentions')
            },
            username: username,
            pfpUrl: pfpUrl,
            channel: channel
        } as TrendingCastsFrameParams)
    } else if (data.untrustedData.buttonIndex == 2) {
        // Case 2: Toggle followerReactions param
        return TrendingCastsApplyFiltersFrame({
            algo: algo ?? 'popular',
            filters: {
                embeds: filters?.includes('embeds'),
                followerReactions: filters?.includes('followerReactions') ? false : true,
                mentions: filters?.includes('mentions')
            },
            username: username,
            pfpUrl: pfpUrl,
            channel: channel
        } as TrendingCastsFrameParams)
    } else if (data.untrustedData.buttonIndex == 3) {
        // Case 2: Toggle mentions param
        return TrendingCastsApplyFiltersFrame({
            algo: algo ?? 'popular',
            filters: {
                embeds: filters?.includes('embeds'),
                followerReactions: filters?.includes('followerReactions'),
                mentions: filters?.includes('mentions') ? false : true
            },
            username: username,
            pfpUrl: pfpUrl,
            channel: channel
        } as TrendingCastsFrameParams)
    } else if (data.untrustedData.buttonIndex == 4) {
        // Case 4: pressed Done button
        // = go to my-casts with filters
        return TrendingCastsApplyFiltersFrame({
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
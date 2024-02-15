import { FrameActionPayload } from "frames.js";
import { NextRequest } from "next/server";
import { ApplyFiltersFrame } from "./frame";
import { MyCastsFrame, MyCastsFrameParams } from "../my-casts/frame";

export async function POST(req: NextRequest) {
    // Params
    const filters = req.nextUrl.searchParams.get('filters')!
    const algo = req.nextUrl.searchParams.get('algo')!

    // Data
    const data: FrameActionPayload = await req.json()
    // Route request
    if (data.untrustedData.buttonIndex == 1) {
        // Case 1: Toggle embeds param
        return ApplyFiltersFrame({
            algo: algo ?? 'popular',
            filters: {
                embeds: filters?.includes('embeds') ? false : true,
                followerReactions: filters?.includes('followerReactions'),
                mentions: filters?.includes('mentions')
            }
        } as MyCastsFrameParams)
    } else if (data.untrustedData.buttonIndex == 2) {
        // Case 2: Toggle followerReactions param
        return ApplyFiltersFrame({
            algo: algo ?? 'popular',
            filters: {
                embeds: filters?.includes('embeds'),
                followerReactions: filters?.includes('followerReactions') ? false : true,
                mentions: filters?.includes('mentions')
            }
        } as MyCastsFrameParams)
    } else if (data.untrustedData.buttonIndex == 3) {
        // Case 2: Toggle mentions param
        return ApplyFiltersFrame({
            algo: algo ?? 'popular',
            filters: {
                embeds: filters?.includes('embeds'),
                followerReactions: filters?.includes('followerReactions'),
                mentions: filters?.includes('mentions') ? false : true
            }
        } as MyCastsFrameParams)
    } else if (data.untrustedData.buttonIndex == 4) {
        // Case 4: pressed Done button
        // = go to my-casts with filters
        return MyCastsFrame({
            algo: algo,
            filters: {
                embeds: filters?.includes('embeds'),
                followerReactions: filters?.includes('followerReactions'),
                mentions: filters?.includes('mentions')
            }
        } as MyCastsFrameParams)
    }
}
import { FrameActionPayload } from "frames.js";
import { NextRequest } from "next/server";
import { HomeFrame } from "../home/frame";
import { MyCastsFrame } from "../my-casts/frame";
import { TrendingCastsFrame } from "../trending-casts/frame";

export async function POST(req: NextRequest) {
    // Params
    const username = req.nextUrl.searchParams.get('username')!
    const pfpUrl = req.nextUrl.searchParams.get('pfpUrl')!

    const data: FrameActionPayload = await req.json()
    // Route request
    if (data.untrustedData.buttonIndex == 1) {
        // Case 1: pressed home button
        return HomeFrame()
    } else if (data.untrustedData.buttonIndex == 2) {
        // Case 2: pressed my-casts button
        // TODO
        return MyCastsFrame({
            filters: {
                embeds: false,
                followerReactions: false,
                mentions: false
            },
            algo: 'latest',
            username: username,
            pfpUrl: pfpUrl
        })
    } else if (data.untrustedData.buttonIndex == 3) {
        // Case 3: pressed trending-casts button
        return TrendingCastsFrame({
            filters: {
                embeds: false,
                followerReactions: false,
                mentions: false,
            },
            pfpUrl,
            username,
            // algo:,
            // channel: ,
        })
    }
}
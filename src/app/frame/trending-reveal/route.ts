import { FrameActionPayload } from "frames.js";
import { NextRequest } from "next/server";
import { TrendingCastsFrame, TrendingCastsFrameParams } from "../trending-casts/frame";
import { TrendingRevealFrame } from "./frame";

export async function POST(req: NextRequest) {
    // Params
    const curIndex = +req.nextUrl.searchParams.get("curIndex")!;
    const filters = req.nextUrl.searchParams.get("filters")!;
    const algo = req.nextUrl.searchParams.get("algo")!;
    const channel = req.nextUrl.searchParams.get('channel')!
    const username = req.nextUrl.searchParams.get("username")!;
    const pfpUrl = req.nextUrl.searchParams.get("pfpUrl")!;

    // Frame data
    const data: FrameActionPayload = await req.json();

    // Route request
    if (data.untrustedData.buttonIndex == 1) {
        if (curIndex == 0) {
            // Go to my-casts
            return TrendingCastsFrame({
                filters: {
                    embeds: filters.includes("embeds"),
                    followerReactions: filters.includes("followerReactions"),
                    mentions: filters.includes("mentions"),
                },
                algo: algo,
                username: username,
                pfpUrl: pfpUrl,
                channel: channel
            } as TrendingCastsFrameParams);
        } else {
            // Go back
            return TrendingRevealFrame({
                curIndex: curIndex - 1,
                fid: data.untrustedData.fid,
                filtersAndAlgo: {
                    filters: {
                        embeds: filters.includes("embeds"),
                        followerReactions:
                            filters.includes("followerReactions"),
                        mentions: filters.includes("mentions"),
                    },
                    algo: algo,
                    username: username,
                    pfpUrl: pfpUrl,
                    channel: channel
                } as TrendingCastsFrameParams,
            });
        }
    } else if (data.untrustedData.buttonIndex == 2) {
        // No need to handle, handled by link button action type
    } else if (data.untrustedData.buttonIndex == 3) {
        // Go next
        return TrendingRevealFrame({
            curIndex: curIndex + 1,
            fid: data.untrustedData.fid,
            filtersAndAlgo: {
                filters: {
                    embeds: filters.includes("embeds"),
                    followerReactions: filters.includes("followerReactions"),
                    mentions: filters.includes("mentions"),
                },
                algo: algo,
                username: username,
                pfpUrl: pfpUrl,
                channel: channel
            } as TrendingCastsFrameParams,
        });
    }
}

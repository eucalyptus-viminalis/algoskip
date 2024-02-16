import { FrameActionPayload } from "frames.js";
import { NextRequest } from "next/server";
import { MainMenuFrame } from "../main-menu/frame";
import { ErrorFrame } from "../error/frame";
import { TrendingCastsFrameParams } from "./frame";
import { ChannelFilterFrame } from "../channel-filter/frame";
import { TrendingCastsApplyFiltersFrame } from "../trending-casts-apply-filters/frame";
import { TrendingCastsSelectAlgoFrame } from "../trending-casts-select-algo/frame";

export async function POST(req: NextRequest) {
    // Params
    const filters = req.nextUrl.searchParams.get("filters")!;
    const username = req.nextUrl.searchParams.get("username")!;
    const pfpUrl = req.nextUrl.searchParams.get("pfpUrl")!;
    const channel = req.nextUrl.searchParams.get("channel");
    const algo = req.nextUrl.searchParams.get("algo");

    const data: FrameActionPayload = await req.json();
    // Route request
    if (data.untrustedData.buttonIndex == 1) {
        if (channel) {
            // Case 1: channel selected
            return ChannelFilterFrame({
                filters: {
                    embeds: filters.includes('embeds'),
                    followerReactions: filters.includes('followerReactions'),
                    mentions: filters.includes('mentions'),
                },
                pfpUrl: pfpUrl,
                username: username,
                algo: algo,
                channel: channel,
            } as TrendingCastsFrameParams);
        } else {
            // Case 2: channel not yet selected
            return MainMenuFrame(data.untrustedData.fid);
        }
    } else if (data.untrustedData.buttonIndex == 2) {
        if (channel) {
            // Case 1: channel selected
            return TrendingCastsApplyFiltersFrame({
                channel: channel,
                algo: algo,
                filters: {
                    embeds: filters.includes("embeds"),
                    followerReactions: filters.includes("followerReactions"),
                    mentions: filters.includes("mentions"),
                },
                pfpUrl: pfpUrl,
                username: username,
            } as TrendingCastsFrameParams);
        } else {
            // Case 2: channel not yet selected
            return ChannelFilterFrame({
                filters: {
                    embeds: filters.includes('embeds'),
                    followerReactions: filters.includes('followerReactions'),
                    mentions: filters.includes('mentions'),
                },
                pfpUrl: pfpUrl,
                username: username,
                algo: algo,
                channel: channel,
            } as TrendingCastsFrameParams);
        }
        // Go to apply-filters
    } else if (data.untrustedData.buttonIndex == 3) {
        if (channel) {
            // Case 1: channel selected
            return TrendingCastsSelectAlgoFrame({
                channel: channel,
                algo: algo,
                filters: {
                    embeds: filters.includes("embeds"),
                    followerReactions: filters.includes("followerReactions"),
                    mentions: filters.includes("mentions"),
                },
                pfpUrl: pfpUrl,
                username: username,
            } as TrendingCastsFrameParams);
        } else {
            // Case 2: channel not yet selected
            // NOTE: This route should not be available
            return ErrorFrame(
                null,
                "Bad route. Please reply to this cast with complaints."
            );
        }
    } else if (data.untrustedData.buttonIndex == 4) {
        if (channel && algo) {
            // Case 1: channel selected
            return ErrorFrame()
            // TODO:
            // return TrendingRevealFrame({
            //     curIndex: 0,
            //     fid: data.untrustedData.fid,
            //     filtersAndAlgo: {
            //         channel: channel,
            //         algo: algo,
            //         filters: {
            //             embeds: filters?.includes("embeds"),
            //             followerReactions:
            //                 filters?.includes("followerReactions"),
            //             mentions: filters?.includes("mentions"),
            //         },
            //         pfpUrl: pfpUrl,
            //         username: username,
            //     } as TrendingCastsFrameParams,
            // });
        } else {
            // Case 2: channel not yet selected
            // NOTE: This route should not be available
            return ErrorFrame(
                null,
                "Bad route. Please reply to this cast with complaints."
            );
        }
    }
}

import { NextRequest } from "next/server";
import { SelectChannelFrame, SelectChannelFrameParams } from "./frame";
import { FrameActionPayload } from "frames.js";
import { ChannelFilterFrame } from "../channel-filter/frame";
import {
    TrendingCastsFrame,
    TrendingCastsFrameParams,
} from "../trending-casts/frame";
import { ErrorFrame } from "../error/frame";

export async function POST(req: NextRequest) {
    // Params
    const filters = req.nextUrl.searchParams.get("filters")!;
    const pfpUrl = req.nextUrl.searchParams.get("pfpUrl")!;
    const username = req.nextUrl.searchParams.get("username")!;
    const algo = req.nextUrl.searchParams.get("algo")!;
    const channel = req.nextUrl.searchParams.get("channel");
    const channelFilter = req.nextUrl.searchParams.get("channelFilter")!;
    const skip = +req.nextUrl.searchParams.get("skip")!;

    const trendingCastsFramParams = {
        filters: {
            embeds: filters.includes("embeds"),
            followerReactions: filters.includes("followerReactions"),
            mentions: filters.includes("mentions"),
        },
        pfpUrl: pfpUrl,
        username: username,
        algo: algo,
        channel: channel,
    } as TrendingCastsFrameParams;

    const data: FrameActionPayload = await req.json();
    // Route request
    if (data.untrustedData.buttonIndex == 1) {
        if (skip == 0) {
            // Go back
            return ChannelFilterFrame(trendingCastsFramParams);
        } else {
            // Show previous options
            // Go back
            return SelectChannelFrame({
                channelFilter: channelFilter,
                fid: data.untrustedData.fid,
                skip: skip - 2,
                trendingCastsFrameParams: trendingCastsFramParams,
            } as SelectChannelFrameParams);
        }
    } else if (data.untrustedData.buttonIndex == 2) {
        const option1Name = req.nextUrl.searchParams.get("option1Name")!;
        const frameParams = trendingCastsFramParams;
        frameParams.channel = option1Name;
        return TrendingCastsFrame(frameParams);
    } else if (data.untrustedData.buttonIndex == 3) {
        const option2Name = req.nextUrl.searchParams.get("option2Name");
        if (option2Name) {
            const frameParams = trendingCastsFramParams;
            frameParams.channel = option2Name;
            return TrendingCastsFrame(frameParams);
        } else {
            ErrorFrame();
        }
    } else if (data.untrustedData.buttonIndex == 4) {
        return SelectChannelFrame({
            channelFilter: channelFilter,
            fid: data.untrustedData.fid,
            skip: skip + 2,
            trendingCastsFrameParams: trendingCastsFramParams,
        } as SelectChannelFrameParams);
    }
}

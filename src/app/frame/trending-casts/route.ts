import { FrameActionPayload } from "frames.js";
import { NextRequest } from "next/server";
import { MainMenuFrame } from "../main-menu/frame";
import { ErrorFrame } from "../error/frame";
import { Algo, TrendingCastsFrame, TrendingCastsFrameParams } from "./frame";
import { ChannelFilterFrame } from "../channel-filter/frame";
import { TrendingCastsApplyFiltersFrame } from "../trending-casts-apply-filters/frame";
import { TrendingCastsSelectAlgoFrame } from "../trending-casts-select-algo/frame";
import { TrendingRevealFrame } from "../trending-reveal/frame";
import { AppConfig } from "../../AppConfig";

// GET: /frame/trending-casts
// Params:
// - pfpUrl
// - username
// - filters?
// - algo?: Algo
// - channel?
export async function GET(req: NextRequest) {
    const pfpUrl = req.nextUrl.searchParams.get('pfpUrl')
    const username = req.nextUrl.searchParams.get('username')
    const filters = req.nextUrl.searchParams.get('filters')
    const algo = req.nextUrl.searchParams.get('algo')
    const channel = req.nextUrl.searchParams.get('channel')

    // Validate query params
    if (!pfpUrl) {
        return new Response('missing param: pfpUrl', {status: 400})
    } else if (!username) {
        return new Response('missing param: username', {status: 400})
    } else if (algo && !(algo in Algo)) {
        return new Response(`bad param: algo\nmust be one of ${Object.values(Algo).join(',')}`, {status: 400})
    }

    const params: TrendingCastsFrameParams = {
        filters: {
            embeds: filters?.includes('embeds') ?? false,
            followerReactions: filters?.includes('followerReactions') ?? false,
            mentions: filters?.includes('mentions') ?? false,
        },
        pfpUrl,
        username,
        algo: algo as Algo ?? undefined,
        channel: channel ?? undefined,
    }
    return TrendingCastsFrame(params)
}

// POST: /frame/trending-casts
// Params:
// - pfpUrl
// - username
// - filters?
// - algo?: Algo
// - channel?
export async function POST(req: NextRequest) {
    // Params
    const filters = req.nextUrl.searchParams.get("filters");
    const username = req.nextUrl.searchParams.get("username");
    const pfpUrl = req.nextUrl.searchParams.get("pfpUrl");
    const channel = req.nextUrl.searchParams.get("channel");
    const algo = req.nextUrl.searchParams.get("algo");

    // Validate query params
    if (!pfpUrl) {
        return new Response('missing param: pfpUrl', {status: 400})
    } else if (!username) {
        return new Response('missing param: username', {status: 400})
    }

    const data: FrameActionPayload = await req.json();
    // Route request
    if (data.untrustedData.buttonIndex == 1) {
        if (channel) {
            // Case 1: channel selected
            const fetchParams = new URLSearchParams()
            fetchParams.set('filters', filters ?? '')
            fetchParams.set('pfpUrl', pfpUrl)
            fetchParams.set('username', username)
            fetchParams.set('algo', algo ?? '')
            fetchParams.set('channel', channel)
            const res = await fetch(AppConfig.hostUrl + '/frame/channel-filter?' + fetchParams)
            return new Response(res.body, {headers: {'content-type': 'text/html'}})
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
                    embeds: filters?.includes("embeds"),
                    followerReactions: filters?.includes("followerReactions"),
                    mentions: filters?.includes("mentions"),
                },
                pfpUrl: pfpUrl,
                username: username,
            } as TrendingCastsFrameParams);
        } else {
            // Case 2: channel not yet selected
            return ChannelFilterFrame({
                filters: {
                    embeds: filters?.includes('embeds'),
                    followerReactions: filters?.includes('followerReactions'),
                    mentions: filters?.includes('mentions'),
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
                    embeds: filters?.includes("embeds"),
                    followerReactions: filters?.includes("followerReactions"),
                    mentions: filters?.includes("mentions"),
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
            // Reveal first cast result
            return TrendingRevealFrame({
                curIndex: 0,
                fid: data.untrustedData.fid,
                filtersAndAlgo: {
                    channel: channel,
                    algo: algo,
                    filters: {
                        embeds: filters?.includes("embeds"),
                        followerReactions:
                            filters?.includes("followerReactions"),
                        mentions: filters?.includes("mentions"),
                    },
                    pfpUrl: pfpUrl,
                    username: username,
                } as TrendingCastsFrameParams,
            });
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

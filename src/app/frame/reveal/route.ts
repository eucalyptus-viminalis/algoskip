import { FrameActionPayload } from "frames.js";
import { NextRequest } from "next/server";
import { MyCastsFrame, MyCastsFrameParams } from "../my-casts/frame";
import { RevealFrame } from "./frame";
import { MainMenuFrame } from "../main-menu/frame";

export async function POST(req: NextRequest) {
    const curIndex = +req.nextUrl.searchParams.get("curIndex")!;
    const filters = req.nextUrl.searchParams.get("filters")!;
    const algo = req.nextUrl.searchParams.get("algo")!;
    const username = req.nextUrl.searchParams.get("username")!;
    const pfpUrl = req.nextUrl.searchParams.get("pfpUrl")!;
    const next = req.nextUrl.searchParams.get("next")!;

    const data: FrameActionPayload = await req.json();
    // Route request
    if (data.untrustedData.buttonIndex == 1) {
        if (curIndex == 0) {
            // Go to my-casts
            return MyCastsFrame({
                filters: {
                    embeds: filters.includes("embeds"),
                    followerReactions: filters.includes("followerReactions"),
                    mentions: filters.includes("mentions"),
                },
                algo: algo,
                username: username,
                pfpUrl: pfpUrl,
            } as MyCastsFrameParams);
        } else {
            // Go back
            const prevIndex = curIndex - 1;
            return RevealFrame({
                curIndex: prevIndex,
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
                } as MyCastsFrameParams,
            });
        }
    } else if (data.untrustedData.buttonIndex == 2) {
        // No need to handle, handled by link button action type
    } else if (data.untrustedData.buttonIndex == 3) {
        // Go next
        if (next == "true") {
            const nextIndex = curIndex + 1;
            return RevealFrame({
                curIndex: nextIndex,
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
                } as MyCastsFrameParams,
            });
        } else {
            return MainMenuFrame(data.untrustedData.fid);
        }
    }
}

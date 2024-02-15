import { FrameActionPayload } from "frames.js";
import { NextRequest } from "next/server";
import { MainMenuFrame } from "../main-menu/frame";
import { ApplyFiltersFrame } from "../apply-filters/frame";
import { ErrorFrame } from "../error/frame";
import { MyCastsFrameParams } from "./frame";

export async function POST(req: NextRequest) {
    // Params
    const filters = req.nextUrl.searchParams.get('filters')
    const algo = req.nextUrl.searchParams.get('algo')

    const data: FrameActionPayload = await req.json()
    // Route request
    if (data.untrustedData.buttonIndex == 1) {
        // Go to main-menu
        return MainMenuFrame(data.untrustedData.fid)
    } else if (data.untrustedData.buttonIndex == 2) {
        // Go to apply-filters
        return ApplyFiltersFrame({
            algo: algo!,
            filters: {
                embeds: filters?.includes('embeds'),
                followerReactions: filters?.includes('followerReactions'),
                mentions: filters?.includes('mentions')
            }
        } as MyCastsFrameParams)
    } else if (data.untrustedData.buttonIndex == 3) {
        // Go to select-algo
        return ErrorFrame()
        // return SelectAlgoFrame()
    } else if (data.untrustedData.buttonIndex == 4){
        return ErrorFrame(null, 'Route under construction.')
        // return RevealFrame()
    }
}
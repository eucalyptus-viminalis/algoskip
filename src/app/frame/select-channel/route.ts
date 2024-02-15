import { INTERNALS } from "next/dist/server/web/spec-extension/request";
import { NextRequest } from "next/server";
import { SelectChannelFrame } from "./frame";
import { FrameActionPayload } from "frames.js";
import { ChannelFilter } from "./data";

export function GET(req: NextRequest) {
    const fid = +req.nextUrl.searchParams.get('fid')!
    const filter = req.nextUrl.searchParams.get('filter')! as ChannelFilter
    return SelectChannelFrame(fid, filter)
}

export async function POST(req: NextRequest) {
    // const option1Name = req.nextUrl.searchParams.get('option1Name')!
    // const option1Name = req.nextUrl.searchParams.get('option1Name')!
    const data: FrameActionPayload = await req.json()
    // Route request
    if (data.untrustedData.buttonIndex == 1) {
        const skip = req.nextUrl.searchParams.get('skip')
        if (!skip) {
            // Go back
            const fid = data.untrustedData.fid
            const filter = req.nextUrl.searchParams.get('filter')
            return SelectChannelFrame(fid, filter)
        } else {
            // Show previous options
            // Go back
            const fid = data.untrustedData.fid
            const filter = req.nextUrl.searchParams.get('filter')
            return SelectChannelFrame(fid, filter, +skip - 2)
        }
    } else if (data.untrustedData.buttonIndex == 2) {
        // Go to channel-casts
        // Need channelName
        // return ChannelCastsFrame(req.nextUrl.searchParams.get('option1Name')!)
    } else if (data.untrustedData.buttonIndex == 3) {
        const option2Name = req.nextUrl.searchParams.get('option2Name')
        if (option2Name) {
            // return ChannelCastsFrame(req.nextUrl.searchParams.get('option2Name')!)
        }
    } else if (data.untrustedData.buttonIndex == 4) {
        const channelFilter = 'rootCastsFromMutuals'
        const option2Idx = +req.nextUrl.searchParams.get('option2Idx')!
        // return SelectChannelFrame(channelFilter, option2Idx)
    }


}
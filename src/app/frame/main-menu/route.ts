import { FrameActionPayload } from "frames.js";
import { NextRequest } from "next/server";
import { HomeFrame } from "../home/frame";
import { ErrorFrame } from "../error/frame";

export async function POST(req: NextRequest) {
    const data: FrameActionPayload = await req.json()
    // Route request
    if (data.untrustedData.buttonIndex == 1) {
        // Case 1: pressed home button
        return HomeFrame()
    } else if (data.untrustedData.buttonIndex == 2) {
        return ErrorFrame()
        // Case 2: pressed my-casts button
        // TODO
        // return MyCastsFrame()
    } else if (data.untrustedData.buttonIndex == 3) {
        return ErrorFrame()
        // Case 3: pressed trending button
        // TODO
        // return TrendingFrame()
    }
}
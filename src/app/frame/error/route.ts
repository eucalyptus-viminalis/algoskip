import { FrameActionPayload } from "frames.js";
import { NextRequest } from "next/server";
import { ErrorFrame } from "./frame";
import { HomeFrame } from "../home/frame";

export function GET(req: NextRequest) {
    const backUrl = req.nextUrl.searchParams.get("backUrl");
    const errorMsg = req.nextUrl.searchParams.get("errorMsg");
    return ErrorFrame(backUrl, errorMsg);
}

export async function POST(req: NextRequest) {
    const backUrl = req.nextUrl.searchParams.get("backUrl");
    const data: FrameActionPayload = await req.json();
    // Route request
    if (data.untrustedData.buttonIndex == 1 && backUrl) {
        const res = await fetch(backUrl)
        return new Response(res.body, {headers: {'Content-Type': 'text/html'}})
    } else if (data.untrustedData.buttonIndex == 2 && backUrl) {
        return HomeFrame()
    } else if (data.untrustedData.buttonIndex == 1 && !backUrl) {
        return HomeFrame()
    } else {
        const errorMsg = encodeURIComponent('Bad route. Watch this cast for update notifications.')
        return ErrorFrame(backUrl, errorMsg)
    }
}


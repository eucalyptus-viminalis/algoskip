import { NextRequest } from "next/server";
import { FrameActionPayload } from "frames.js";
import { HomeFrame } from "./frame";
import { ErrorFrame } from "../error/frame";
import { AppConfig } from "../../AppConfig";

export function GET() {
    return HomeFrame()
}

export async function POST(req: NextRequest) {
    const data: FrameActionPayload = await req.json();
    // Route request
    if (data.untrustedData.buttonIndex == 1) {
        // Case 1: pressed refresh
        const res = await fetch(AppConfig.hostUrl + `/frame/home`)
        return new Response(res.body, {headers: {'content-type': 'text/html'}})
    } else if (data.untrustedData.buttonIndex == 2) {
        // Case 2: pressed load
        // - go to main-menu
        const res = await fetch(AppConfig.hostUrl + `/frame/main-menu?fid=${data.untrustedData.fid}`)
        return new Response(res.body, {headers: {'content-type': 'text/html'}})

    } else {
        const errorMsg = encodeURIComponent('Bad route.')
        const res = await fetch(AppConfig.hostUrl + `/frame/error?errorMsg=${errorMsg}`)
        return new Response(res.body, {headers: {'content-type': 'text/html'}})
    }
}


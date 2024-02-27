import { FrameActionPayload } from "frames.js";
import { NextRequest } from "next/server";
import { MainMenuFrame } from "./frame";
import { AppConfig } from "../../AppConfig";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";

// GET: /frame/main-menu
// Params:
// - fid
export async function GET(req: NextRequest) {
    const fid = req.nextUrl.searchParams.get('fid')
    if (!fid) {
        return new Response('missing param: "fid"', {status: 400})
    } else if (isNaN(parseInt(fid))) {
        return new Response('"fid" must be a number', {status: 400})
    }
    return MainMenuFrame(+fid)
}

// POST: /frame/main-menu
// Params:
// - username
// - pfpUrl
export async function POST(req: NextRequest) {
    // Params
    const username = req.nextUrl.searchParams.get('username')!
    const pfpUrl = req.nextUrl.searchParams.get('pfpUrl')!

    const data: FrameActionPayload = await req.json()
    // Route request
    if (data.untrustedData.buttonIndex == 1) {
        // Case 1: pressed home button
        const res = await fetch(AppConfig.hostUrl + `/frame/home`)
        return new Response(res.body, {headers: {'content-type': 'text/html'}})
    } else if (data.untrustedData.buttonIndex == 2) {
        // Case 2: pressed my-casts button
        const fetchParams = new URLSearchParams()
        fetchParams.set('algo', 'latest')
        fetchParams.set('pfpUrl', pfpUrl)
        fetchParams.set('username', username)
        const res = await fetch(AppConfig.hostUrl + '/frame/my-casts?' + fetchParams)
        return new Response(res.body, {headers: {'content-type': 'text/html'}})
    } else if (data.untrustedData.buttonIndex == 3) {
        // Case 3: pressed trending-casts button
        const fetchParams = new URLSearchParams()
        fetchParams.set('pfpUrl', pfpUrl)
        fetchParams.set('username', username)
        const res = await fetch(AppConfig.hostUrl + '/frame/trending-casts?' + fetchParams)
        return new Response(res.body, {headers: {'content-type': 'text/html'}})
    } else {
        // Bad route
        const fetchParams = new URLSearchParams()
        fetchParams.set('errorMsg', 'Bad route.')
        const res = await fetch(AppConfig.hostUrl + '/frame/error?' + fetchParams)
        return new Response(res.body, {headers: {'content-type': 'text/html'}})
    }
}
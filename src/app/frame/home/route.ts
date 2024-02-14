import { NextRequest } from "next/server";
import { Frame, FrameActionPayload, getFrameHtml } from "frames.js";
import { AppConfig } from "../../AppConfig";
import { ErrorFrame } from "../error/route";

export function HomeFrame() {
    const frame: Frame = {
        image: "",
        postUrl: AppConfig.hostUrl + "/frame/home",
        version: "vNext",
        buttons: [
            { action: "post", label: "1" },
            { action: "post", label: "2" },
            { action: "post", label: "3" },
            { action: "post", label: "4" },
        ],
    };
    const html = getFrameHtml(frame, {
        title: "home | algoskip",
        htmlBody: `
            <h1>algoskip</h1>
            <p>skip the algorithm.</p>
            <p>a frame by 3070</p>
        `,
        // htmlHead: "",
        og: { title: "home | algoskip" },
    });
    return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" },
    });
}

export function GET() {
    return HomeFrame()
}

export async function POST(req: NextRequest) {
    const data: FrameActionPayload = await req.json();
    // Route request
    if (data.untrustedData.buttonIndex == 1) {
        return HomeFrame()
    } else if (data.untrustedData.buttonIndex == 2) {
        return ErrorFrame(AppConfig.hostUrl + '/frame/home', 'Route under construction.')
    } else if (data.untrustedData.buttonIndex == 3) {
        return ErrorFrame(AppConfig.hostUrl + '/frame/home', 'Route under construction.')
    } else if (data.untrustedData.buttonIndex == 4) {
        return ErrorFrame(AppConfig.hostUrl + '/frame/home', 'Route under construction.')
    } else {
        return ErrorFrame(AppConfig.hostUrl + '/frame/home', 'Bad route.')
    }
}

import { NextRequest } from "next/server";
import { FrameActionPayload } from "frames.js";
import { AppConfig } from "../../AppConfig";
import { HomeFrame } from "./frame";
import { ErrorFrame } from "../error/frame";

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


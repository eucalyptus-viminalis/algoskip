import { NextRequest } from "next/server";
import { FrameActionPayload } from "frames.js";
import { HomeFrame } from "./frame";
import { ErrorFrame } from "../error/frame";
import { MainMenuFrame } from "../main-menu/frame";

export function GET() {
    return HomeFrame()
}

export async function POST(req: NextRequest) {
    const data: FrameActionPayload = await req.json();
    // Route request
    if (data.untrustedData.buttonIndex == 1) {
        // Case 1: pressed refresh
        return HomeFrame()
    } else if (data.untrustedData.buttonIndex == 2) {
        // Case 2: pressed main-menu
        // - go to main-menu
        return MainMenuFrame(data.untrustedData.fid)
    } else {
        return ErrorFrame(null, 'Bad route.')
    }
}


import { NextRequest } from "next/server";
import { ErrorFrame } from "../error/frame";
import { data } from "./data";

export async function GET(req: NextRequest) {
    const fid = req.nextUrl.searchParams.get("fid");
    const backUrl = req.nextUrl.searchParams.get("backUrl");
    if (!fid) {
        return ErrorFrame(backUrl);
    }
    const result = await data(+fid);
    console.log(`data count:\n${result.length}`);
    console.log(
        `data:\n${JSON.stringify(
            result.map((item) => ({
                channel: item.channel,
                castsCount: item.casts.length,
            })),
            null,
            2
        )}`
    );
    // result[0].channel example: https://warpcast.com/~/channel/vision

    return new Response(JSON.stringify(result), {
        headers: { "Content-Type": "application/json" },
    });
}

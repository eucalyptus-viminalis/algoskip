import FrameDiv from "@/src/app/frame/FrameDiv";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
    // Fonts
    const regular = await fetch(
        new URL("@/assets/Lumanosimo-Regular.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());
    const bold = await fetch(
        new URL("@/assets/CourierPrime-Bold.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());
    const mono = await fetch(
        new URL("@/assets/CourierPrime-Regular.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());
    return new ImageResponse(
        (
            <FrameDiv>
                <div
                    id="top-bar" 
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <div>{"/" + req.nextUrl.pathname.split("/").pop()}</div>
                </div>
                <div
                    id="mid-section"
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <h1
                        style={{
                            fontFamily: "regular",
                        }}
                    >
                        algoskip
                    </h1>
                    <div
                        id="menu-bar"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            width: "40%",
                            fontFamily: "mono",
                        }}
                    >
                        <div id="menu-option-1">1 - home</div>
                        <div id="menu-option-1">2 - trending</div>
                        <div id="menu-option-1">3 - search</div>
                        <div id="menu-option-1">4 - algoskip?</div>
                    </div>
                </div>
            </FrameDiv>
        ),
        {
            fonts: [
                {
                    data: regular,
                    name: "regular",
                    style: "normal",
                },
                {
                    data: mono,
                    name: "mono",
                    style: "normal",
                },
            ],
            // debug: true
        }
    );
}

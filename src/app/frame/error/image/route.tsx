import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import FrameDiv from "../../FrameDiv";

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

    const errorMsg = req.nextUrl.searchParams.get("errorMsg");

    return new ImageResponse(
        (
            <FrameDiv>
                <div
                    id="status-bar"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        // alignItems: '',
                        justifyContent: "space-between",
                        width: "100%",
                        fontFamily: "mono",
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
                    <h2
                        style={{
                            fontFamily: "regular",
                        }}
                    >
                        {errorMsg}
                    </h2>
                    <div
                        id="menu-bar"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "space-between",
                            width: "40%",
                            fontFamily: "mono",
                            padding: 20,
                        }}
                    >
                        <div id="menu-option-1">1 - back</div>
                        <div id="menu-option-1">2 - home</div>
                    </div>
                </div>
                <div>bottom bar</div>
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
            debug: true,
        }
    );
}

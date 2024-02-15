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

    // Params
    const total = req.nextUrl.searchParams.get("total")!;

    const option1Name = req.nextUrl.searchParams.get("option1Name")!;
    const option1Count = +req.nextUrl.searchParams.get("option1Count")!;
    const option1Idx = +req.nextUrl.searchParams.get("option1Idx")!;

    const option2Name = req.nextUrl.searchParams.get("option2Name");
    const option2Count = req.nextUrl.searchParams.get("option2Count");
    const option2Idx = req.nextUrl.searchParams.get("option2Idx");

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
                    <div id="current-route">
                        {"/" + req.nextUrl.pathname.split("/").at(-2)}
                    </div>
                </div>
                <div
                    id="mid-section"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        height: '70%',
                        gap: 50
                    }}
                >
                    <div
                        id="option-1"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "40%",
                            borderColor: "#B6A1BD",
                            borderWidth: 5,
                            borderRadius: 50,
                            wordBreak: "break-word",
                            justifyContent: "space-around",
                            alignItems: "center",
                            height: '100%'
                        }}
                    >
                        <span>{"/" + option1Name}</span>
                        <span>{option1Count + " casts"}</span>
                        {/* Hang below card */}
                        <span
                            style={{
                                display: "flex",
                                position: "absolute",
                                left: "50%",
                                bottom: 0,
                                transform: 'translate(-50%, 100%)',
                            }}
                        >
                            {+option1Idx + 1}
                        </span>
                    </div>
                    {option2Name ? (
                        <div
                            id="option-2"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "40%",
                                borderColor: "#B6A1BD",
                                borderWidth: 5,
                                borderRadius: 50,
                                wordBreak: "break-word",
                                justifyContent: "space-around",
                                alignItems: "center",
                                height: '100%'
                            }}
                        >
                            <span>{"/" + option2Name}</span>
                            <span>{option2Count + " casts"}</span>
                            {/* Hang below card */}
                            <span
                                style={{
                                    display: "flex",
                                    position: "absolute",
                                    left: "50%",
                                    bottom: 0,
                                    transform: 'translate(-50%, 100%)',
                                    // translate: '[-50, -50]'
                                }}
                            >
                                {+option2Idx! + 1}
                            </span>
                        </div>
                    ) : null}
                </div>
                <div
                    id="bottom-bar"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "100%",
                        fontFamily: "mono",
                    }}
                >
                    {option1Idx == 0 ? (
                        <span>back</span>
                    ) : (
                        <span>{`1..${option1Idx}`}</span>
                    )}
                    {option2Idx ? (
                        <span>{`${+option2Idx! + 2}..${total}`}</span>
                    ): null}
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
            // debug: true,
        }
    );
}

import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import FrameDiv from "../../FrameDiv";
import TopBar from "../../TopBar";

export const runtime = "edge";

type Algo = {
    displayText: string;
    urlSearchParamKey: string;
    color: string;
    buttonHint: string
};

const algos: Algo[] = [
    {
        displayText: "most popular",
        urlSearchParamKey: "popular",
        color: "#FF4F4F",
        buttonHint: '🔴'
    },
    {
        displayText: "latest",
        urlSearchParamKey: "latest",
        color: "#7471FF",
        buttonHint: '🔵'
    },
    {
        displayText: "reactions per word",
        urlSearchParamKey: "reactionsPerWord",
        color: "#FAFF00",
        buttonHint: '🟡'
    },
];

export async function GET(req: NextRequest) {
    // Params
    const pfpUrl = req.nextUrl.searchParams.get("pfpUrl");
    const curAlgo = req.nextUrl.searchParams.get("algo")!;

    // Fonts
    const regular = await fetch(
        new URL("@/assets/Lumanosimo-Regular.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());
    // const bold = await fetch(
    //     new URL("@/assets/CourierPrime-Bold.ttf", import.meta.url)
    // ).then((res) => res.arrayBuffer());
    const mono = await fetch(
        new URL("@/assets/CourierPrime-Regular.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());

    return new ImageResponse(
        (
            <FrameDiv>
                <TopBar
                    route={req.nextUrl.pathname.split("/").at(-2)}
                    pfpUrl={pfpUrl}
                />
                <div
                    id="mid-section"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "60%",
                        gap: 20,
                    }}
                >
                    {algos.map((algo) => {
                        const id = algo.urlSearchParamKey + '-algo'
                        const selected = curAlgo == algo.urlSearchParamKey
                        return (
                            <div
                                id={id}
                                key={id}
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "30%",
                                    borderColor: "#B6A1BD",
                                    borderWidth: 5,
                                    borderRadius: 50,
                                    backgroundColor: selected ? "#491768" : "",
                                    wordBreak: "break-word",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                    textAlign: 'center'
                                }}
                            >
                                <span>{"sort by"}</span>
                                <span
                                    style={{
                                        color: algo.color,
                                    }}
                                >
                                    {algo.displayText}
                                </span>
                                {/* Hang below card */}
                                <span
                                    style={{
                                        display: "flex",
                                        position: "absolute",
                                        left: "50%",
                                        bottom: 0,
                                        transform: "translate(-50%, 100%)",
                                    }}
                                >
                                    {algo.buttonHint}
                                </span>
                            </div>
                        );
                    })}
                </div>
                <div id="bottom-bar"
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                >
                    <span>Done</span>
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

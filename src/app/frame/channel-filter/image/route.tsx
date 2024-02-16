import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import FrameDiv from "../../FrameDiv";
import TopBar from "../../TopBar";

export const runtime = "edge";

type ChannelFilter = {
    displayText: string;
    urlSearchParamKey: string;
    color: string;
    buttonHint: string
};

const channelFilters: ChannelFilter[] = [
    {
        displayText: "people you follow",
        urlSearchParamKey: "following",
        color: "#FF4F4F",
        buttonHint: '🔴'
    },
    {
        displayText: "anyone",
        urlSearchParamKey: "anyone",
        color: "#7471FF",
        buttonHint: '🔵'
    },
    // {
    //     displayText: "reactions per word",
    //     urlSearchParamKey: "reactionsPerWord",
    //     color: "#FAFF00",
    //     buttonHint: '🟡'
    // },
];
const dansPfp =
    "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://lh3.googleusercontent.com/MyUBL0xHzMeBu7DXQAqv0bM9y6s4i4qjnhcXz5fxZKS3gwWgtamxxmxzCJX7m2cuYeGalyseCA2Y6OBKDMR06TWg2uwknnhdkDA1AA";

export async function GET(req: NextRequest) {
    // Params
    const pfpUrl = req.nextUrl.searchParams.get("pfpUrl") ?? dansPfp;

    // Fonts
    const regular = await fetch(
        new URL("@/assets/Lumanosimo-Regular.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());
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
                    {channelFilters.map((algo) => {
                        const id = algo.urlSearchParamKey + '-algo'
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
                                    wordBreak: "break-word",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    height: "100%",
                                    textAlign: 'center'
                                }}
                            >
                                <span>{"trending channels from"}</span>
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
                    justifyContent: 'flex-start',
                    // alignItems: 'flex-start',
                    width: '100%',
                    fontFamily: 'mono'
                }}
                >
                    <span>back</span>
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

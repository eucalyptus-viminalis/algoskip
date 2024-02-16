import FrameDiv from "@/src/app/frame/FrameDiv";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import TopBar from "../../TopBar";

export const runtime = "edge";

// const dansPfp = "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://lh3.googleusercontent.com/MyUBL0xHzMeBu7DXQAqv0bM9y6s4i4qjnhcXz5fxZKS3gwWgtamxxmxzCJX7m2cuYeGalyseCA2Y6OBKDMR06TWg2uwknnhdkDA1AA"

const pfpSize = 100

export async function GET(req: NextRequest) {
    // Params
    const pfpUrl = req.nextUrl.searchParams.get("pfpUrl")!

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
                    pfpUrl={pfpUrl}
                    route={req.nextUrl.pathname.split('/').at(-2)}
                />
                <div
                    id="mid-section"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        // height: '70%',
                        gap: 50
                    }}
                >
                    <div
                        id="option-1"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "30%",
                            borderColor: "#B6A1BD",
                            borderWidth: 5,
                            borderRadius: 50,
                            wordBreak: "break-word",
                            justifyContent: "space-around",
                            alignItems: "center",
                            height: '100%',
                            paddingBottom: 16
                        }}
                    >
                        <span>{"my casts"}</span>
                        {/* Hang below card */}
                        <span
                            style={{
                                display: "flex",
                                position: "absolute",
                                left: "50%",
                                bottom: -10,
                                transform: 'translate(-50%, 100%)',
                            }}
                        >
                            {'🔴'}
                        </span>
                    </div>
                        <div
                            id="option-2"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "30%",
                                borderColor: "#B6A1BD",
                                borderWidth: 5,
                                borderRadius: 50,
                                wordBreak: "break-word",
                                justifyContent: "space-around",
                                alignItems: "center",
                                height: '100%',
                                paddingBottom: 16
                            }}
                        >
                            <span>{'trending'}</span>
                            {/* Hang below card */}
                            <span
                                style={{
                                    display: "flex",
                                    position: "absolute",
                                    left: "50%",
                                    bottom: -10,
                                    transform: 'translate(-50%, 100%)',
                                    // translate: '[-50, -50]'
                                }}
                            >
                                {'🔵'}
                            </span>
                        </div>
                </div>
                <div id="bottom-bar"
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        fontSize: 40,
                        width: '100%',
                        justifyContent: 'space-between',
                        fontFamily: 'mono'
                    }}
                >
                    <span>{'<home'}</span>
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

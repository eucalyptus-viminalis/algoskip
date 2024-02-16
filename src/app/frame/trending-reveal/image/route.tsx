import FrameDiv from "@/src/app/frame/FrameDiv";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import TopBar from "../../TopBar";

export const runtime = "edge";

const dansPfp =
    "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://lh3.googleusercontent.com/MyUBL0xHzMeBu7DXQAqv0bM9y6s4i4qjnhcXz5fxZKS3gwWgtamxxmxzCJX7m2cuYeGalyseCA2Y6OBKDMR06TWg2uwknnhdkDA1AA";

const pfpSize = 100;

export async function GET(req: NextRequest) {
    // Params
    const channel = req.nextUrl.searchParams.get('channel')!
    const curIndex = +req.nextUrl.searchParams.get("curIdx")! + 1;
    const recastCount = +req.nextUrl.searchParams.get("recastCount")!;
    const likeCount = +req.nextUrl.searchParams.get("likeCount")!;
    const replyCount = +req.nextUrl.searchParams.get("replyCount")!;
    const next = req.nextUrl.searchParams.get("next");
    const embedImgEncoded = req.nextUrl.searchParams.get("embedImg");
    const embedImg = embedImgEncoded
        ? decodeURIComponent(embedImgEncoded)
        : null;
    const hasSecondEmbed = req.nextUrl.searchParams.get("hasSecondEmbed")!;
    const pfpUrlEncoded = req.nextUrl.searchParams.get("pfpUrl")!;
    const pfpUrl = decodeURIComponent(pfpUrlEncoded);
    const username = req.nextUrl.searchParams.get("username")!;
    const ago = decodeURIComponent(req.nextUrl.searchParams.get("ago")!);
    const castTxt = decodeURIComponent(
        req.nextUrl.searchParams.get("castTxt")!
    );

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
                    // route={
                    //     req.nextUrl.pathname.split("/").at(-2) + "/" + curIndex
                    // }
                    route={channel}
                >
                    <div
                        id="reactions"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            fontFamily: "mono",
                            fontSize: 40,
                            gap: 20,
                            padding: 0,
                            margin: 0
                        }}
                    >
                        <div style={{display: 'flex'}}>{"🔁: " + recastCount}</div>
                        <span>{"❤️" + likeCount}</span>
                        <span>{"R: " + replyCount}</span>
                    </div>
                </TopBar>
                <div
                    id="mid-section"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "75%",
                        gap: 16,
                        padding: 16,
                    }}
                >
                    <div
                        id="cast"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: 500,
                            borderColor: "#B6A1BD",
                            borderWidth: 5,
                            borderRadius: 50,
                            // wordBreak: "break-word",
                            justifyContent: "space-around",
                            alignItems: "flex-start",
                            gap: 16,
                            height: "100%",
                            padding: 16,
                            fontFamily: "mono",
                        }}
                    >
                        <div
                            id="user-row"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                gap: 8,
                                fontFamily: "mono",
                                // width: "90%",
                            }}
                        >
                            <img
                                alt="pfp"
                                src={pfpUrl}
                                width={pfpSize}
                                height={pfpSize}
                                style={{
                                    borderRadius: pfpSize / 2,
                                }}
                            />
                            <div
                                id="username-and-date"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <span id="username">{"@" + username}</span>
                                <span id="ago"
                                    style={{
                                        fontSize: 40
                                    }} 
                                >{ago}</span>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                fontSize: 40,
                                width: "100%",
                                height: "100%",
                                overflow: "hidden",
                            }}
                        >
                            {castTxt}
                        </div>
                    </div>
                    {embedImg ? (
                        <div
                            id="embeds"
                            style={{
                                display: "flex",
                                flexWrap: "wrap",
                                fontFamily: "mono",
                                fontSize: 40,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <img
                                alt="embed-img"
                                src={embedImg}
                                width={600}
                                height={500}
                                style={{
                                    // maxWidth: "85%",
                                    // maxHeight: "85%",
                                    opacity: "100%",
                                    objectFit: "contain", // Crop the image to cover the specified dimensions
                                    objectPosition: "center", // Center the cropped area within the image container
                                }}
                            />
                            {hasSecondEmbed == "true" ? <span>+1</span> : null}
                        </div>
                    ) : null}
                </div>
                <div
                    id="bottom-bar"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "space-between",
                        fontFamily: "mono",
                    }}
                >
                    <span>{curIndex == 1 ? "/my-casts" : "back"}</span>
                    <span>go to cast</span>
                    {next ? <span>next</span> : null}
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

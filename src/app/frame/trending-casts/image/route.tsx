import FrameDiv from "@/src/app/frame/FrameDiv";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import TopBar from "../../TopBar";
import Pill from "../../Pill";
import ActionCard from "../../ActionCard";

export const runtime = "edge";

const dansPfp =
    "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://lh3.googleusercontent.com/MyUBL0xHzMeBu7DXQAqv0bM9y6s4i4qjnhcXz5fxZKS3gwWgtamxxmxzCJX7m2cuYeGalyseCA2Y6OBKDMR06TWg2uwknnhdkDA1AA";

const pfpSize = 100;

export async function GET(req: NextRequest) {
    // Params
    const pfpUrl = req.nextUrl.searchParams.get("pfpUrl") ?? dansPfp;
    let filtersString = req.nextUrl.searchParams.get("filters");
    const filters = filtersString ? filtersString.split(",") : [];
    const algo = req.nextUrl.searchParams.get("algo");
    const channel = req.nextUrl.searchParams.get("channel");
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
                    pfpUrl={pfpUrl}
                    route={req.nextUrl.pathname.split("/").at(-2)}
                />
                <div
                    id="mid-section"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "70%",
                        gap: 50,
                        padding: 16,
                    }}
                >
                    <div
                        id="preferences"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "65%",
                            borderColor: "#B6A1BD",
                            borderWidth: 5,
                            borderRadius: 50,
                            // wordBreak: "break-word",
                            justifyContent: "space-around",
                            alignItems: "center",
                            height: "100%",
                            padding: 16,
                            fontFamily: "mono",
                        }}
                    >
                        <div
                            id="channel"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                gap: 20,
                                fontFamily: "mono",
                                // width: "90%",
                            }}
                        >
                            <span>channel</span>
                            {channel ? (
                                <Pill text={channel} />
                            ) : (
                                <span>None</span>
                            )}
                        </div>
                        <hr
                            style={{
                                color: "white",
                                backgroundColor: "white",
                                width: "90%",
                            }}
                        ></hr>
                        <div
                            id="filters"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                gap: 20,
                                fontFamily: "mono",
                                // width: "90%",
                            }}
                        >
                            <span>filters</span>
                            {filters.length == 0 ? <span>None</span> : null}
                            {filters.map((f) => {
                                return <Pill text={f} key={f} />;
                            })}
                        </div>
                        <hr
                            style={{
                                color: "white",
                                backgroundColor: "white",
                                width: "90%",
                            }}
                        ></hr>
                        <div
                            id="algo"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                gap: 20,
                                fontFamily: "mono",
                                // width: "90%",
                            }}
                        >
                            <span>algo</span>
                            {algo ? <Pill text={algo} /> : <span>None</span>}
                        </div>
                        {/* Hang below card */}
                        {channel && algo ? (
                            <span
                                style={{
                                    display: "flex",
                                    position: "absolute",
                                    left: "50%",
                                    bottom: -10,
                                    fontFamily: "regular",
                                    transform: "translate(-50%, 100%)",
                                }}
                            >
                                {"Reveal"}
                            </span>
                        ) : null}
                    </div>
                    <div
                        id="actions"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            width: "30%",
                            // borderColor: "#B6A1BD",
                            // borderWidth: 5,
                            // borderRadius: 50,
                            wordBreak: "break-word",
                            justifyContent: "center",
                            gap: 16,
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        {!channel ? (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    gap: 16,
                                    alignItems: "center",
                                }}
                            >
                                <ActionCard buttonHint="🔴" selected={false}>
                                    {/* Guide? */}
                                    {/* <span style={{
                                        position: "absolute",
                                        left: "50%",
                                        top: -16,
                                        transform: "translate(-50%, -100%)",
                                    }}>Step 1</span> */}
                                    <span
                                        style={{
                                            padding: "0px 16px 16px 16px",
                                        }}
                                    >
                                        select channel
                                    </span>
                                </ActionCard>
                            </div>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-around",
                                    gap: 16,
                                    alignItems: "center",
                                    height: '100%'
                                }}
                            >
                                <ActionCard buttonHint="🔴" selected={false}>
                                    <span
                                        style={{
                                            padding: "0px 16px 16px 16px",
                                        }}
                                    >
                                        apply filters
                                    </span>
                                </ActionCard>
                                <ActionCard buttonHint="🔵" selected={false}>
                                    <span
                                        style={{
                                            padding: "0px 16px 16px 16px",
                                        }}
                                    >
                                        select algo
                                    </span>
                                </ActionCard>
                            </div>
                        )}
                    </div>
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
                    <span>{channel ? 'select-channel' : '<main-menu'}</span>
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

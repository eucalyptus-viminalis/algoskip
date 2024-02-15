import FrameDiv from "@/src/app/frame/FrameDiv";
import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

const dansPfp =
    "https://res.cloudinary.com/merkle-manufactory/image/fetch/c_fill,f_png,w_256/https://lh3.googleusercontent.com/MyUBL0xHzMeBu7DXQAqv0bM9y6s4i4qjnhcXz5fxZKS3gwWgtamxxmxzCJX7m2cuYeGalyseCA2Y6OBKDMR06TWg2uwknnhdkDA1AA";

const pfpSize = 100;

export async function GET(req: NextRequest) {
    // Params
    const pfpUrl = req.nextUrl.searchParams.get("pfpUrl") ?? dansPfp;
    let filtersString = req.nextUrl.searchParams.get("filters");
    const filters = filtersString ? filtersString.split(",") : ['test', 'test1'];
    const algo = req.nextUrl.searchParams.get("algo") ?? 'popular'
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
                <div
                    id="top-bar"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        fontFamily: "mono",
                        justifyContent: "space-between",
                    }}
                >
                    <div id="current-route">
                        {"/" + req.nextUrl.pathname.split("/").at(-2)}
                    </div>
                    {pfpUrl ? (
                        <img
                            alt="pfp"
                            src={pfpUrl}
                            width={pfpSize}
                            height={pfpSize}
                            style={{
                                borderRadius: pfpSize / 2,
                                position: "absolute",
                                top: 0,
                                left: "50%",
                                transform: "translate(-50%, 0)",
                            }}
                        />
                    ) : null}
                </div>
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
                            width: "60%",
                            borderColor: "#B6A1BD",
                            borderWidth: 5,
                            borderRadius: 50,
                            // wordBreak: "break-word",
                            justifyContent: "space-around",
                            alignItems: "center",
                            height: "100%",
                            paddingBottom: 20
                        }}
                    >
                        <span>filters</span>
                        <div
                            id="filters"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                                gap: 20
                                // width: "90%",
                            }}
                        >
                            {filters.length == 0 ? <span>None</span> : null}
                            {filters.map((f) => {
                                return (
                                    <span
                                        style={{
                                    padding: '0px 20px 16px 20px',
                                    borderColor: "#B6A1BD",
                                    borderWidth: 5,
                                    borderRadius: 50,
                                    backgroundColor: '#7819B3'
                                        }}
                                    >
                                        {f}
                                    </span>
                                );
                            })}
                        </div>
                        <span>algo</span>
                        <div
                            id="algo"
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                flexWrap: "wrap",
                            }}
                        >
                            <span 
                                style={{
                                    padding: '0px 20px 16px 20px',
                                    borderColor: "#B6A1BD",
                                    borderWidth: 5,
                                    borderRadius: 50,
                                    backgroundColor: '#7819B3'
                            }}>{algo}</span>
                        </div>
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
                            {"Reveal"}
                        </span>
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
                            justifyContent: "space-around",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <div
                            id="apply-filters"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                borderColor: "#B6A1BD",
                                borderWidth: 5,
                                borderRadius: 50,
                                wordBreak: "break-word",
                                justifyContent: "space-around",
                                alignItems: "center",
                                textAlign: 'center'
                            }}
                        >
                            <span style={{padding: '0px 16px 16px 16px'}}>{"apply filters"}</span>
                            {/* Hang below card */}
                            <span
                                style={{
                                    display: "flex",
                                    position: "absolute",
                                    left: "50%",
                                    bottom: 0,
                                    transform: "translate(-50%, 100%)",
                                    // translate: '[-50, -50]'
                                }}
                            >
                                {"🔴"}
                            </span>
                        </div>
                        <div
                            id="select-algo"
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                borderColor: "#B6A1BD",
                                borderWidth: 5,
                                borderRadius: 50,
                                wordBreak: "break-word",
                                justifyContent: "space-around",
                                alignItems: "center",
                                textAlign: 'center',
                                // padding: 16
                            }}
                        >
                            <span style={{padding: '0px 16px 16px 16px'}}>{"select algo"}</span>
                            {/* Hang below card */}
                            <span
                                style={{
                                    display: "flex",
                                    position: "absolute",
                                    left: "50%",
                                    bottom: 0,
                                    transform: "translate(-50%, 100%)",
                                    // translate: '[-50, -50]'
                                }}
                            >
                                {"🔵"}
                            </span>
                        </div>
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
                    <span>/main-menu</span>
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

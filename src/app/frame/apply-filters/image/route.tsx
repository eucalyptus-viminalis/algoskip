import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";
import FrameDiv from "../../FrameDiv";
import TopBar from "../../TopBar";
import ActionCard from "../../ActionCard";

export const runtime = "edge";

type Filter = {
    displayText: string;
    urlSearchParamKey: string;
    color: string;
    buttonHint: string
};

const filters: Filter[] = [
    {
        displayText: "embeds",
        urlSearchParamKey: "embeds",
        color: "#FF4F4F",
        buttonHint: '🔴'
    },
    {
        displayText: "reactions from followers",
        urlSearchParamKey: "followerReactions",
        color: "#7471FF",
        buttonHint: '🔵'
    },
    {
        displayText: "mentions",
        urlSearchParamKey: "mentions",
        color: "#FAFF00",
        buttonHint: '🟡'
    },
];

export async function GET(req: NextRequest) {
    // Params
    const pfpUrl = req.nextUrl.searchParams.get("pfpUrl")!;
    const filterQuery = req.nextUrl.searchParams.get("filters")!;

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
                    {filters.map((f) => {
                        const id = f.urlSearchParamKey + '-filter'
                        const selected = filterQuery.includes(f.urlSearchParamKey)
                        return (
                            <ActionCard
                                selected={selected}
                                buttonHint={f.buttonHint} 
                                key={f.color}
                                width={'30%'}
                            >
                               <span>has</span> 
                               <span style={{color: f.color, padding: '0 16px 16px 16px'}}>{f.displayText}</span>
                            </ActionCard>
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

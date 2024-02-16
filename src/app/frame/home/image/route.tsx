import FrameDiv from "@/src/app/frame/FrameDiv";
import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

export async function GET() {
    // Fonts
    const regular = await fetch(
        new URL("@/assets/Lumanosimo-Regular.ttf", import.meta.url)
    ).then((res) => res.arrayBuffer());
    // const mono = await fetch(
    //     new URL("@/assets/CourierPrime-Regular.ttf", import.meta.url)
    // ).then((res) => res.arrayBuffer());
    return new ImageResponse(
        (
            <FrameDiv justifyContent="center">
                    <h1
                        style={{
                            fontFamily: "regular",
                        }}
                    >
                        algoskip
                    </h1>
            </FrameDiv>
        ),
        {
            fonts: [
                {
                    data: regular,
                    name: "regular",
                    style: "normal",
                },
                // {
                //     data: mono,
                //     name: "mono",
                //     style: "normal",
                // },
            ],
            // debug: true
        }
    );
}

import { Frame, getFrameHtml } from "frames.js";
import { AppConfig } from "../../AppConfig";

export function HomeFrame() {
    const frame: Frame = {
        image: AppConfig.hostUrl + '/staticFrames/home.png',
        postUrl: AppConfig.hostUrl + "/frame/home",
        version: "vNext",
        buttons: [
            { action: "post", label: "refresh" },
            { action: "post", label: "load" },
        ],
    };
    const html = getFrameHtml(frame, {
        title: "home | algoskip",
        htmlBody: `
            <h1>algoskip</h1>
            <p>skip the algorithm.</p>
            <p>a frame by 3070</p>
            <p>GitHub: https://github.com/eucalyptus-viminalis/algoskip</p>
            <p>Live on Warpcast: https://warpcast.com/3070/0xe5770891</p>
        `,
        // htmlHead: "",
        og: { title: "home | algoskip" },
    });
    return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" },
    });
}
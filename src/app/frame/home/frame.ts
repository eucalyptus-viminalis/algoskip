import { Frame, getFrameHtml } from "frames.js";
import { AppConfig } from "../../AppConfig";

export function HomeFrame() {
    const frame: Frame = {
        image: AppConfig.hostUrl + '/frame/home/image',
        postUrl: AppConfig.hostUrl + "/frame/home",
        version: "vNext",
        buttons: [
            { action: "post", label: "1" },
            { action: "post", label: "2" },
            { action: "post", label: "3" },
            { action: "post", label: "4" },
        ],
    };
    const html = getFrameHtml(frame, {
        title: "home | algoskip",
        htmlBody: `
            <h1>algoskip</h1>
            <p>skip the algorithm.</p>
            <p>a frame by 3070</p>
        `,
        // htmlHead: "",
        og: { title: "home | algoskip" },
    });
    return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" },
    });
}
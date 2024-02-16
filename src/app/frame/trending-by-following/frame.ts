import { Frame, FrameButton, FrameButtonsType, getFrameHtml } from "frames.js";
import { ErrorFrame } from "../error/frame";
import { AppConfig } from "../../AppConfig";

export function TrendingChannelsByFollowingFrame(
    channel_ids: string[],
    backUrl?: string
) {
    if (channel_ids.length > 3) {
        const errorMsg = encodeURIComponent("max channel_ids.length: 3");
        return ErrorFrame(backUrl, errorMsg);
    }
    const channelParamsList = channel_ids
        .map((c, i) => `channel_id${i + 1}=${c}`)
        .join("&");
    const frameButtons = channel_ids.map((channel, i) => ( {action: 'post', label: String(2 + i)} as FrameButton))
    const frame: Frame = {
        image:
            AppConfig.hostUrl +
            "/image/trending-by-following?" +
            channelParamsList,
        postUrl: AppConfig.hostUrl + "/frame/home",
        version: "vNext",
        buttons: [
            { action: "post", label: "1" }, ...frameButtons
        ] as FrameButtonsType,
    };
    // frame.buttons!.push(...channel_ids.map<FrameButton>((c,i) => ({action: 'post', label: String(2 + i)})) as never[])
    const html = getFrameHtml(frame, {
        title: "trending-by-bollowing | algoskip",
        htmlBody: `
            <h1>algoskip</h1>
            <p>skip the algorithm.</p>
            <p>a frame by 3070</p>
        `,
        // htmlHead: "",
        og: { title: "trending-by-following | algoskip" },
    });
    return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" },
    });
}

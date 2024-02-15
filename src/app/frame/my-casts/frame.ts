import { Frame, getFrameHtml } from "frames.js";
import { AppConfig } from "../../AppConfig";

export type MyCastsFrameParams = {
    filters: {
        embeds: boolean;
        followerReactions: boolean;
        mentions: boolean;
    }
    algo: "popular" | "latest" | "reactionsPerWord"
    username: string
    pfpUrl: string
};

export function MyCastsFrame(params: MyCastsFrameParams) {
    const { filters, algo, username, pfpUrl } = params;
    type FilterKey = keyof typeof filters;
    const filterKeys = Object.keys(filters).filter((k) => {
        const key = k as FilterKey;
        return params.filters[key];
    }).join(',');
    let imageParams = "?";
    imageParams += `filters=${filterKeys}&algo=${algo}&pfpUrl=${pfpUrl}`;
    // DEBUG
    console.log(`imageParams: ${imageParams}`);
    let postParams = "?";
    postParams += `filters=${filterKeys}&algo=${algo}&pfpUrl=${pfpUrl}&username=${username}`;
    // Cache bust
    // TODO: Remove later
    imageParams += `&date=${Date.now()}`
    const frame: Frame = {
        image: AppConfig.hostUrl + "/frame/my-casts/image" + imageParams,
        postUrl: AppConfig.hostUrl + "/frame/my-casts" + postParams,
        version: "vNext",
        buttons: [
            { action: "post", label: "main-menu" },
            { action: "post", label: "🔴" },
            { action: "post", label: "🔵" },
            { action: "post", label: "Reveal" },
        ],
        imageAspectRatio: "1.91:1",
        // inputText,
        ogImage: AppConfig.hostUrl + "/frame/my-casts/image" + imageParams,
    };
    const html = getFrameHtml(frame, {
        // htmlBody,
        // htmlHead,
        og: { title: "my-casts | algoskip" },
        title: "my-casts | algoskip",
    });
    return new Response(html, { headers: { "Content-Type": "text/html" } });
}

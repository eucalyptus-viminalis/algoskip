import { Frame, getFrameHtml } from "frames.js";
import { AppConfig } from "../../AppConfig";

export type MyCastsFrameParams = {
    filters: {
        embeds: boolean;
        followerReactions: boolean;
        mentions: boolean;
    };
    algo: "popular" | "latest" | "reactionPerWord";
};

export function MyCastsFrame(params: MyCastsFrameParams) {
    const { filters, algo } = params;
    type FilterKey = keyof typeof filters;
    const filterKeys = Object.keys(filters).filter((k) => {
        const key = k as FilterKey;
        return params.filters[key];
    });
    let imageParams = "?";
    imageParams += `filters=${filterKeys.join(",")}&algo=${algo}`;
    // DEBUG
    console.log(`imageParams: ${imageParams}`);
    let postParams = "?";
    postParams += `filters=${filterKeys.join(",")}&algo=${algo}`;
    // Cache bust
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

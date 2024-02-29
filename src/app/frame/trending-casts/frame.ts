import { Frame, FrameButtonsType, getFrameHtml } from "frames.js";
import { AppConfig } from "../../AppConfig";

// export type Algo = 'popular' | 'latest' | 'reactionsPerWord'
export enum Algo {
    popular = 'popular',
    latest = 'latest',
    reactionsPerWord = 'reactionsPerWord'
}

export type TrendingCastsFrameParams = {
    filters: {
        embeds: boolean;
        followerReactions: boolean;
        mentions: boolean;
    }
    algo?: Algo
    channel?: string
    username: string
    pfpUrl: string
};

export function TrendingCastsFrame(params: TrendingCastsFrameParams) {
    const { channel, filters, algo, username, pfpUrl } = params;
    type FilterKey = keyof typeof filters;
    const filterKeys = Object.keys(filters).filter((k) => {
        const key = k as FilterKey;
        return params.filters[key];
    }).join(',');
    let imageParams = "?";
    imageParams += `channel=${channel ?? ''}&filters=${filterKeys}&algo=${algo ?? ''}&pfpUrl=${pfpUrl}`;
    // DEBUG
    console.log(`imageParams: ${imageParams}`);
    let postParams = "?";
    postParams += `channel=${channel ?? ''}&filters=${filterKeys}&algo=${algo ?? ''}&pfpUrl=${pfpUrl}&username=${username}`;
    // Cache bust
    // TODO: Remove later
    imageParams += `&date=${Date.now()}`
    const buttons = channel && algo ?
        [
            { action: "post", label: "select-channel" },
            { action: "post", label: "🔴" },
            { action: "post", label: "🔵" },
            { action: "post", label: "Reveal" },
        ]
        : channel && !algo ?
        [
            { action: "post", label: "select-channel" },
            { action: "post", label: "🔴" },
            { action: "post", label: "🔵" },
        ]
        :
        [
            { action: "post", label: "main-menu" },
            { action: "post", label: "🔴" },    // select-channel action
        ]
    const frame: Frame = {
        image: AppConfig.hostUrl + "/frame/trending-casts/image" + imageParams,
        postUrl: AppConfig.hostUrl + "/frame/trending-casts" + postParams,
        version: "vNext",
        buttons: buttons as FrameButtonsType,
        imageAspectRatio: "1.91:1",
        // inputText,
        ogImage: AppConfig.hostUrl + "/frame/trending-casts/image" + imageParams,
    };
    const html = getFrameHtml(frame, {
        // htmlBody,
        // htmlHead,
        og: { title: "trending-casts | algoskip" },
        title: "trending-casts | algoskip",
    });
    return new Response(html, { headers: { "Content-Type": "text/html" } });
}

import { Frame, getFrameHtml } from "frames.js"
import { AppConfig } from "../../AppConfig"
import { TrendingCastsFrameParams } from "../trending-casts/frame";

export function ChannelFilterFrame(params: TrendingCastsFrameParams) {
    const { filters, pfpUrl, username, algo, channel } = params;
    type FilterKey = keyof typeof filters;
    const filterKeys = Object.keys(filters).filter((k) => {
        const key = k as FilterKey;
        return params.filters[key];
    }).join(',');
    let imageParams = "?";
    imageParams += `pfpUrl=${pfpUrl}`;

    let postParams = "?";
    postParams += `channel=${channel ?? ''}&filters=${filterKeys}&algo=${algo ?? ''}&pfpUrl=${pfpUrl}&username=${username}`;
    // Cache bust
    // TODO: remove later
    imageParams += `&date=${Date.now()}`
    const frame: Frame = {
        image: AppConfig.hostUrl + '/frame/channel-filter/image' + imageParams,
        postUrl: AppConfig.hostUrl + '/frame/channel-filter' + postParams,
        version: 'vNext',
        buttons: [
            {action: 'post', label: 'back'},
            {action: 'post', label: '🔴'},
            {action: 'post', label: '🔵'},
        ],
        imageAspectRatio: '1.91:1',
        // inputText,
        ogImage: AppConfig.hostUrl + '/frame/channel-filter/image' + imageParams,
    }
    const html = getFrameHtml(frame, {
        // htmlBody,
        // htmlHead,
        og: {title: 'channel-filter | algoskip'},
        title: 'channel-filter | algoskip',
    })
    return new Response(html, {headers: {'Content-Type': 'text/html'}})
}
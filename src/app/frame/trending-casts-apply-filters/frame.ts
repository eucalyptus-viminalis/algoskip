import { Frame, getFrameHtml } from "frames.js"
import { AppConfig } from "../../AppConfig"
import { TrendingCastsFrameParams } from "../trending-casts/frame";

export function TrendingCastsApplyFiltersFrame(params: TrendingCastsFrameParams) {
    const { filters,pfpUrl,username,algo,channel, } = params;
    type FilterKey = keyof typeof filters;
    const filterKeys = Object.keys(filters).filter((k) => {
        const key = k as FilterKey;
        return params.filters[key];
    }).join(',');
    let imageParams = "?";
    imageParams += `filters=${filterKeys ?? ''}&pfpUrl=${pfpUrl}`;

    let postParams = "?";
    postParams += `channel=${channel ?? ''}&filters=${filterKeys ?? ''}&algo=${algo ?? ''}&username=${username}&pfpUrl=${pfpUrl}`;

    // Cache bust
    // TODO: remove later
    imageParams += `&date=${Date.now()}`
    const frame: Frame = {
        image: AppConfig.hostUrl + '/frame/trending-casts-apply-filters/image' + imageParams,
        postUrl: AppConfig.hostUrl + '/frame/trending-casts-apply-filters' + postParams,
        version: 'vNext',
        buttons: [
            {action: 'post', label: '🔴'},
            {action: 'post', label: '🔵'},
            {action: 'post', label: '🟡'},
            {action: 'post', label: 'Done'},
        ],
        imageAspectRatio: '1.91:1',
        // inputText,
        ogImage: AppConfig.hostUrl + '/frame/trending-casts-apply-filters/image' + imageParams,
    }
    const html = getFrameHtml(frame, {
        // htmlBody,
        // htmlHead,
        og: {title: 'trending-casts-apply-filters | algoskip'},
        title: 'trending-casts-apply-filters | algoskip',
    })
    return new Response(html, {headers: {'Content-Type': 'text/html'}})
}
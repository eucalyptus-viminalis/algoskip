import { Frame, getFrameHtml } from "frames.js"
import { AppConfig } from "../../AppConfig"
import { MyCastsFrameParams } from "../my-casts/frame"

export function ApplyFiltersFrame(params: MyCastsFrameParams) {
    const { filters, algo } = params;
    type FilterKey = keyof typeof filters;
    const filterKeys = Object.keys(filters).filter((k) => {
        const key = k as FilterKey;
        return params.filters[key];
    });
    let imageParams = "?";
    imageParams += `filters=${filterKeys.join(",")}&algo=${algo}`;

    let postParams = "?";
    postParams += `filters=${filterKeys.join(",")}&algo=${algo}`;
    // Cache bust
    imageParams += `&date=${Date.now()}`
    const frame: Frame = {
        image: AppConfig.hostUrl + '/frame/apply-filters/image' + imageParams,
        postUrl: AppConfig.hostUrl + '/frame/apply-filters' + postParams,
        version: 'vNext',
        buttons: [
            {action: 'post', label: '🔴'},
            {action: 'post', label: '🔵'},
            {action: 'post', label: '🟡'},
            {action: 'post', label: 'Done'},
        ],
        imageAspectRatio: '1.91:1',
        // inputText,
        ogImage: AppConfig.hostUrl + '/frame/apply-filters/image' + imageParams,
    }
    const html = getFrameHtml(frame, {
        // htmlBody,
        // htmlHead,
        og: {title: 'apply-filters | algoskip'},
        title: 'apply-filters | algoskip',
    })
    return new Response(html, {headers: {'Content-Type': 'text/html'}})
}
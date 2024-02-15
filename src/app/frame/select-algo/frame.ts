import { Frame, getFrameHtml } from "frames.js"
import { AppConfig } from "../../AppConfig"
import { MyCastsFrameParams } from "../my-casts/frame"

export function SelectAlgoFrame(params: MyCastsFrameParams) {
    const { filters, algo, username, pfpUrl } = params;
    type FilterKey = keyof typeof filters;
    const filterKeys = Object.keys(filters).filter((k) => {
        const key = k as FilterKey;
        return params.filters[key];
    });
    let imageParams = "?";
    imageParams += `algo=${algo}&pfpUrl=${pfpUrl}`;

    let postParams = "?";
    postParams += `filters=${filterKeys.join(",")}&algo=${algo}&pfpUrl=${pfpUrl}&username=${username}`;
    // Cache bust
    // TODO: remove later
    imageParams += `&date=${Date.now()}`
    const frame: Frame = {
        image: AppConfig.hostUrl + '/frame/select-algo/image' + imageParams,
        postUrl: AppConfig.hostUrl + '/frame/select-algo' + postParams,
        version: 'vNext',
        buttons: [
            {action: 'post', label: '🔴'},
            {action: 'post', label: '🔵'},
            {action: 'post', label: '🟡'},
            {action: 'post', label: 'Done'},
        ],
        imageAspectRatio: '1.91:1',
        // inputText,
        ogImage: AppConfig.hostUrl + '/frame/select-algo/image' + imageParams,
    }
    const html = getFrameHtml(frame, {
        // htmlBody,
        // htmlHead,
        og: {title: 'select-algo | algoskip'},
        title: 'select-algo | algoskip',
    })
    return new Response(html, {headers: {'Content-Type': 'text/html'}})
}
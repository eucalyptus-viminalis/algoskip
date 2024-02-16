import { Frame, FrameButton, FrameButtonsType, getFrameHtml } from "frames.js";
import { AppConfig } from "../../AppConfig";
import { ChannelFilter, getData } from "./data";
import { TrendingCastsFrameParams } from "../trending-casts/frame";

export type SelectChannelFrameParams = {
    channelFilter: "following" | "anyone";
    fid: number;
    skip: number;
    trendingCastsFrameParams: TrendingCastsFrameParams;
};

export async function SelectChannelFrame(params: SelectChannelFrameParams) {
    const { channelFilter, fid, skip, trendingCastsFrameParams: trendingsCastsFrameParams } = params;
    const {filters, pfpUrl, username, algo, channel,} = trendingsCastsFrameParams
    type FilterKey = keyof typeof filters;
    const filterKeys = Object.keys(filters).filter((k) => {
        const key = k as FilterKey;
        return filters[key];
    }).join(',');

    const data = await getData(fid, channelFilter);
    let slicedData = data.slice(skip ?? 0).slice(0, 2);

    let postParams = "?";
    postParams += `channelFilter=${channelFilter}&skip=${skip ?? ""}`
    postParams += `channel=${channel ?? ''}&filters=${filterKeys}&algo=${algo ?? ''}&pfpUrl=${pfpUrl}&username=${username}`;

    let buttons: FrameButton[] = [];
    let imageParams = "?";
    imageParams += `total=${data.length}`;

    if (slicedData[0]) {
        // First button
        if (!skip) {
            // Back button
            buttons.push({ action: "post", label: "back" });
        } else {
            buttons.push({ action: "post", label: `1..${skip}` });
        }
        // Select button 1
        buttons.push({ action: "post", label: `${skip ? skip + 1 : 1}` });
        imageParams += `&option1Name=${slicedData[0].id}&option1Count=${
            slicedData[0].castsFromMutuals ?? ""
        }&option1Idx=${skip ?? 0}`;

        if (slicedData[1]) {
            imageParams += `&option2Name=${slicedData[1].id}&option2Count=${
                slicedData[1].castsFromMutuals ?? ""
            }&option2Idx=${skip ? skip + 1 : 1}`;
            // Select button 2
            buttons.push({ action: "post", label: `${skip ? skip + 2 : 2}` });
            if (skip && data.length > skip + 2) {
                // paging button
                buttons.push({
                    action: "post",
                    label: `${skip + 1}..${data.length}`,
                });
            }
        }
    } else {
        // Back button
        buttons.push({ action: "post", label: "back" });
    }

    const frame: Frame = {
        image: AppConfig.hostUrl + "/frame/select-channel/image" + imageParams,
        postUrl: AppConfig.hostUrl + "/frame/select-channel" + postParams,
        version: "vNext",
        buttons: buttons as FrameButtonsType,
        imageAspectRatio: "1.91:1",
        // inputText:,
        ogImage:
            AppConfig.hostUrl + "/frame/select-channel/image" + imageParams,
    };

    const html = getFrameHtml(frame, {
        // htmlBody,
        // htmlHead,
        og: { title: "select-channel | algoskip" },
        title: "select-channel | algoskip",
    });
    return new Response(html, { headers: { "Content-Type": "text/html" } });
}

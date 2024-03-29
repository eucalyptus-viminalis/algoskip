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
    const { channelFilter, fid, skip, trendingCastsFrameParams } = params;
    const {filters, pfpUrl, username, algo, channel,} = trendingCastsFrameParams
    type FilterKey = keyof typeof filters;
    const filterKeys = Object.keys(filters).filter((k) => {
        const key = k as FilterKey;
        return filters[key];
    }).join(',');

    const data = await getData(fid, channelFilter);
    let slicedData = data.slice(skip).slice(0, 2);

    let postParams = "?";
    postParams += `channelFilter=${channelFilter}&skip=${skip}`
    postParams += `&channel=${channel ?? ''}&filters=${filterKeys}&algo=${algo ?? ''}&pfpUrl=${pfpUrl}&username=${username}`;

    let buttons: FrameButton[] = [];
    let imageParams = "?";
    imageParams += `total=${data.length}`;

    if (slicedData[0]) {
        // First button
        if (skip == 0) {
            // Back button
            buttons.push({ action: "post", label: "back" });
        } else {
            buttons.push({ action: "post", label: `1..${skip}` });
        }
        // Select button 1
        buttons.push({ action: "post", label: `${skip + 1}` });
        imageParams += `&option1Name=${slicedData[0].id}&option1CountMutuals=${
            slicedData[0].castsFromMutuals ?? ""
        }&option1Count1Day=${slicedData[0].castsIn1day ?? ""}&option1Idx=${skip}`;

        // Add channelId to postParams
        postParams += `&option1Name=${slicedData[0].id}`

        if (slicedData[1]) {
            // Add channelId of second option to postParams
            postParams += `&option2Name=${slicedData[1].id}`

            imageParams += `&option2Name=${slicedData[1].id}&option2CountMutuals=${
                slicedData[1].castsFromMutuals ?? ""
            }&option2Count1Day=${slicedData[1].castsIn1day ?? ""}&option2Idx=${skip+1}`;
            // Select button 2
            buttons.push({ action: "post", label: `${skip + 2}` });
            console.log(`skip: ${skip}`)
            if (data.length > skip + 2) {
                console.log('here')
                // paging button
                buttons.push({
                    action: "post",
                    label: `${skip + 3}..${data.length}`,
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

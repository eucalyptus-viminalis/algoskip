import { Frame, FrameButtonsType, getFrameHtml } from "frames.js";
import { AppConfig } from "../../AppConfig";
import { data } from "./data";
import { ErrorFrame } from "../error/frame";
import { objectToSearchParams } from "@/src/utils/url-utils";
import { TrendingCastsFrameParams } from "../trending-casts/frame";

type TrendingRevealFrameProps = {
    fid: number;
    curIndex: number;
    filtersAndAlgo: TrendingCastsFrameParams;
};

export type TrendingRevealData = {
    recastCount: number;
    likeCount: number;
    replyCount: number;
    next: boolean;
    embedImg?: string;
    hasSecondEmbed: boolean;
    ago: string;
    castTxt: string;
    wcCastHash: string;
    pfpUrl: string;
    username: string;
};

export async function TrendingRevealFrame(props: TrendingRevealFrameProps) {
    const { curIndex, filtersAndAlgo, fid } = props;
    const revealData = await data(fid, filtersAndAlgo, curIndex);
    if (!revealData) {
        return ErrorFrame();
    }

    // Image params
    // DEBUG
    const { filters, pfpUrl, username, algo, channel } = props.filtersAndAlgo;
    type FilterKey = keyof typeof filters;
    const filterKeys = Object.keys(filters)
        .filter((k) => {
            const key = k as FilterKey;
            return filters[key];
        })
        .join(",");
    const urlparams = objectToSearchParams(revealData);
    const urlParamsQueryStr = urlparams.toString();

    let imageParams = `?curIdx=${curIndex}`;
    imageParams += "&" + urlParamsQueryStr;
    imageParams += `&channel=${channel}`;

    // Post params
    let postParams = "?";
    postParams +=
        `curIndex=${curIndex}` +
        `&filters=${filterKeys}` +
        `&algo=${algo}` +
        `&channel=${channel}` +
        `&username=${username}` +
        `&pfpUrl=${pfpUrl}` +
        `&next=${revealData.next}`;

    const buttons = [
        { action: "post", label: curIndex == 0 ? "<trending" : "<back" },
        {
            action: "link",
            label: "goto cast",
            target: `https://warpcast.com/${revealData.username}/${revealData.wcCastHash}`,
        },
    ];
    if (revealData.next) {
        buttons.push({action: 'post', label: 'next>'})
    } else {
        buttons.push({action: 'post', label: 'main-menu'})
    }

    // Cache bust
    // Todo: remove later
    imageParams += `&date=${Date.now()}`;
    const frame: Frame = {
        image: AppConfig.hostUrl + "/frame/trending-reveal/image" + imageParams,
        postUrl: AppConfig.hostUrl + "/frame/trending-reveal" + postParams,
        version: "vNext",
        buttons: buttons as FrameButtonsType,
        imageAspectRatio: "1.91:1",
        // inputText:,
        ogImage:
            AppConfig.hostUrl + "/frame/trending-reveal/image" + imageParams,
    };
    const html = getFrameHtml(frame, {
        // htmlBody,
        // htmlHead,
        og: { title: "trending-reveal | algoskip" },
        title: "trending-reveal | algoskip",
    });
    return new Response(html, { headers: { "Content-Type": "text/html" } });
}

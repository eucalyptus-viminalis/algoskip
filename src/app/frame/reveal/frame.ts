import { Frame, FrameButton, FrameButtonsType, getFrameHtml } from "frames.js";
import { AppConfig } from "../../AppConfig";
import { MyCastsFrameParams } from "../my-casts/frame";
import { data } from "./data";
import { ErrorFrame } from "../error/frame";
import { objectToSearchParams } from "@/src/utils/url-utils";

type RevealFrameProps = {
    curIndex: number;
    fid: number;
    filtersAndAlgo: MyCastsFrameParams;
};

export type RevealData = {
    recastCount: number;
    likeCount: number;
    replyCount: number;
    next: boolean;
    embedImg?: string;
    hasSecondEmbed: boolean;
    ago: string;
    castTxt: string;
    wcCastHash: string;
};

export async function RevealFrame(props: RevealFrameProps) {
    const { curIndex, fid, filtersAndAlgo } = props;
    const revealData = await data(fid, filtersAndAlgo, curIndex);
    if (!revealData) {
        return ErrorFrame();
    }
    let imageParams = `?curIdx=${curIndex}`;
    // DEBUG
    const { filters, algo, pfpUrl, username } = props.filtersAndAlgo;
    const urlparams = objectToSearchParams(revealData);
    const urlParamsQueryStr = urlparams.toString();
    imageParams +=
        "&" + urlParamsQueryStr + `&pfpUrl=${pfpUrl}&username=${username}`;
    type FilterKey = keyof typeof filters;
    const filterKeys = Object.keys(filters)
        .filter((k) => {
            const key = k as FilterKey;
            return filters[key];
        })
        .join(",");

    // Post params
    let postParams = "?";
    postParams +=
        `curIndex=${curIndex}` +
        `&filters=${filterKeys}` +
        `&algo=${algo}` +
        `&username=${username}` +
        `&pfpUrl=${pfpUrl}` +
        `&next=${revealData.next}`

    const buttons: FrameButton[] = [
        { action: "post", label: curIndex == 0 ? "<my-casts" : "<back" },
        {
            action: "link",
            label: "goto cast",
            target: `https://warpcast.com/${username}/${revealData.wcCastHash}`,
        },
    ];
    if (revealData.next) {
        buttons.push({ action: "post", label: "next>" })
    } else {
        buttons.push({ action: "post", label: "main-menu" })
    }
    // Cache bust
    // Todo: remove later
    imageParams += `&date=${Date.now()}`;
    const frame: Frame = {
        image: AppConfig.hostUrl + "/frame/reveal/image" + imageParams,
        postUrl: AppConfig.hostUrl + "/frame/reveal" + postParams,
        version: "vNext",
        buttons: buttons as FrameButtonsType,
        imageAspectRatio: "1.91:1",
        // inputText:,
        ogImage: AppConfig.hostUrl + "/frame/reveal/image" + imageParams,
    };
    const html = getFrameHtml(frame, {
        // htmlBody,
        // htmlHead,
        og: { title: "reveal | algoskip" },
        title: "reveal | algoskip",
    });
    return new Response(html, { headers: { "Content-Type": "text/html" } });
}

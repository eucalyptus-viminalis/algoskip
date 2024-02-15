import { Frame, getFrameHtml } from "frames.js"
import { AppConfig } from "../../AppConfig"
import { MyCastsFrameParams } from "../my-casts/frame"
import { data } from "./data"
import { ErrorFrame } from "../error/frame"
import { objectToSearchParams } from "@/src/utils/url-utils"

type RevealFrameProps = {
    curIndex: number
    fid: number
    filtersAndAlgo: MyCastsFrameParams
}

export type RevealData = {
    recastCount: number
    likeCount: number
    replyCount: number
    next: boolean
    embedImg?: string
    hasSecondEmbed: boolean
    ago: string
    castTxt: string
    wcCastHash: string
}

export async function RevealFrame(props: RevealFrameProps) {
    const {curIndex, fid, filtersAndAlgo} = props
    const revealData = await data(fid, filtersAndAlgo, curIndex)
    if (!revealData) {
        return ErrorFrame()
    }
    let imageParams = `?curIdx=${curIndex}`
    imageParams += objectToSearchParams(revealData)
    // DEBUG
    console.log(`objectToSearchParams: ${imageParams}`)
    let postParams = '?'
    const { filters, algo, pfpUrl, username } = props.filtersAndAlgo;
    type FilterKey = keyof typeof filters;
    const filterKeys = Object.keys(filters).filter((k) => {
        const key = k as FilterKey;
        return filters[key];
    }).join(',');
    postParams += `curIndex=${curIndex}`
        + `&filters=${filterKeys}`
        + `&algo=${algo}`
        + `&username=${username}`
        + `&pfpUrl=${pfpUrl}`

    // Cache bust
    // Todo: remove later
    imageParams += `&date=${Date.now()}`
    const frame: Frame = {
        image: AppConfig.hostUrl + '/frame/reveal/image' + imageParams,
        postUrl: AppConfig.hostUrl + '/frame/reveal' + postParams,
        version: 'vNext',
        buttons: [
            {action: 'post', label: curIndex == 0 ? 'my-casts' : 'back'},
            {action: 'link', label: 'goto cast', target: `https://warpcast.com/${username}/${revealData.wcCastHash}`},
            {action: 'post', label: 'next'}     // FIXME: should be dynamic on data length
        ],
        imageAspectRatio: '1.91:1',
        // inputText:,
        ogImage: AppConfig.hostUrl + '/frame/reveal/image' + imageParams,
    }
    const html = getFrameHtml(frame, {
        // htmlBody,
        // htmlHead,
        og: {title: 'reveal | algoskip'},
        title: 'reveal | algoskip',
    })
    return new Response(html, {headers: {'Content-Type': 'text/html'}})
}
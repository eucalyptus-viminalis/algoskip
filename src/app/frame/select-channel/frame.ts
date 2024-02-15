import { Frame, FrameButton, FrameButtonsType, getFrameHtml } from "frames.js"
import { AppConfig } from "../../AppConfig"
import { ChannelFilter, data } from "./data"

type SelectChannelFrameParams = {
    total: number,
    option1: {
        name: string,
        castsCount?: number,
        index: number
    },
    option2?: {
        name: string,
        castsCount?: number,
        index: number
    }
}

export async function SelectChannelFrame(fid: number, filter?: ChannelFilter, skip?: number) {
    const res = await data(fid, filter)
    let slicedData = res.slice(skip ?? 0).slice(0, 2)
    let imageParams = '?'
    imageParams += `total=${res.length}`
    imageParams += `&option1Name=${slicedData[0].id}&option1Count=${slicedData[0].castsFromMutuals ?? ''}&option1Idx=${skip ?? 0}`
    let postUrlParams = '?'
    postUrlParams += `filter=${filter ?? ''}&skip=${skip ?? ''}`
    let buttons: FrameButton[] = []
    // First button
    if (!skip) {
        // Back button
        buttons.push({action: 'post', label: 'back'})
    } else {
        buttons.push({action: 'post', label: `1..${skip}`})
    }
    // Select button 1
    buttons.push({action: 'post', label: `${skip ? skip + 1 : 1}`})

    if (slicedData.length == 2) {
        imageParams += `&option2Name=${slicedData[1].id}&option2Count=${slicedData[1].castsFromMutuals ?? ''}&option2Idx=${skip ? skip + 1 : 1}`
        buttons.push({action: 'post', label: `${skip ? skip + 2 : 2}`})
        if (skip && res.length > skip + 2) {
            buttons.push({action: 'post', label: `${skip + 1}..${res.length}`})
        }
    }

    const frame: Frame = {
        image: AppConfig.hostUrl + '/frame/select-channel/image' + imageParams,
        postUrl: AppConfig.hostUrl + '/frame/select-channel' + postUrlParams,
        version: 'vNext',
        buttons: buttons as FrameButtonsType,
        imageAspectRatio: '1.91:1',
        // inputText:,
        ogImage: AppConfig.hostUrl + '/frame/select-channel/image' + imageParams,
    }

    const html = getFrameHtml(frame, {
        // htmlBody,
        // htmlHead,
        og: {title: 'select-frame | algoskip'},
        title: 'select-frame | algoskip',
    })
    return new Response(html, {headers: {'Content-Type': 'text/html'}})
}

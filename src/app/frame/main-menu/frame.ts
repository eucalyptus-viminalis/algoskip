import { Frame, getFrameHtml } from "frames.js"
import { AppConfig } from "../../AppConfig"
import { data } from "./data"


export async function MainMenuFrame(fid: number) {

    const pfpUrl = await data(fid)
    let imageParams = '?'
    imageParams += `pfpUrl=${pfpUrl}`

    // Cache bust
    imageParams += `&date=${Date.now()}`
    const frame: Frame = {
        image: AppConfig.hostUrl + '/frame/main-menu/image' + imageParams,
        postUrl: AppConfig.hostUrl + '/frame/main-menu',
        version: 'vNext',
        buttons: [
            {action:'post', label: 'home'},
            {action:'post', label: 'my-casts'},
            {action:'post', label: 'trending'},
        ],
        imageAspectRatio: '1.91:1',
        // inputText: ,
        ogImage: AppConfig.hostUrl + '/frame/main-menu/image' + imageParams,
    }
    const html = getFrameHtml(frame, {
        // htmlBody,
        // htmlHead,
        og: {title: 'main-menu | algoskip'},
        title: 'main-menu | algoskip',
    })
    return new Response(html, {headers: {'Content-Type': 'text/html'}})
}
import { Frame, getFrameHtml } from "frames.js"
import { AppConfig } from "../../AppConfig"
import { getData } from "./data"

export type MainMenuData = {
    username: string
    pfpUrl: string
}

export async function MainMenuFrame(fid: number) {

    const data = await getData(fid)

    const imageParams = new URLSearchParams()
    const postParams = new URLSearchParams()

    imageParams.set('pfpUrl', data.pfpUrl)
    postParams.set('pfpUrl', data.pfpUrl)
    postParams.set('username', data.username)

    // Cache bust
    // TODO: Remove this later
    imageParams.set('date', Date.now().toString())

    const frame: Frame = {
        image: AppConfig.hostUrl + '/frame/main-menu/image?' + imageParams,
        postUrl: AppConfig.hostUrl + '/frame/main-menu?' + postParams,
        version: 'vNext',
        buttons: [
            {action:'post', label: '<home'},
            {action:'post', label: 'my-casts'},
            {action:'post', label: 'trending'},
        ],
        imageAspectRatio: '1.91:1',
        // inputText: ,
        ogImage: AppConfig.hostUrl + '/frame/main-menu/image?' + imageParams,
    }
    const html = getFrameHtml(frame, {
        // htmlBody,
        // htmlHead,
        og: {title: 'main-menu | algoskip'},
        title: 'main-menu | algoskip',
    })
    return new Response(html, {headers: {'Content-Type': 'text/html'}})
}
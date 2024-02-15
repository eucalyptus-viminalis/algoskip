import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { MyCastsFrameParams } from "../my-casts/frame"
import { AppConfig } from "../../AppConfig";
import { RevealData } from "./frame";
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

// timeAgo.format(new Date())
// // "just now"

// timeAgo.format(Date.now() - 60 * 1000)
// // "1 minute ago"

// timeAgo.format(Date.now() - 2 * 60 * 60 * 1000)
// // "2 hours ago"

// timeAgo.format(Date.now() - 24 * 60 * 60 * 1000)
// // "1 day ago"

const client = new NeynarAPIClient(AppConfig.neynarApiKey);

export async function data(fid: number, filtersAndAlgo: MyCastsFrameParams, curIndex: number)
: Promise<RevealData | null | undefined>
{
    const casts = await client.fetchAllCastsCreatedByUser(fid, {
        // cursor,
        limit: 150,
        // parentUrl,
        // viewerFid,
    })
    if (casts.result.casts.length < curIndex + 1) {
        // Return early
        return null
    }
    let filteredCasts = casts.result.casts.filter(async c => {
        if (filtersAndAlgo.filters.embeds) {
            const hasEmbeds = c.embeds.length != 0
            if (!hasEmbeds) return false
        }
        if (filtersAndAlgo.filters.mentions) {
            const mentionsExists = c.mentionedProfiles.length != 0
            if (!mentionsExists) return false
        }
        if (filtersAndAlgo.filters.followerReactions) {
            // TODO: When user loads from home screen,
            // start fetching this data in the background and cache it for use here.
            // FIXME: Currently, this will not work as intended
            const followers = await client.fetchUserFollowers(fid)
            const followerFids = followers.result.users.map(u => u.fid)
            const reactionFids = c.reactions.fids
            const recasters = c.recasts.fids
            const found = reactionFids.concat(recasters).some(fid => followerFids.includes(fid));
            if (!found) return false
        }
    })
    if (filteredCasts.length < curIndex + 1) {
        // Return early
        return null
    }
    // sort by latest | popular | reactionsPerWord
    if (filtersAndAlgo.algo != 'latest') {
        let sortedCasts = filteredCasts.sort((a,b) => {
            if (filtersAndAlgo.algo == 'popular') {
                return (b.reactions.count + b.recasts.count + b.replies.count) - (a.reactions.count + a.recasts.count + b.replies.count)
            } else if (filtersAndAlgo.algo == 'reactionsPerWord') {
                const bReactions = b.reactions.count + b.recasts.count + b.replies.count
                const aReactions = a.reactions.count + a.recasts.count + a.replies.count
                return (bReactions / b.text.length) - (aReactions / a.text.length)
            } else {
                return 0
            }
        })
        return sortedCasts.map(c => {
            return {
                ago: timeAgo.format(new Date(c.timestamp)),
                castTxt: c.text,
                embedImg1: c.embeds[0]?.url ?? null,
                embedImg2: c.embeds[1]?.url ?? null,
                likeCount: c.reactions.count,
                next: sortedCasts.length > curIndex + 1,
                recastCount: c.recasts.count,
                replyCount: c.replies.count,
                wcCastHash: c.hash  // TODO: probably wrong
            }
        })[curIndex]
    } else {
        return filteredCasts.map(c => {
            return {
                ago: timeAgo.format(new Date(c.timestamp)),
                castTxt: c.text,
                embedImg1: c.embeds[0]?.url ?? null,
                embedImg2: c.embeds[1]?.url ?? null,
                likeCount: c.reactions.count,
                next: filteredCasts.length > curIndex + 1,
                recastCount: c.recasts.count,
                replyCount: c.replies.count,
                wcCastHash: c.hash  // TODO: probably wrong
            }
        })[curIndex]
    }

}
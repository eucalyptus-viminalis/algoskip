import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { MyCastsFrameParams } from "../my-casts/frame";
import { AppConfig } from "../../AppConfig";
import { RevealData } from "./frame";
import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

// timeAgo.format(new Date())
// // "just now"

// timeAgo.format(Date.now() - 60 * 1000)
// // "1 minute ago"

// timeAgo.format(Date.now() - 2 * 60 * 60 * 1000)
// // "2 hours ago"

// timeAgo.format(Date.now() - 24 * 60 * 60 * 1000)
// // "1 day ago"

const imageFormats = ["png", "jpeg", "jpg", "gif", "svg", "webp"];

const client = new NeynarAPIClient(AppConfig.neynarApiKey);

export async function data(
    fid: number,
    filtersAndAlgo: MyCastsFrameParams,
    curIndex: number
): Promise<RevealData | null | undefined> {
    // const ccc = await client.fetchBulkCasts
    // const ccc = await client.fetchFramesOnlyFeed
    // const ccc = await client.fetchPopularCastsByUser
    const casts = await client.fetchAllCastsCreatedByUser(fid, {
        // cursor,
        limit: 150,
        // parentUrl,
        // viewerFid,
    });
    if (casts.result.casts.length < curIndex + 1) {
        // Return early
        return null;
    }
    let filteredCasts = casts.result.casts.filter(async (c) => {
        // console.log('embeds:')
        // console.log(JSON.stringify(c.embeds));
        if (filtersAndAlgo.filters.embeds) {
            const hasEmbeds = c.embeds.some((e) => e.url != null);
            if (!hasEmbeds) return false;
            const embedFormats = c.embeds.map((e) => {
                // console.log(`e: ${JSON.stringify(e, null, 2)}`)
                return e.url?.split(".").pop() ?? "";
            });
            const hasImages = embedFormats.some((ef) =>
                imageFormats.includes(ef)
            );
            if (!hasImages) return false;
        }
        if (filtersAndAlgo.filters.mentions) {
            const mentionsExists = c.mentionedProfiles.length != 0;
            if (!mentionsExists) return false;
        }
        if (filtersAndAlgo.filters.followerReactions) {
            // TODO: When user loads from home screen,
            // start fetching this data in the background and cache it for use here.
            // FIXME: Currently, this will not work as intended
            const followers = await client.fetchUserFollowers(fid);
            const followerFids = followers.result.users.map((u) => u.fid);
            const reactionFids = c.reactions.fids;
            const recasters = c.recasts.fids;
            const found = reactionFids
                .concat(recasters)
                .some((fid) => followerFids.includes(fid));
            if (!found) return false;
        }
        return true
    }).slice(0,5);  // Show at max 5 casts
    if (filteredCasts.length < curIndex + 1) {
        // Return early
        return null;
    }
    // sort by latest | popular | reactionsPerWord
    if (filtersAndAlgo.algo != "latest") {
        let sortedCasts = filteredCasts.sort((a, b) => {
            if (filtersAndAlgo.algo == "popular") {
                return (
                    b.reactions.count +
                    b.recasts.count +
                    b.replies.count -
                    (a.reactions.count + a.recasts.count + b.replies.count)
                );
            } else if (filtersAndAlgo.algo == "reactionsPerWord") {
                const bReactions =
                    b.reactions.count + b.recasts.count + b.replies.count;
                const aReactions =
                    a.reactions.count + a.recasts.count + a.replies.count;
                return bReactions / b.text.length - aReactions / a.text.length;
            } else {
                return 0;
            }
        });
        const c = sortedCasts[curIndex];
        console.log(`LENGTH: ${c.embeds.length}`)
        const embedImgs = c.embeds.filter((e) => {
            if (!e || !e.url) {
                return false
            }
            const format = e.url?.split(".").pop() ?? '';
            if (!format) return false;
            return imageFormats.includes(format);
        });
        return {
            ago: timeAgo.format(new Date(c.timestamp)),
            castTxt: c.text,
            hasSecondEmbed: embedImgs.length > 1,
            likeCount: c.reactions.count,
            next: sortedCasts.length > curIndex + 1,
            recastCount: c.recasts.count,
            replyCount: c.replies.count,
            wcCastHash: c.hash, // TODO: probably wrong
            embedImg: embedImgs[0]?.url ?? undefined,
        };
    } else {
        const c = filteredCasts[curIndex];
        const embedImgs = c.embeds.filter((e) => {
            if (!e || !e.url) {
                return false
            }
            const format = e.url?.split(".").pop() ?? '';
            if (!format) return false;
            return imageFormats.includes(format);
        });
        return {
            ago: timeAgo.format(new Date(c.timestamp)),
            castTxt: c.text,
            hasSecondEmbed: embedImgs.length > 1,
            likeCount: c.reactions.count,
            next: filteredCasts.length > curIndex + 1,
            recastCount: c.recasts.count,
            replyCount: c.replies.count,
            wcCastHash: c.hash, // TODO: probably wrong
            embedImg: embedImgs[0]?.url ?? undefined,
        };
    }
}

import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { AppConfig } from "../../AppConfig";
import { TrendingRevealData } from "./frame";
import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";
import { TrendingCastsFrameParams } from "../trending-casts/frame";
import { EmbedUrl, FeedResponse } from "@neynar/nodejs-sdk/build/neynar-api/v2";

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
    filtersAndAlgo: TrendingCastsFrameParams,
    curIndex: number
): Promise<TrendingRevealData | null | undefined> {
    const {filters,algo,channel,} = filtersAndAlgo
    // const ccc = await client.fetchBulkCasts
    // const ccc = await client.fetchFramesOnlyFeed
    // const ccc = await client.fetchPopularCastsByUser
    const data: FeedResponse = await client.fetchFeedByChannelIds([channel!], {
        // cursor,
        limit: 100,     // max limit
        // withRecasts,
        // withReplies,
    });
    if (data.casts.length < curIndex + 1) {
        // No casts found
        // - Return early
        return null;
    }
    let filteredCasts = data.casts.filter(async (c) => {
        // console.log('embeds:')
        // console.log(JSON.stringify(c.embeds));
        if (filters.embeds) {
            const hasEmbedUrls = c.embeds.some((e) => {
                const embed = e as EmbedUrl
                return embed.url
            });
            if (!hasEmbedUrls) return false;
            const embedFormats = c.embeds.map((e) => {
                const embed = e as EmbedUrl
                // console.log(`e: ${JSON.stringify(e, null, 2)}`)
                return embed.url?.split(".").pop() ?? "";
            });
            const hasImages = embedFormats.some((ef) =>
                imageFormats.includes(ef)
            );
            if (!hasImages) return false;
        }
        if (filters.mentions) {
            const mentionsExists = c.mentioned_profiles.length != 0;
            if (!mentionsExists) return false;
        }
        if (filters.followerReactions) {
            // TODO: When user loads from home screen,
            // start fetching this data in the background and cache it for use here.
            // FIXME: Currently, this will not work as intended
            const followers = await client.fetchUserFollowers(fid);
            const followerFids = followers.result.users.map((u) => u.fid);
            const likesFids = c.reactions.likes.map(l=>l.fid);
            const recastsFids = c.reactions.recasts.map(rc=>rc.fid);
            const found = likesFids
                .concat(recastsFids)
                .some((fid) => followerFids.includes(fid));
            if (!found) return false;
        }
        return true
    });
    if (filteredCasts.length < curIndex + 1) {
        // Return early
        return null;
    }
    // sort by latest | popular | reactionsPerWord
    if (algo != "latest") {
        let sortedCasts = filteredCasts.sort((a, b) => {
            if (algo == "popular") {
                return (
                    (b.reactions.likes.length +
                    b.reactions.recasts.length +
                    b.replies.count) -
                    (a.reactions.likes.length + a.reactions.recasts.length + b.replies.count)
                );
            } else if (algo == "reactionsPerWord") {
                const bReactions =
                    b.reactions.likes.length + b.reactions.recasts.length + b.replies.count;
                const aReactions =
                    a.reactions.likes.length + a.reactions.recasts.length + a.replies.count;
                return (bReactions / b.text.length == 0 ? 1 : b.text.length) - (aReactions / a.text.length == 0 ? 1 : a.text.length);
            } else {
                return 0;
            }
        });
        const c = sortedCasts[curIndex];
        const embedImgs = c.embeds.filter((e) => {
            const embed = e as EmbedUrl
            if (!embed || !embed.url) {
                return false
            }
            const format = embed.url?.split(".").pop() ?? '';
            if (!format) return false;
            return imageFormats.includes(format);
        });
        const embedImgUrls = embedImgs.map(e => {
            const embed = e as EmbedUrl
            return embed.url
        })
        return {
            ago: timeAgo.format(new Date(c.timestamp)),
            castTxt: c.text,
            hasSecondEmbed: embedImgUrls.length > 1,
            likeCount: c.reactions.likes.length,
            next: sortedCasts.length > curIndex + 1,
            recastCount: c.reactions.recasts.length,
            replyCount: c.replies.count,
            wcCastHash: c.hash, // TODO: probably wrong
            embedImg: embedImgUrls[0],
            pfpUrl: c.author.pfp_url,
            username: c.author.username,
        };
    } else {
        const c = filteredCasts[curIndex];
        const embedImgs = c.embeds.filter((e) => {
            const embed = e as EmbedUrl
            if (!embed || !embed.url) {
                return false
            }
            const format = embed.url?.split(".").pop() ?? '';
            if (!format) return false;
            return imageFormats.includes(format);
        });
        const embedImgUrls = embedImgs.map(e => {
            const embed = e as EmbedUrl
            return embed.url
        })
        return {
            ago: timeAgo.format(new Date(c.timestamp)),
            castTxt: c.text,
            hasSecondEmbed: embedImgUrls.length > 1,
            likeCount: c.reactions.likes.length,
            next: filteredCasts.length > curIndex + 1,
            recastCount: c.reactions.recasts.length,
            replyCount: c.replies.count,
            wcCastHash: c.hash, // TODO: probably wrong
            embedImg: embedImgUrls[0],
            pfpUrl: c.author.pfp_url,
            username: c.author.username,
        };
    }
}

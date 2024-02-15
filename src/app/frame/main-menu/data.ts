import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { AppConfig } from "../../AppConfig";
import { MainMenuData } from "./frame";
import { unstable_cache } from "next/cache";

const client = new NeynarAPIClient(AppConfig.neynarApiKey);

export async function getData(fid: number)
: Promise<MainMenuData>
{
    // const data = await client.lookupUserByFid(fid)
    // return {
    //     pfpUrl: data.result.user.pfp.url,
    //     username: data.result.user.username
    // }
    return await getCachedData(fid)
    // return await data(fid)
}

async function data(fid: number) {
    const data = await client.lookupUserByFid(fid)
    return {
        pfpUrl: data.result.user.pfp.url,
        username: data.result.user.username
    }
}

const getCachedData = unstable_cache(
    async (fid: number) => data(fid),
    ['MainMenuData'],
    {revalidate: 60}
  );
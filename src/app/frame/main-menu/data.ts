import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { AppConfig } from "../../AppConfig";

const client = new NeynarAPIClient(AppConfig.neynarApiKey);

export async function data(fid: number) {
    const data = await client.lookupUserByFid(fid)
    return data.result.user.pfp.url
}
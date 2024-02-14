import { Frame, getFrameHtml } from "frames.js";
import { AppConfig } from "../../AppConfig";

export function ErrorFrame(backUrl?: string | null, errorMsg?: string | null) {
    const title = "error | algoskip";
    const defaultErrorMsg = "Error. Watch this cast for update notifications."
    const frame: Frame = {
        image:
            AppConfig.hostUrl +
            `/image/error?backUrl=${backUrl ? "true" : ""}&errorMsg=${
                errorMsg ? encodeURIComponent(errorMsg) : encodeURIComponent(defaultErrorMsg)
            }`,
        postUrl:
            AppConfig.hostUrl +
            `/frame/error?backUrl=${
                backUrl ? encodeURIComponent(backUrl) : ""
            }`,
        version: "vNext",
        buttons: backUrl
            ? [
                  { action: "post", label: "1" },
                  { action: "post", label: "2" },
              ]
            : [{ action: "post", label: "1" }],
    };
    const html = getFrameHtml(frame, {
        title: title,
        og: { title: title },
    });
    return new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html" },
    });
}
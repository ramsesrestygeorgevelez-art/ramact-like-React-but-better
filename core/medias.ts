import { Camera } from "../core/tools/video/camera/screenshot";
import { VideoPlayer } from "../core/tools/video/videoPlay";
import { Addon, Dispose, RamactContext } from "./core";
export const Media: Addon = {
    name: "media",
    
    init: function (ctx: RamactContext): void | Dispose {
        const medias = { VideoPlayer, Camera}
        ctx.registry.set("media", medias);
        return () => {
            // no global cleanup required
        };
    }

}
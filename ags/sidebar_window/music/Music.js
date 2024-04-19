import { Media } from "./sections/mus_media.js"
import { ncmpcpp } from "./sections/ncmpcpp.js"
import { lyrics } from "./sections/lyrics.js"

export function Music() {
    return Widget.Box({
        className: 'music',
        vertical: true,
        children: [
            Media(),
            ncmpcpp,
            lyrics
        ]
    })
}
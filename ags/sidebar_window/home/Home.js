import NotificationCentre from "./Sections/NotificationCentre.js"
import UserHeader from "./Sections/UserHeader.js"
import Volumes from "./Sections/Volume.js"
import { Media } from "./Sections/Media.js"

export default function() {
    return Widget.Box({
        className: 'home',
        vertical: true,
        children: [
            UserHeader(),
            Volumes(),
            Media(),
            NotificationCentre()
        ]
    })
}
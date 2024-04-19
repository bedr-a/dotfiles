import Home from './home/Home.js'
import { Music } from './music/Music.js'

import { revealSidebar, sidebarShown } from '../vars.js'

function SideBar() {
    return Widget.Stack({
        transition: 'slide_right',
        transition_duration: 200,
        shown: sidebarShown.bind(),
        children: {
            home: Home(),
            music: Music(),
        }
    })
}

export default function() {
    return Widget.Revealer({
        revealChild: revealSidebar.bind(),
        transition: 'slide_right',
        transition_duration: 200,
        child: SideBar()
    })
}
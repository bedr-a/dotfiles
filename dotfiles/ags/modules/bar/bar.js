import { hyprland } from "resource:///com/github/Aylur/ags/service/hyprland.js"
import { int_to_icon } from "./icons/icons.js"

const dispatch_workspace = ws => Utils.execAsync(["hyprctl", "dispatch", "workspace", `${ws}`])
const dispatch_wallpaper = wp => Utils.execAsync(`${wallpapers[wp]}`)

var wallpapers = {
    1: "hyprctl hyprpaper wallpaper eDP-1,~/Pictures/The_Library-Floor_of_History.png",
    2: "hyprctl hyprpaper wallpaper eDP-1,~/Pictures/The_Library-Floor_of_Technological_Sciences_1.png",
    3: "hyprctl hyprpaper wallpaper eDP-1,~/Pictures/The_Library-Floor_of_Literature.png",
    4: "hyprctl hyprpaper wallpaper eDP-1,~/Pictures/The_Library-Floor_of_Art.png",
    5: "hyprctl hyprpaper wallpaper eDP-1,~/Pictures/The_Library-Floor_of_Natural_Sciences.png",
    6: "hyprctl hyprpaper wallpaper eDP-1,~/Pictures/The_Library-Floor_of_Language.png",
    7: "hyprctl hyprpaper wallpaper eDP-1,~/Pictures/The_Library-Floor_of_Social_Sciences.png",
    8: "hyprctl hyprpaper wallpaper eDP-1,~/Pictures/The_Library-Floor_of_Philosophy.png",
    9: "hyprctl hyprpaper wallpaper eDP-1,~/Pictures/The_Library-Floor_of_Religion.png",
    10: "hyprctl hyprpaper wallpaper eDP-1,~/Pictures/Inside_the_Library_2.png"
}

const workspaces = Widget.Box({
    class_name: "workspace_box",
    children: Array.from({ length: 10 }, (_, i) => i + 1).map(i => Widget.EventBox({
        attribute: i,
        cursor: "pointer",
        child: int_to_icon(i),
        on_primary_click: () => {dispatch_workspace(i); dispatch_wallpaper(i)},
    }))
})

const window_name = hyprland.active.workspace.bind("name")
const window_title_a = Widget.Label({
    label: "Location: The Library - ",
})

const window_title_b = Widget.Label({
    label:  window_name,
    truncate: 'end',
    maxWidthChars: 29,
})

const window_title = Widget.Box({
    class_name: "window_title",
    hpack: "end",
    children: ([
        window_title_a,
        window_title_b
    ])
})

const bar = Widget.CenterBox({
    center_widget: workspaces,
    end_widget: window_title,
})

export const bar_window = Widget.Window({
    name: "top_bar",
    class_name: "bar_window",
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",
    layer: "bottom",
    child: bar
})

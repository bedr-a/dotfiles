const frame = Widget.Icon({
    icon: '/home/bedr/.config/ags/modules/frame/Ruina_Frame.png',
    size: 1920
})

export const frame_window = Widget.Window({
    name: "corner_frame",
    class_name: "frame",
    exclusivity: "ignore",
    layer: "bottom",
    keymode: "none",
    child: frame
})
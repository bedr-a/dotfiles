import { execAsync } from "resource:///com/github/Aylur/ags/utils/exec.js"
import { mpris } from "resource:///com/github/Aylur/ags/service/mpris.js"
const audio = await Service.import('audio')
const battery = await Service.import('battery')
const network = await Service.import('network')

const date = Variable("", {
    poll: [30000, 'date "+%A %e %B %H:%M "']
})

const background = Widget.Icon({
    icon: '/home/bedr/.config/ags/modules/escape_menu/Background_Menu.png',
    size: 1920,
})

function submenu_box(widget) {
    const box = Widget.Icon({
        icon: '/home/bedr/.config/ags/modules/escape_menu/Background_Sub_Menu.png',
        size: 400
    })
    return Widget.Overlay({
        child: box,
        overlay: widget
    })
}

const shutdown = Widget.Button({
    class_name: "shutdown",
    cursor: "pointer",
    hpack: "center",
    child: Widget.Label("Shut Down"),
    on_primary_click: () => execAsync("shutdown now"),
    setup: self => self
        .on('enter-notify-event', () => self.css = "color: #21F3D9")
        .on('leave-notify-event', () => self.css = "color: #E7BB7D"),
})

const restart = Widget.Button({
    class_name: "restart",
    cursor: "pointer",
    hpack: "center",
    child: Widget.Label("Restart"),
    on_primary_click: () => execAsync("reboot"),
    setup: self => self
        .on('enter-notify-event', () => self.css = "color: #21F3D9")
        .on('leave-notify-event', () => self.css = "color: #E7BB7D"),
    }   
)

const settings = Widget.Button({
    class_name: "settings",
    cursor: "pointer",
    hpack: "center",
    child: Widget.Label("Settings"),
    setup: self => self
        .on('enter-notify-event', () => self.css = "color: #21F3D9")
        .on('leave-notify-event', () => self.css = "color: #E7BB7D"),
})

const clock = Widget.Label({
    class_name: "clock",
    label: date.bind()
})

const battery_label = Widget.Box({
    children: [
        Widget.Label("Battery is "),
        Widget.Label({
            label: battery.bind("percent").as(p => `${p}%`)}),
        Widget.Label(" full and is "),
        Widget.Label({
            label: "",
            setup: self => 
                battery.connect("changed", () => {
                    if (battery.charging == false) { self.label = "not " }
                    else { self.label = ""}
                })
        }),
        Widget.Label("charging.")
    ],
    class_name: "battery"
})

const main_menu = Widget.Box({
    vertical: true,
    hpack: "center",
    vpack: "center",
    children: [
        clock,
        battery_label,
        settings,
        restart,
        shutdown
    ]
})

const volume_slider = Widget.Slider({
    class_name: "volume_slider",
    draw_value: false,
    hexpand: true,
    on_change: ({ value }) => audio['speaker'].volume = value,
    value: audio['speaker'].bind('volume'),
})

const vol_slider_icon = Widget.Overlay({
    child: Widget.Icon({
        icon: "/home/bedr/.config/ags/modules/escape_menu/Volume_Slider.png",
        size: 320
    }),
    overlay: volume_slider
})

const volume_box = Widget.Box({
    class_name: "volume_box",
    vpack: "start",
    vertical: true,
    children: [
        Widget.Label("Master Volume"),
        vol_slider_icon
    ]
})

/** @param {import('types/service/mpris').MprisPlayer} player */
const music_info = player => Widget.Box({
    vertical: true,
    children: [
        Widget.Label({
            label: player.bind("name"),
            hpack: "center"
        }),
        Widget.Overlay({
            child: Widget.Icon({
                icon: "/home/bedr/.config/ags/modules/escape_menu/Volume_Slider.png",
                size: 320,
            }),
            overlay: Widget.Slider({
                class_name: "mixer_slider",
                draw_value: false,
                hexpand: true,
                on_change: ({ value }) => player.volume = value,
                value: player.bind("volume")
        }) 
    })
    ]
})

const players = Widget.Box({
    class_name: "volume_mixer",
    vertical: true,
    children: mpris.bind("players").as(p => p.map(music_info))
})

const audio_tab = Widget.Box({
    vertical: true,
    children: [
        volume_box,
        players,
    ]
})

const wifi_button = Widget.ToggleButton({
    class_name: "wifi_switch",
    active: true,
    on_toggled: ({ active }) => network.wifi.enabled = active,
    child: Widget.Icon().hook(network.wifi, self => {
        const enabled = network.wifi.enabled
        const icon = [
            [true],
            [false]
        ].find(([state]) => state == enabled)
        self.icon = `/home/bedr/.config/ags/modules/escape_menu/Button_${icon}.png`
        self.size = 50
    })
})

const wifi_box = Widget.Box({
    class_name: "wifi_box",
    vertical: true,
    children: [
        Widget.Label("Wifi"),
        Widget.Box({
            class_name: "wifi_enabled",
            hpack: "center",
            children: [
                Widget.Label("Enabled?   "),
                wifi_button
            ]
        }),
        Widget.Box({
            class_name: "wifi_ssid",
            hpack: "center",
            children: [Widget.Label("SSID - "),
            Widget.Label({
                label: network.wifi.bind('ssid').as(ssid => ssid || "Disconnected"),
                truncate: "end",
                max_width_chars: 16,
            })
            ]
        }) 
    ]
})

const option_boxes = Widget.Box({
    cursor: "default",
    class_name: "option_boxes",
    children: [
        submenu_box(wifi_box),
        submenu_box(audio_tab),
        // submenu_box(Widget.Label("Test3"))
    ]
})

const return_button = Widget.Box({
    hpack: "center",
    child: Widget.EventBox({
        class_name: "return",
        child: Widget.Icon({
            icon: '/home/bedr/.config/ags/modules/escape_menu/Return.png',
            size: 300,
        }),
    width_request: 50,
    })
})

const option_menu = Widget.Box({
    hpack: "center",
    vpack: "center",
    vertical: true,
    children: [
        option_boxes,
        return_button,
    ]
})

const visible_menu = Widget.Stack({
    class_name: "visible_menu",
    children: {
        'main_menu': main_menu,
        'settings_menu': option_menu
    },
    transition: "crossfade",
    transition_duration: 50,
    setup: (self) => {
        settings.on('clicked', visible_menu => {
            self.shown = 'settings_menu'
        }),
        return_button.child.on('button-press-event', visible_menu => {
            self.shown = 'main_menu'
        })
    }
})

const container = Widget.Overlay({
    child: background,
    overlay: visible_menu
})

export const escape_window = Widget.Window({
    name: "escape_window",
    class_name: "escape_window",
    visible: false,
    setup: self => self.keybind("Escape", () => {
        App.closeWindow("escape_window")
        visible_menu.visible_child = main_menu
    }),
    keymode: "exclusive",
    exclusivity: "ignore",
    layer: "top",
    child: container
})
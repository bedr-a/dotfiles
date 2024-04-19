import Gtk from 'gi://Gtk?version=3.0'

const username = Utils.exec(`whoami`)

function ShutdownButton() {
    const PowerMenu = Widget.subclass(Gtk.Popover)({
        /*child: Widget.Box({
            className: 'power_menu',
            spacing: 8,
            children: [
                Widget.Button({
                    child: Widget.Icon({
                        icon:'system-shutdown-symbolic',
                        size: 18
                    }),
                    onPrimaryClick: () => Utils.subprocess(
                        [`systemctl`, `poweroff`],
                        () => {}
                    )
                }),
                Widget.Button({
                    child: Widget.Icon({
                        icon: 'view-refresh-symbolic',
                        size: 18
                    }),
                    onPrimaryClick: () => Utils.subprocess(
                        [`systemctl`, `reboot`],
                        () => {}
                    )
                })
            ]
        })*/
    })

    return Widget.Button({
        className: 'shutdown_button',
        hpack: 'end',
        vpack: 'center',
        hexpand: true,
        onClicked: () => PowerMenu.popup(),
        setup: (self) => {
            PowerMenu.set_relative_to(self)
            PowerMenu.set_position(Gtk.PositionType.LEFT)
        }
    })
}

export default function() {
    const Username = Widget.Label({
        className: 'username',
        label: username,
        xalign: 0
    })

    return Widget.Box({
        className: 'user_box',
        spacing: 12,
        children: [
            Widget.Box({
                className: 'details',
                vpack: 'center',
                spacing: 2,
                vertical: true,
                children: [
                    Username,
                ]
            }),
            // ShutdownButton()
        ]
    })
}
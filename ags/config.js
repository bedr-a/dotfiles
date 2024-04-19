import Battery from 'resource:///com/github/Aylur/ags/service/battery.js'

import sidebar from './sidebar_window/sidebar.js'

const HyprlandService = await Service.import('hyprland')
const { execAsync } = Utils


function Divider() {
    return Widget.Box({
        className: 'divider'
    })
}

function BatteryReveal() {

    let icon = Battery.bind('icon_name')

    const full_bat = Widget.Box()
    const bat = Widget.Box({
        className: 'battery',
        vertical: true,
        vpack:'end',
        child: Widget.Icon({ 
            icon: icon,
            size: 18,
            "tooltip-text": String(Battery.percent)
        })
    })
    const bat_parent = Widget.Stack({
            children: {
                bat,
                full_bat
            }
    })

    Battery.connect('notify::charged', () => {
        if (Battery.charged === true) {
            bat_parent.set_visible_child(full_bat)
        }
        else {
            bat_parent.set_visible_child(bat)
        }
    })
    return bat_parent
}

function Clock() {
    const Time = Widget.Label({
        className: 'time',
        setup: (self) => {
            self.poll(10000, (self) =>
            execAsync(["date", "+%H\n%M"])
                .then((time) => (self.label = time))
            );
        }
    })

    return Widget.Box({
        className: 'end',
        vpack: 'end',
        vertical: true,
        child: Time
    })
}

function WorkSpaces() {
    const WorkspaceIndicator = Widget.Box({
        className: 'workspace_indicator',
        vertical: true,
        children: Array.from({ length: 5 }).map((_, i) =>
            Widget.Button({
                className: 'workspace',
                cursor: 'pointer',
                hpack: 'center',
                onPrimaryClick: () => HyprlandService.message(`dispatch workspace ${i + 1}`)
            }).hook(HyprlandService.active.workspace, (self) => 
            self.toggleClassName('active', HyprlandService.active.workspace.id === i+1)
            )
        )
    })

    return Widget.Box({
        className: 'center',
        vpack: 'center',
        vertical: true,
        children: [
            WorkspaceIndicator
        ]
    })
}

function StartSection() {
    /* const SideBarButton = Widget.Button({
        cursor: 'pointer',
        className: 'sidebar_button',
        child: Widget.Box({
            css: `background-image: "./peexela.png"`
        }),
        onPrimaryClick: () => Utils.exec(`bash -c "${App.configDir}/sidebar toggle"`)
    }) */

    return Widget.Box({
        className: 'start',
        vpack: 'start',
        vertical: true,
        spacing: 4,
        children: [
            //SideBarButton
            WorkSpaces()
        ]
    })
}

function CentreSection() {
    
}

function EndSection() {
    return Widget.Box({
        className: 'end',
        vpack: 'end',
        vertical: true,
        children: [
            BatteryReveal(),
            Divider(),
            Clock()
        ]
    })
}

function Bar() {
    return Widget.Box({
        children: [
            sidebar(),
            Widget.Box({
                className: 'bar',
                child: Widget.CenterBox({
                    className: 'sections',
                    vertical: true,
                    startWidget: StartSection(),
                    // centerWidget: CentreSection(),
                    endWidget: (EndSection())
                })
            })                
        ]
    })
}

export default Widget.Window({
    name: 'bar',
    layer: 'top',
    cursor: 'default',
    exclusivity: 'exclusive',
    // keymode: sidebarShown.bind().transform(shown => shown === 'applauncher' ? 'exclusive' : 'none'),
    anchor: ['left', 'top', 'bottom'],
    child: Bar()
})

App.config({
    style: './style.css',
    windows: [
        Bar(),
        // Notifications etc etc
    ] 
})
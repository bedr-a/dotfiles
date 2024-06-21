const { query } = await Service.import('applications')
const WINDOW_NAME = "applauncher"
const { timeout } = Utils

/** @param {import('resource:///com/github/Aylur/ags/service/applications.js').Application} app */
const AppItem = app => Widget.Button({
    class_name: "launcher_app",
    on_clicked: () => {
        App.closeWindow(WINDOW_NAME)
        app.launch()
    },
    attribute: { app },
    child: Widget.Box({
        children: [
            Widget.Icon({
                icon: app.icon_name || "",
                size: 42,
            }),
            Widget.Label({
                class_name: "app_title",
                label: app.name,
                xalign: 0,
                vpack: "center",
                truncate: "end",
            }),
        ],
    }),
})

const AppLauncher = ({ width = 150, height = 700, spacing = 8 }) => {
    let applications = query("").map(AppItem)

    const list = Widget.Box({
        vertical: true,
        children: applications,
        spacing,
    })

    function repopulate() {
        applications = query("").map(AppItem)
        list.children = applications
    }

    const entry = Widget.Entry({
        hexpand: true,
        class_name: "launcher_entry",
        placeholder_text: "May you find your book in this place.",

        on_accept: () => {
            const results = applications.filter((item) => item.visible);
            if (results[0]) {
                App.toggleWindow(WINDOW_NAME)
                results[0].attribute.app.launch()
            }
        },

        on_change: ({ text }) => applications.forEach(item => {
            item.visible = item.attribute.app.match(text ?? "")
        }),
    })

    const launcher_box = Widget.Box({
        vertical: true,
        class_name: "launcher_box",
        children: [
            entry,
            Widget.Scrollable({
                hscroll: "never",
                class_name: "launcher_scroll",
                css: `min-width: ${width}px;` + `min-height: ${height-60}px;`,
                child: list,
            }),
        ],
        setup: self => self.hook(App, (_, windowName, visible) => {
            if (windowName !== WINDOW_NAME)
                return

            if (visible) {
                repopulate(),
                entry.text = ""
                entry.grab_focus()
            }
        })
    })

    const launcher_image = Widget.Icon({
        icon: "/home/bedr/.config/ags/modules/launcher/Launcher_Box.png",
        size: 750,
    })

    return Widget.Overlay({
        child: Widget.Box({
            css: "min-height: 750px; min-width: 400px; margin-right: 400px;"
        }),
        overlays: [launcher_box, launcher_image],
    })
}

export const LauncherReveal = Widget.Revealer({
    reveal_child: true,
    visible: false,
    transition_duration: 100,
    transition: "slide_left",
    child: AppLauncher({
        width: 350,
        height: 700,
        spacing: 8
    }),
})

export const applauncher = Widget.Window({
    name: WINDOW_NAME,
    css: "background: transparent;",
    anchor: ["top", "right"],
    keymode: "exclusive",
    visible: false,
    setup: self => self.keybind("Escape", () => {
        LauncherReveal.reveal_child = false
        timeout(200, () => {
            App.closeWindow(WINDOW_NAME)
            LauncherReveal.reveal_child = false
        })
    })
        .on('notify::visible', ({ visible }) => {
            if (visible) {
                LauncherReveal.visible = true
            }
        }),
   child: LauncherReveal
})
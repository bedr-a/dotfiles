import Notification from "./notifications.js"

const notifications = await Service.import("notifications")
const { timeout, idle } = Utils

notifications.popupTimeout = 10000

function Animated(id) {
    const n = notifications.getNotification(id)
    const widget = Notification(n)

    const inner = Widget.Revealer({
        transition: "slide_right",
        transition_duration: 200,
        child: widget,
    })

    const outer = Widget.Revealer({
        transition: "slide_left",
        transition_duration: 200,
        child: inner,
    })

    const box = Widget.Box({
        hpack: "start",
        child: outer,
    })

    idle(() => {
        outer.reveal_child = true
        timeout(200, () => {
            inner.reveal_child = true
        })
    })

    return Object.assign(box, {
        dismiss() {
            inner.reveal_child = false
            timeout(200, () => {
                outer.reveal_child = false
                timeout(200, () => {
                    box.destroy()
                })
            })
        },
    })
}

function PopupList() {
    const map = new Map
    const box = Widget.Box({
        hpack: "end",
        vertical: true,
        css: "min-width: 440px;",
    })

    function remove(_, id) {
        map.get(id)?.dismiss()
        map.delete(id)
    }

    return box
        .hook(notifications, (_, id) => {
            if (id !== undefined) {
                if (map.has(id))
                    remove(null, id)

                if (notifications.dnd)
                    return

                const w = Animated(id)
                map.set(id, w)
                box.children = [w, ...box.children]
            }
        }, "notified")
        .hook(notifications, remove, "dismissed")
        .hook(notifications, remove, "closed")
}

export default Widget.Window({
    name: "notifications",
    layer: "overlay",
    anchor: ["top", "left"],
    class_name: "notifications",
    child: Widget.Box({
        css: "padding: 2px;",
        child: PopupList(),
    }),
})
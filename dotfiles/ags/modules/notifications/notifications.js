/** @param {import('resource:///com/github/Aylur/ags/service/notifications.js').Notification} n */
export default (n) => {
    const content = Widget.Box({
        class_name: "content",
        children: [
            Widget.Box({
                hexpand: true,
                vertical: true,
                children: [
                    Widget.Box({
                        children: [
                            Widget.Label({
                                class_name: "title",
                                xalign: 0,
                                justification: "left",
                                hexpand: true,
                                max_width_chars: 14,
                                truncate: "end",
                                wrap: true,
                                label: n.summary.trim(),
                                use_markup: true,
                            }),
                        ],
                    }),
                    Widget.Label({
                        class_name: "description",
                        hexpand: true,
                        use_markup: true,
                        xalign: 0,
                        justification: "left",
                        label: n.body.trim(),
                        max_width_chars: 24,
                        wrap: true,
                    }),
                ],
            }),
        ],
    })

    const actionsbox = n.actions.length > 0 ? Widget.Revealer({
        transition: "slide_down",
        child: Widget.EventBox({
            child: Widget.Box({
                class_name: "actions_horizontal",
                children: n.actions.map(action => Widget.Button({
                    class_name: "action-button",
                    on_clicked: () => n.invoke(action.id),
                    hexpand: true,
                    child: Widget.Label(action.label),
                })),
            }),
        }),
    }) : null

    const eventbox = Widget.EventBox({
        vexpand: false,
        on_primary_click: n.dismiss,
        on_hover() {
            if (actionsbox)
                actionsbox.reveal_child = true
        },
        /*on_hover_lost() {
            if (actionsbox)
                actionsbox.reveal_child = true

            n.dismiss()
        },*/
        child: Widget.Box({
            vertical: true,
            children: actionsbox ? [content, actionsbox] : [content],
        }),
    })

    return Widget.Box({
        class_name: `notification`,
        child: eventbox,
    })
}
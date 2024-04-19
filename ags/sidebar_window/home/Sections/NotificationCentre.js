const NotificationService = await Service.import('notifications')

function Notification(notification) {
    const Image = Widget.Box({
        className: 'image',
        css: `background-image: url(${notification.image})`
    })

    const AppName = Widget.Label({
        className: 'appname',
        label: notification.appName.toUpperCase(),
        truncate: 'end',
        xalign: 0,
        hexpand: true,
    })

    const Summary = Widget.Label({
        className: 'summary',
        label: notification.summary,
        justification: 'left',
        truncate: 'end',
        xalign: 0,
        useMarkup: true
    })

    const Body = Widget.Label({
        className: 'body',
        label: `- ${notification.body}`,
        justification: 'left',
        truncate: 'end',
        lines: 2,
        xalign: 0,
        wrap: true,
        useMarkup: true,
        hexpand: true
    })


    const RemoveNotifButton = Widget.Button({
        className: 'remove_notif_button',
        hpack: 'end',
        vpack: 'start',
        hexpand: true,
        cursor: 'pointer',
        child: Widget.Label(''),
        onPrimaryClick: () => notification.close()
    })

    return Widget.Box({
        className: 'notification',
        spacing: 8,
        children: [
            Image,
            Widget.Box({
                className: 'meta',
                vertical: true,
                spacing: 4,
                children: [
                    AppName,
                    Widget.Box({
                        vertical: true,
                        children: [
                            Summary,
                            Body
                        ]
                    })
                ]
            }),
            RemoveNotifButton
        ]
    })
}

function Header() {
    const Title = Widget.Label({
        className: 'notif_title',
        hpack: 'start',
        hexpand: true,
        label: 'Notifications'
    })

    const ClearNotifButton = Widget.Button({
        className: 'clear_notif_button',
        hpack: 'end',
        hexpand: true,
        cursor: 'pointer',
        child: Widget.Label('Clear'),
        onPrimaryClick: () => NotificationService.clear()
    })

    return Widget.Box({
        className: 'header',
        vpack: 'start',
        children: [
            Title,
            ClearNotifButton
        ]
    })
}

function NoNotification() {
    const Text = Widget.Label({
        label: 'No Notifications'
    })

    return Widget.Box({
        className: 'no_notification',
        hpack: 'center',
        vertical: true,
        children: [
            Text
        ]
    })
}

function Notifications() {
    return Widget.Scrollable({
        vexpand: true,
        child: Widget.Box({
            className: 'notifications',
            spacing: 8,
            vertical: true,
            children: NotificationService.bind('notifications')
                .transform(notifications =>
                    notifications.length > 0
                        ? notifications.map(Notification)
                        : [ NoNotification() ]
                )
        })
    })
}

export default function() {
    return Widget.Box({
        className: 'notification_centre',
        spacing: 8,
        vertical: true,
        vexpand: true,
        children: [
            Header(),
            Notifications()
        ]
    })
}
const audio = await Service.import('audio')

function Volumes() {

    const vol_icon = ''
    const mus_icon = ''

    const VolumeSlider = Widget.Box({
        spacing: 12,
        children: [
            Widget.Label({
                className: 'vol_icon',
                label: vol_icon
            }),
            Widget.Slider({
                className: 'vol_slider',
                value: audio.speaker.bind('volume'),
                onChange: ({ value }) => audio.speaker.volume = value,
                drawValue: false,
                hexpand: true
            })
        ]
    })

    /*const MusicSlider = Widget.Box({

    }) */

    return Widget.Box({
        className: 'slider_box',
        vertical: true,
        spacing: 12,
        children: [
            VolumeSlider
        ]
    })
}

export default function() {
    return Volumes()
}
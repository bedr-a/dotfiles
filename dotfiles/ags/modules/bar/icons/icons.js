const Keter = Widget.Icon({
    icon: '/home/bedr/.config/ags/modules/bar/icons/Keter.png',
    size: 40
})

const Malkuth = Widget.Icon({
    icon: '/home/bedr/.config/ags/modules/bar/icons/Malkuth.png',
    size: 40
})

const Yesod = Widget.Icon({
    icon: '/home/bedr/.config/ags/modules/bar/icons/Yesod.png',
    size: 40
})

const Hod = Widget.Icon({
    icon: '/home/bedr/.config/ags/modules/bar/icons/Hod.png',
    size: 40
})

const Netzach = Widget.Icon({
    icon: '/home/bedr/.config/ags/modules/bar/icons/Netzach.png',
    size: 40
})

const Tiphereth = Widget.Icon({
    icon: '/home/bedr/.config/ags/modules/bar/icons/Tiphereth.png',
    size: 40
})

const Gebura = Widget.Icon({
    icon: '/home/bedr/.config/ags/modules/bar/icons/Gebura.png',
    size: 40
})

const Chesed = Widget.Icon({
    icon: '/home/bedr/.config/ags/modules/bar/icons/Chesed.png',
    size: 40
})

const Binah = Widget.Icon({
    icon: '/home/bedr/.config/ags/modules/bar/icons/Binah.png',
    size: 40
})

const Hokma = Widget.Icon({
    icon: '/home/bedr/.config/ags/modules/bar/icons/Hokma.png',
    size: 40
})

export function int_to_icon(i) {
    switch (i) {
        case 1:
            return Malkuth;
        case 2:
            return Yesod;
        case 3:
            return Hod;
        case 4:
            return Netzach;
        case 5:
            return Tiphereth;
        case 6:
            return Gebura;
        case 7:
            return Chesed;
        case 8:
            return Binah;
        case 9:
            return Hokma;
        case 10:
            return Keter;
    }
}
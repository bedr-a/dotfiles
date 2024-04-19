const {Gdk, GLib, Vte, Pango } = imports.gi

export const colours = {
    foreground: "#f4f4f4",
    background: "#0b0b0b",

    regular: [
        "#393939",
        "#fa4d56",
        "#42be65",
        "#fddc69",
        "#4589ff",
        "#ff7eb6",
        "#3ddbd9",
        "#e0e0e0"
    ]
}

export function hex2rgb(hex) {
    hex = hex.replace(/^#/, "")

    const bigint = parseInt(hex, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255

    return [r, g, b]
}

export function rgbaColour(red, green, blue, alpha=1.0) {
    const r = red / 255.0
    const g = green / 255.0
    const b = blue / 255.0

    const rgba = new Gdk.RGBA()
    rgba.red = r
    rgba.green = g
    rgba.blue = b
    rgba.alpha = alpha

    return rgba
}

export const VteTerminal = Widget.subclass(Vte.Terminal)


export const ncmpcpp = VteTerminal({
    className: "ncmpcpp",
    hexpand: false,
    setup: (self) => {
        self.spawn_sync(
            Vte.PtyFlags.DEFAULT,
            null,
            ["ncmpcpp"],
            null,
            GLib.SpawnFlags.SEARCH_PATH,
            null,
            null,
        );
        self.set_margin_right(10)
        self.set_margin_left(10)
        self.set_margin_top(10)
        self.set_margin_bottom(10)
        self.set_colors(
            rgbaColour(...hex2rgb(colours.foreground)),
            rgbaColour(...hex2rgb(colours.background)),
            colours.regular.map((colour) => {
                return rgbaColour(...hex2rgb(colour));
            },
        ))
        self.set_size(55,40);
        self.set_font(Pango.FontDescription.from_string("JetBrainsMonoNerdFont 10"));
        self.on("child_exited", App.quit);
    },
});
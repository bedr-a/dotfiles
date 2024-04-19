const { GLib, Vte, Pango } = imports.gi

import { VteTerminal, colours, hex2rgb, rgbaColour } from "./ncmpcpp.js";

export const lyrics = VteTerminal({
    className: 'lyrics',
    vexpand: true,
    setup: (self) => {
        self.spawn_sync(
            Vte.PtyFlags.DEFAULT,
            null,
            ["sptlrx",
            "--current",
            "#ff7eb6",
            "--before",
            "faint",
            "--after",
            ""],
            null,
            GLib.SpawnFlags.SEARCH_PATH,
            null,
            null
        );
        self.set_margin_bottom(10)
        self.set_margin_right(10)
        self.set_margin_left(10)
        self.set_margin_top(10)
        self.set_colors(
            rgbaColour(...hex2rgb(colours.foreground)),
            rgbaColour(...hex2rgb(colours.background)),
            colours.regular.map((colour) => {
                return rgbaColour(...hex2rgb(colour));
            },
        ))
        self.set_size(45, 40);
        self.set_font(Pango.FontDescription.from_string("JetBrainsMonoNerdFont 12"));
        self.on("child_exited", App.quit);
    },
});
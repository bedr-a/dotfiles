import { frame_window } from "./modules/frame/frame.js";
import { bar_window } from "./modules/bar/bar.js";
import { escape_window } from "./modules/escape_menu/escape_menu.js";
import notificationpopups from "./modules/notifications/notificationpopups.js";
import { applauncher } from "./modules/launcher/launcher.js";

App.config({
  style: "./style.css",
  windows: [frame_window, bar_window, escape_window, notificationpopups, applauncher],
  onWindowToggled: () => applauncher.child.reveal_child = true
});

export {};

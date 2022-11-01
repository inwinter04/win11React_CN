import icons from "./apps";

var { taskbar, desktop, pinned, recent } = {
  taskbar: (localStorage.getItem("taskbar") &&
    JSON.parse(localStorage.getItem("taskbar"))) || [
    "Settings",
    "文件资源管理器",
    "Microsoft Edge",
    "Store",
    "Spotify",
  ],
  desktop: (localStorage.getItem("desktop") &&
    JSON.parse(localStorage.getItem("desktop"))) || [
    "Blue",
    "Unescape",
    "Recycle Bin",
    "文件资源管理器",
    "Store",
    "Microsoft Edge",
    "Github",
    "Spotify",
    "Buy me a coffee",
  ],
  pinned: (localStorage.getItem("pinned") &&
    JSON.parse(localStorage.getItem("pinned"))) || [
    "Microsoft Edge",
    "Get Started",
    "Task Manager",
    "Mail",
    "Settings",
    "Store",
    "Unescape",
    "Buy me a coffee",
    "Notepad",
    "Whiteboard",
    "Calculator",
    "Spotify",
    "Twitter",
    "文件资源管理器",
    "Terminal",
    "Github",
    "Camera",
  ],
  recent: (localStorage.getItem("recent") &&
    JSON.parse(localStorage.getItem("recent"))) || [
    "Mail",
    "Twitter",
    "Terminal",
    "Github",
    "文件资源管理器",
    "Spotify",
    "Edge",
  ],
};

if (desktop.includes("Buy me a coffee") === false) {
  desktop.push("Buy me a coffee");
}

export const taskApps = icons.filter((x) => taskbar.includes(x.name));

export const desktopApps = icons
  .filter((x) => desktop.includes(x.name))
  .sort((a, b) => {
    return desktop.indexOf(a.name) > desktop.indexOf(b.name) ? 1 : -1;
  });

export const pinnedApps = icons
  .filter((x) => pinned.includes(x.name))
  .sort((a, b) => {
    return pinned.indexOf(a.name) > pinned.indexOf(b.name) ? 1 : -1;
  });

export const recentApps = icons
  .filter((x) => recent.includes(x.name))
  .sort((a, b) => {
    return recent.indexOf(a.name) > recent.indexOf(b.name) ? 1 : -1;
  });

export const allApps = icons.filter((app) => {
  return app.type === "app";
});

export const dfApps = {
  taskbar,
  desktop,
  pinned,
  recent,
};

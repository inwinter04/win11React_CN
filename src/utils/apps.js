export const gene_name = () =>
  Math.random().toString(36).substring(2, 10).toUpperCase();

let installed = JSON.parse(localStorage.getItem("installed") || "[]");

const apps = [
  {
    name: "Start",
    icon: "home",
    type: "action",
    action: "STARTMENU",
  },
  {
    name: "Search",
    icon: "search",
    type: "action",
    action: "SEARCHMENU",
  },
  {
    name: "Widget",
    icon: "widget",
    type: "action",
    action: "WIDGETS",
  },
  {
    name: "设置",
    icon: "settings",
    type: "app",
    action: "SETTINGS",
  },
  {
    name: "任务管理器",
    icon: "taskmanager",
    type: "app",
    action: "TASKMANAGER",
  },
  {
    name: "文件资源管理器",
    icon: "explorer",
    type: "app",
    action: "EXPLORER",
  },
  {
    name: "Microsoft Edge",
    icon: "edge",
    type: "app",
    action: "MSEDGE",
  },
  {
    name: "Buy me a coffee",
    icon: "buyme",
    type: "app",
    action: "EXTERNAL",
    payload: "https://www.buymeacoffee.com/blueedgetechno",
  },
  {
    name: "Store",
    icon: "store",
    type: "app",
    action: "WNSTORE",
  },
  {
    name: "回收站",
    icon: "bin0",
    type: "app",
  },
  {
    name: "此电脑",
    icon: "win/user",
    type: "app",
    action: "EXPLORER",
  },
  {
    name: "闹钟和时钟",
    icon: "alarm",
    type: "app",
  },
  {
    name: "计算器",
    icon: "calculator",
    type: "app",
    action: "CALCUAPP",
  },
  {
    name: "日历",
    icon: "calendar",
    type: "app",
  },
  {
    name: "相机",
    icon: "camera",
    type: "app",
    action: "CAMERA",
  },
  {
    name: "手机连接",
    icon: "yphone",
    type: "app",
  },
  {
    name: "反馈中心",
    icon: "feedback",
    type: "app",
  },
  {
    name: "入门",
    icon: "getstarted",
    type: "app",
    action: "OOBE",
  },
  {
    name: "获取帮助",
    icon: "help",
    type: "app",
    action: "EXTERNAL",
    payload: "https://win11react-docs.andrewstech.me/",
  },
  {
    name: "Yammer",
    icon: "yammer",
    type: "app",
  },
  {
    name: "邮件",
    icon: "mail",
    type: "app",
    action: "EXTERNAL",
    payload: "mailto:inwinter04@163.com",
  },
  {
    name: "电影和电视",
    icon: "movies",
    type: "app",
  },
  {
    name: "Xbox",
    icon: "xbox",
    type: "app",
  },
  {
    name: "Office",
    icon: "msoffice",
    type: "app",
  },
  {
    name: "讲述人",
    icon: "narrator",
    type: "app",
  },
  {
    name: "资讯",
    icon: "news",
    type: "app",
  },
  {
    name: "记事本",
    icon: "notepad",
    type: "app",
    action: "NOTEPAD",
  },
  {
    name: "便笺",
    icon: "notes",
    type: "app",
  },
  {
    name: "OneDrive",
    icon: "oneDrive",
    type: "app",
  },
  {
    name: "OneNote",
    icon: "onenote",
    type: "app",
  },
  {
    name: "Outlook",
    icon: "outlook",
    type: "app",
  },
  {
    name: "照片",
    icon: "photos",
    type: "app",
  },
  {
    name: "Windows 安全中心",
    icon: "security",
    type: "app",
  },
  {
    name: "Spotify",
    icon: "spotify",
    type: "app",
    action: "SPOTIFY",
  },
  {
    name: "Sharepoint",
    icon: "share",
    type: "app",
  },
  {
    name: "Skype",
    icon: "skype",
    type: "app",
  },
  {
    name: "截图工具",
    icon: "snip",
    type: "app",
  },
  {
    name: "Teams",
    icon: "teams",
    type: "app",
  },
  {
    name: "终端",
    icon: "terminal",
    type: "app",
    action: "TERMINAL",
  },
  {
    name: "提示",
    icon: "tips",
    type: "app",
  },
  {
    name: "To Do",
    icon: "todo",
    type: "app",
  },
  {
    name: "地图",
    icon: "maps",
    type: "app",
  },
  {
    name: "录音机",
    icon: "voice",
    type: "app",
  },
  {
    name: "天气",
    icon: "weather",
    type: "app",
  },
  {
    name: "Whiteboard",
    icon: "board",
    type: "app",
    action: "WHITEBOARD",
  },
  {
    name: "Cortana",
    icon: "cortana",
    type: "app",
  },
  {
    name: "Github",
    icon: "github",
    type: "app",
    action: "EXTERNAL",
    payload: "https://github.com/inwinter04/win11React_CN",
  },
  {
    name: "Unescape",
    icon: "unescape",
    type: "action",
    action: "EXTERNAL",
    payload: "https://blueedge.me/unescape",
  },
];

for (let i = 0; i < installed.length; i++) {
  installed[i].action = gene_name();
  apps.push(installed[i]);
}

export default apps;

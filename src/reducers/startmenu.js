import { pinnedApps, recentApps } from "../utils";

const defState = {
  pnApps: pinnedApps,
  rcApps: recentApps,
  hide: true,
  menu: false,
  showAll: false,
  alpha: false,
  pwctrl: false,
  curAlpha: "A",
  qksrch: [
    ["faClock", 1, "历史上的今天"], 
    ["faChartLine", null, "今日行情"],
    ["faFilm", null, "近期电影"],
    ["faNewspaper", 1, "头条新闻"],
  ],
};

const menuReducer = (state = defState, action) => {
  switch (action.type) {
    case "STARTSHW":
      return {
        ...state,
        menu: true,
        hide: false,
        pwctrl: false,
      };
    case "STARTHID":
      return {
        ...state,
        hide: true,
        showAll: false,
        pwctrl: false,
      };
    case "STARTOGG":
      return {
        ...state,
        hide: !(state.hide || !state.menu),
        menu: true,
        alpha: false,
        curAlpha: "A",
        pwctrl: false,
        showAll: state.menu && state.showAll ? true : null,
      };
    case "STARTALL":
      return {
        ...state,
        showAll: !state.showAll,
        alpha: false,
        pwctrl: false,
        curAlpha: "A",
      };
    case "STARTALPHA":
      return {
        ...state,
        alpha: !state.alpha,
        pwctrl: false,
        curAlpha: action.payload || "A",
      };
    case "STARTSRC":
      return {
        ...state,
        hide: !(state.hide || state.menu),
        menu: false,
        pwctrl: false,
      };
    case "STARTPWC":
      return {
        ...state,
        pwctrl: true,
      };
    default:
      return state;
  }
};

export default menuReducer;

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import i18next from "i18next";
import login from "../../../components/login";

import { ToolBar } from "../../../utils/general";
import dirs from "./assets/dir.json";

export const WnTerminal = () => {
  const wnapp = useSelector((state) => state.apps.terminal);
  const [stack, setStack] = useState(["Microsoft Windows [版本 10.0.22000.51]", ""]);
  const [pwd, setPwd] = useState("C:\\Users\\Blue");
  const [lastCmd, setLsc] = useState(0);
  const [wntitle, setWntitle] = useState("命令提示符");

  const dispatch = useDispatch();

  let IpDetails = [];
  const getIPDetails = async () => {
    try {
      const response = await fetch("https://ipapi.co/json")
        .then((response) => response.json())
        .then((data) => {
          IpDetails.push(data);
        });
    } catch (error) {
      console.log(error);
      // handling the error
      IpDetails.push({
        ip: "__network_error",
        network: "__kindly check internet connection",
        city: "",
        region: "",
        org: "",
        postal: "",
      });
    }
  };

  const dirFolders = (isFile = "") => {
    var tdir = { ...dirs },
      curr = pwd == "C:\\" ? [] : pwd.replace("C:\\", "").split("\\");

    if (pwd != "C:\\") {
      for (var i = 0; i < curr.length; i++) {
        // console.log(tdir);
        tdir = tdir[curr[i]];
      }
    }

    if (isFile == "") {
      return Object.keys(tdir);
    } else {
      return tdir[isFile] || {};
    }
  };

  const cmdTool = async (cmd) => {
    var tmpStack = [...stack];
    tmpStack.push(pwd + ">" + cmd);
    var arr = cmd.split(" "),
      type = arr[0].trim().toLowerCase(),
      arg = arr.splice(1, arr.length).join(" ") || "";

    arg = arg.trim();

    if (type == "echo") {
      if (arg.length) {
        tmpStack.push(arg);
      } else {
        tmpStack.push("ECHO 处于打开状态。");
      }
    } else if (type == "eval") {
      if (arg.length) {
        tmpStack.push(eval(arg).toString());
      }
    } else if (type == "python") {
      if (arg.length) {
        if (window.pythonRunner) {
          var content = await window.pythonRunner.runCode(arg);
          if (window.pythonResult) {
            window.pythonResult.split("\n").forEach((x) => {
              if (x.trim().length) tmpStack.push(x);
            });
          }
        }
      }
    } else if (type == "cd") {
      if (arg.length) {
        var errp = true;
        var curr = pwd == "C:\\" ? [] : pwd.replace("C:\\", "").split("\\");

        if (arg == ".") {
          errp = false;
        } else if (arg == "..") {
          errp = false;
          curr.pop();
          setPwd("C:\\" + curr.join("\\"));
        } else if (!arg.includes(".")) {
          var tdir = dirFolders();

          for (var i = 0; i < tdir.length; i++) {
            if (arg.toLowerCase() == tdir[i].toLowerCase() && errp) {
              curr.push(tdir[i]);
              errp = false;
              setPwd("C:\\" + curr.join("\\"));
              break;
            }
          }
        } else {
          errp = false;
          tmpStack.push("目录名称无效。");
        }

        if (errp) {
          tmpStack.push("系统找不到指定的路径。");
        }
      } else {
        tmpStack.push(pwd);
      }
    } else if (type == "dir") {
      tmpStack.push(" Directory of " + pwd);
      tmpStack.push("");
      tmpStack.push("<DIR>    .");
      tmpStack.push("<DIR>    ..");

      var tdir = dirFolders();
      for (var i = 0; i < tdir.length; i++) {
        if (!tdir[i].includes(".")) {
          tmpStack.push("<DIR>..." + tdir[i]);
        } else {
          tmpStack.push("FILE...." + tdir[i]);
        }
      }
    } else if (type == "cls") {
      tmpStack = [];
    } else if (type == "color") {
      let color = "#FFFFFF";
      let background = "#000000";
      let re = /^[A-Fa-f0-9]+$/g;
      if (!arg || (arg.length < 3 && re.test(arg))) {
        if (arg.length == 2) {
          color = colorCode(arg[1]);
          background = colorCode(arg[0]);
        } else if (arg.length == 1) {
          color = colorCode(arg[0]);
        }

        //set background color of the element id cmdCont
        var cmdcont = document.getElementById("cmdcont");
        cmdcont.style.backgroundColor = background;

        //set color of text of .cmdLine class
        cmdcont.style.color = color;
      } else {
        tmpStack.push(
          "设置默认的控制台前景和背景颜色。",
        );
        tmpStack.push("COLOR [arg]");
        tmpStack.push("arg\t\t指定控制台输出的颜色属性。");
        tmpStack.push(
          "颜色属性由两个十六进制数字指定 -- 第一个",
          "对应于背景，第二个对应于前景。每个数字",
          "可以为以下任何值:",
        );
        tmpStack.push("0\t\t黑色");
        tmpStack.push("1\t\t蓝色");
        tmpStack.push("2\t\t绿色");
        tmpStack.push("3\t\t浅绿色");
        tmpStack.push("4\t\t红色");
        tmpStack.push("5\t\t洋红色");
        tmpStack.push("6\t\t灰色");
        tmpStack.push("7\t\t亮灰色");
        tmpStack.push("8\t\t灰色");
        tmpStack.push("9\t\t淡蓝色");
        tmpStack.push("A\t\t淡绿色");
        tmpStack.push("B\t\t淡浅绿色");
        tmpStack.push("C\t\t淡红色");
        tmpStack.push("D\t\t浅洋红");
        tmpStack.push("E\t\t淡黄色");
        tmpStack.push("F\t\t亮白色");
        tmpStack.push(
          "如果没有给定任何参数，此命令会将颜色还原到 CMD.EXE 启动时",
          "的颜色。这个值来自当前控制台",
          "窗口、/T 命令行开关或 DefaultColor 注册表",
          "值。",
          "",
          "如果尝试使用相同的",
          "前景和背景颜色来执行",
          "COLOR 命令，COLOR 命令会将 ERRORLEVEL 设置为 1。",
          "",
          '示例: /"COLOR fc" 在亮白色上产生淡红色',
        );
      }
    } else if (type == "type") {
      var errp = true;

      if (arg.includes(".")) {
        var tdir = dirFolders();

        for (var i = 0; i < tdir.length; i++) {
          if (arg.toLowerCase() == tdir[i].toLowerCase() && errp) {
            errp = false;
            var file = dirFolders(tdir[i]);
            var content = file.content || "";
            content = content.split("\n");
            for (var i = 0; i < content.length; i++) {
              tmpStack.push(content[i]);
            }
            break;
          }
        }
      }

      if (errp) {
        tmpStack.push("系统找不到指定的文件。");
      }
    } else if (type == "start") {
      dispatch({ type: "EDGELINK", payload: arg });
    } else if (type == "date") {
      tmpStack.push("The current date is: " + new Date().toLocaleDateString());
    } else if (type == "time") {
      tmpStack.push(
        "The current time is: " +
          new Date()
            .toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })
            .replaceAll(":", ".") +
          "." +
          Math.floor(Math.random() * 100),
      );
    } else if (type == "exit") {
      tmpStack = ["Microsoft Windows [版本 10.0.22000.51]", ""];
      dispatch({ type: wnapp.action, payload: "close" });
    } else if (type == "title") {
      setWntitle(arg.length ? arg : "命令提示符");
    } else if (type == "hostname") {
      tmpStack.push("blue");
    } else if (type == "login") {
      login();
      tmpStack.push("started login");
    } else if (type == "lang-test") {
      i18next.changeLanguage("fr-FR");
      tmpStack.push("French");
    } else if (type == "blue") {
      tmpStack.push("blueedgetechno");
    } else if (type == "dev") {
      tmpStack.push("https://dev.blueedge.me/");
    } else if (type == "iamdt") {
      tmpStack.push("https://www.iamdt.cn");
    } else if (type == "ver") {
      tmpStack.push("Microsoft Windows [版本 10.0.22000.51]");
    } else if (type == "systeminfo") {
      var dvInfo = [
        "主机名:               BLUE",
        "OS 名称:              Microsoft Windows 11 专业版",
        "OS 版本:              10.0.22621 暂缺 Build 22621",
        "OS 制造商:            Microsoft Corporation",
        "OS 配置:              独立工作站",
        "OS 构建类型:           Multiprocessor Free",
        "注册的所有人:          Blue",
        "注册的组织:            暂缺",
        "产品 ID:              7H1S1-5AP1R-473DV-3R5I0N",
      ];

      for (var i = 0; i < dvInfo.length; i++) {
        tmpStack.push(dvInfo[i]);
      }
    } else if (type == "help") {
      var helpArr = [
        "有关某个命令的详细信息，请键入 HELP 命令名",
        "CD             显示当前目录的名称或将其更改。",
        "CLS            清除屏幕。",
        "COLOR		  设置默认控制台前景和背景颜色。",
        "DATE           显示或设置日期。",
        "DIR            显示一个目录中的文件和子目录。",
        "ECHO           显示消息，或将命令回显打开或关闭。",
        "EXIT           退出 CMD.EXE 程序(命令解释程序)。",
        "HELP           提供 Windows 命令的帮助信息。",
        "START          启动单独的窗口以运行指定的程序或命令。",
        "SYSTEMINFO     显示计算机的特定属性和配置。",
        "TIME           显示或设置系统时间。",
        "TITLE          设置 CMD.EXE 会话的窗口标题。",
        "TYPE           显示文本文件的内容。",
        "VER            显示 Windows 的版本。",
        "PYTHON         执行 PYTHON 编程。",
        "EVAL           运行 JavaScript 语句",
        "",
        "有关工具的详细信息，请参阅联机帮助中的命令行参考。",
      ];

      for (var i = 0; i < helpArr.length; i++) {
        tmpStack.push(helpArr[i]);
      }
    } else if (type == "") {
    } else if (type == "ipconfig") {
      const IP = IpDetails[0];
      tmpStack.push("Windows IP 配置");
      tmpStack.push("");
      tmpStack.push("IPv6: " + IP.ip);
      tmpStack.push("网络: " + IP.network);
      tmpStack.push("城市: " + IP.city);
      tmpStack.push("ISP: " + IP.org);
      tmpStack.push("区域: " + IP.region);
    } else {
      tmpStack.push(
        `'${type}' 不是内部或外部命令，也不是可运行的程序`,
      );
      tmpStack.push("或批处理文件。");
      tmpStack.push("");
      tmpStack.push('输入 "help" 以获取可用命令');
    }

    if (type.length > 0) tmpStack.push("");
    setStack(tmpStack);
  };

  const colorCode = (color) => {
    let code = "#000000";
    /*
			0: Black
			1: Blue
			2: Green
			3: Cyan
			4: Red
			5: Magenta
			6: Brown
			7: Light Gray
			8: Dark Gray
			9: Light Blue
			A: Light Green
			B: Light Cyan
			C: Light Red
			D: Light Magenta
			E: Yellow
			F: White
		*/

    switch (color.toUpperCase()) {
      case "0":
        code = "#000000";
        break;
      case "1":
        code = "#0000AA";
        break;
      case "2":
        code = "#00AA00";
        break;
      case "3":
        code = "#00AAAA";
        break;
      case "4":
        code = "#AA0000";
        break;
      case "5":
        code = "#AA00AA";
        break;
      case "6":
        code = "#AA5500";
        break;
      case "7":
        code = "#AAAAAA";
        break;
      case "8":
        code = "#555555";
        break;
      case "9":
        code = "#5555FF";
        break;
      case "A":
        code = "#55FF55";
        break;
      case "B":
        code = "#55FFFF";
        break;
      case "C":
        code = "#FF5555";
        break;
      case "D":
        code = "#FF55FF";
        break;
      case "E":
        code = "#FFFF55";
        break;
      case "F":
        code = "#FFFFFF";
        break;
    }

    return code;
  };

  const action = (event) => {
    var cmdline = document.getElementById("curcmd");
    var action = event.target.dataset.action;

    if (cmdline) {
      if (action == "hover") {
        var crline = cmdline.parentNode;
        var cmdcont = document.getElementById("cmdcont");
        if (crline && cmdcont) {
          cmdcont.scrollTop = crline.offsetTop;
        }
        cmdline.focus();
      } else if (action == "enter") {
        if (event.key == "Enter") {
          event.preventDefault();
          var tmpStack = [...stack];
          var cmd = event.target.innerText.trim();
          event.target.innerText = "";
          setLsc(tmpStack.length + 1);
          cmdTool(cmd);
        } else if (event.key == "ArrowUp" || event.key == "ArrowDown") {
          event.preventDefault();
          var i = lastCmd + [1, -1][Number(event.key == "ArrowUp")];

          while (i >= 0 && i < stack.length) {
            if (stack[i].startsWith("C:\\") && stack[i].includes(">")) {
              var tp = stack[i].split(">");
              event.target.innerText = tp[1] || "";
              setLsc(i);
              break;
            }

            i += [1, -1][Number(event.key == "ArrowUp")];
          }

          cmdline.focus();
        } else if (event.key == "Tab") {
          event.preventDefault();
          var cmd = event.target.innerText.trim(),
            arr = cmd.split(" ");
          var arg = arr.splice(1, arr.length).join(" ") || "";

          var tdir = dirFolders();
          for (var i = 0; i < tdir.length; i++) {
            if (
              arg.length &&
              tdir[i].toLowerCase().startsWith(arg.toLowerCase())
            ) {
              event.target.innerText = arr[0] + " " + tdir[i];
              break;
            }
          }
        }
      }
      cmdline.focus();
    }
  };

  useEffect(() => {
    getIPDetails();

    if (wnapp.dir && wnapp.dir != pwd) {
      setPwd(wnapp.dir);
      dispatch({ type: "OPENTERM", payload: null });
    }
  });

  return (
    <div
      className="wnterm floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{
        ...(wnapp.size == "cstm" ? wnapp.dim : null),
        zIndex: wnapp.z,
      }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        size={wnapp.size}
        name={wntitle}
        invert
        bg="#060606"
      />
      <div className="windowScreen flex" data-dock="true">
        <div className="restWindow h-full flex-grow text-gray-100">
          <div
            className="cmdcont w-full box-border overflow-y-scroll win11Scroll prtclk"
            id="cmdcont"
            onMouseOver={action}
            onClick={action}
            data-action="hover"
          >
            <div className="w-full h-max pb-12">
              {stack.map((x, i) => (
                <pre key={i} className="cmdLine">
                  {x}
                </pre>
              ))}
              <div className="cmdLine actmd">
                {pwd}&gt;
                <div
                  className="ipcmd"
                  id="curcmd"
                  contentEditable
                  data-action="enter"
                  onKeyDown={action}
                  spellCheck="false"
                ></div>
                {/* <input id="curcmd" className="ipcmd" type="text" defaultValue="tyler"/> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
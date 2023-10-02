import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Icon, ToolBar } from "../../../utils/general";
import countries from "./assets/countrylist.json";
import "./assets/getstarted.scss";
import { useState } from "react";
import LangSwitch from "./assets/Langswitch";
import { useTranslation } from "react-i18next";

export const Getstarted = () => {
  const wnapp = useSelector((state) => state.apps.getstarted);
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.taskbar);
  const { t } = useTranslation();

  const [pageNo, setPageNo] = useState(1);
  const nextPage = () => (pageNo !== 6 ? setPageNo(pageNo + 1) : null);

  const changUserName = (e) => {
    var newName = e.target.value;
    dispatch({
      type: "STNGSETV",
      payload: {
        path: "person.name",
        value: newName,
      },
    });
  };

  return (
    <div
      className="getstarted floatTab dpShad"
      data-size={wnapp.size}
      data-max={wnapp.max}
      style={{ ...(wnapp.size == "cstm" ? wnapp.dim : null), zIndex: wnapp.z }}
      data-hide={wnapp.hide}
      id={wnapp.icon + "App"}
    >
      <ToolBar
        app={wnapp.action}
        icon={wnapp.icon}
        size={wnapp.size}
        name="入门"
      />
      <div className="windowScreen flex flex-col" data-dock="true">
        <div className="restWindow flex-grow flex flex-col">
          <div className="inner_fill_setup">
            {pageNo === 1 ? (
              <>
                <div className="left">
                  <img
                    alt="left image"
                    id="left_img"
                    src="img/oobe/window11_oobe_region.png"
                  />
                </div>
                <div className="right">
                  <div className="header">
                    {t("oobe.country")}
                    <br />
                    <div className="header_sml"></div>
                  </div>
                  <div className="list_oobe mt-4 win11Scroll">
                    {countries.map((e, i) => {
                      return (
                        <div key={i} className="list_oobe_opt">
                          {e}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : null}
            {pageNo === 2 ? (
              <>
                <div className="left">
                  <img
                    id="left_img"
                    src="img/oobe/window11_oobe_keyb_layout.png"
                  />
                </div>
                <div className="right">
                  <div className="header">
                    {t("oobe.keyboard")}
                    <div className="header_sml">
                      {t("oobe.anotherkeyboard")}
                    </div>
                  </div>
                  <div className="list_oobe mt-4 win11Scroll">
                    <LangSwitch />
                  </div>
                </div>
              </>
            ) : null}
            {pageNo === 3 ? (
              <>
                <div className="left">
                  <img id="left_img" src="img/oobe/window11_oobe_update.png" />
                </div>
                <div className="right align">
                  <img id="loader" src="img/oobe/window11_oobe_region.png" />
                  正在检查更新。
                </div>
              </>
            ) : null}
            {pageNo === 4 ? (
              <>
                <div className="left">
                  <img id="left_img" src="img/oobe/window11_oobe_name.png" />
                </div>
                <div className="right">
                  <div className="header mb-2">来命名你的电脑吧！</div>
                  <div className="header_sml">
                  给它起一个独特的名字，当从其他设备连接到它时
                  这样更容易识别。在你命名之后
                  你的电脑将重新启动。
                  </div>
                  <div className="OOBE_input">
                    <input
                      type="text"
                      placeholder="name"
                      id="OOBE_input"
                      onChange={changUserName}
                    />
                  </div>
                  <div className="text_sml_black">
                    不超过15个字符 <br />
                    没有空格或以下任何特殊字符:
                    <br />
                    &quot;/\ [ ] : | &lt; &gt;+ = ; , ?
                  </div>
                </div>
              </>
            ) : null}
            {pageNo === 5 ? (
              <>
                <div className="left">
                  <img id="left_img" src="img/oobe/window11_oobe_wifi.png" />
                </div>
                <div className="right">
                  <div className="header">
                    连接到你的网络
                    <div className="header_sml">
                    你需要连接到互联网来继续设置你的设备。
                    一旦连接，您将获得最新的功能和安全更新。
                    </div>
                    <div className="ethernet_list">
                      <div className="list_oobe_opt_wifi">
                        <i id="connection" className="bx bx-desktop"></i>{" "}
                        <div className="ethernet_list_opt_inr">
                          <div className="text_sml_black_wifi">以太网 01</div>
                          <div className="header_sml_wifi">未连接</div>
                        </div>
                      </div>
                      <div className="list_oobe_opt"></div>
                      <div className="list_oobe_opt"></div>
                    </div>
                    <div className="text_sml_black">
                    连接遇到困难?
                    </div>
                    <div className="header_sml">
                      有关故障排除提示，请使用其他设备并访问
                      aka.ms/networksetup
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            {pageNo === 6 ? (
              <>
                <div className="left">
                  <img id="left_img" src="img/oobe/window11_oobe_update.png" />
                </div>
                <div className="right">
                  <div className="header mb-8">安装已经完成。</div>
                  <div>现在你可以关闭它了。
                    
                  </div>
                </div>
              </>
            ) : null}

            <div className="yes_button base" onClick={nextPage}>
              是的
            </div>
          </div>

          <div className="setup_settings">
            <img
              alt="accessibility"
              className="mr-4 acsblty"
              src="img/oobe/window11_oobe_accessibility.png"
              width={16}
            />
            <Icon
              className="taskIcon"
              src={`audio${tasks.audio}`}
              ui
              width={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

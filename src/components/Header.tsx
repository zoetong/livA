import IconLogoName from "@/assets/svg/IconLogoName.svg?react";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import { getLanguage, saveLanguage } from "../utils/user_util";

import IconShare from "@/assets/svg/IconShare.svg?react";
import IconUser from "@/assets/svg/IconUser.svg?react";
import CommonButton from "./Common/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/utils/style_utils";
import { App } from "antd";

const Header = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const location = useLocation();
  const [curLng, setCurLng] = useState<string>("zh");
  const [routerName, setRouterName] = useState<string>("home");

  const handleLangClick = () => {
    if (curLng === "zh") {
      i18n.changeLanguage("en");
      saveLanguage("en");
      setCurLng("en");
    } else {
      i18n.changeLanguage("zh");
      saveLanguage("zh");
      setCurLng("zh");
    }
  };

  useEffect(() => {
    setCurLng(getLanguage() || "en");
  }, [i18n.language]);

  useEffect(() => {
    const pathName = location.pathname.split("/")[1] || "home";
    setRouterName(pathName);
  }, [location]);

  const handleShareClick = () => {
    // 复制当前页面链接
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    message.success(t("common.copied_to_clipboard"));
  };

  return (
    <div className="w-full h-full px-6 flex justify-between items-center relative bg-transparent">
      <div
        className={cn(
          "flex items-center cursor-pointer",
          routerName === "live" ? "text-white" : "text-black"
        )}
        onClick={() => {
          navigate("/");
        }}
      >
        <IconLogoName className={cn("w-[116px] h-9")} />
      </div>
      <div className="flex items-center">
        {/** 分享 */}
        <CommonButton
          className="w-7 h-7 flex items-center mr-2"
          onClick={handleShareClick}
        >
          <span className="flex items-center text-sm font-normal text-[#3B3D2C]">
            <IconShare className="w-3.5 h-3.5" />
          </span>
        </CommonButton>
        {/* 语言切换 */}
        <CommonButton
          className="w-7 h-7 flex items-center mr-2"
          onClick={handleLangClick}
        >
          <span className="flex items-center text-sm font-normal text-[#3B3D2C]">
            {curLng === "zh" ? "EN" : "中"}
          </span>
        </CommonButton>

        {/* 头像或登录按钮 */}
        <CommonButton className="w-7 h-7 flex items-center">
          <span className="text-sm font-normal text-[#3B3D2C]">
            <IconUser className="w-3.5 h-3.5" />
          </span>
        </CommonButton>
      </div>
    </div>
  );
};

export default Header;

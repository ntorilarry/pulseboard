"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { MdDarkMode, MdLightMode, MdSettingsBrightness } from "react-icons/md";
import { FiChevronDown } from "react-icons/fi";
import { useDarkMode } from "../utils/useDarkMode";

const DarkModeToggle = () => {
  const { darkMode, themeMode, setThemeMode } = useDarkMode();

  const getIcon = () => {
    if (themeMode === "system") {
      return <MdSettingsBrightness size={20} className={darkMode ? "text-white" : "text-black"} />;
    } else if (themeMode === "light") {
      return <MdLightMode size={20} className="text-black" />;
    } else {
      return <MdDarkMode size={20} className="text-white" />;
    }
  };

  const getLabel = () => {
    if (themeMode === "system") {
      return "System";
    } else if (themeMode === "light") {
      return "Light";
    } else {
      return "Dark";
    }
  };

  const themeOptions = [
    { value: "system" as const, label: "System", icon: MdSettingsBrightness },
    { value: "light" as const, label: "Light", icon: MdLightMode },
    { value: "dark" as const, label: "Dark", icon: MdDarkMode },
  ];

  return (
    <Menu as="div" className="relative">
      <MenuButton className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none transition duration-200">
        {getIcon()}
        <span className="text-sm font-medium text-[#1d1d1f] dark:text-white hidden sm:inline">
          {getLabel()}
        </span>
        <FiChevronDown size={16} className="text-[#1d1d1f] dark:text-white hidden sm:inline" />
      </MenuButton>
      <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right rounded-lg border border-[#e5e5e7] dark:border-gray-800 bg-white dark:bg-[#1a1b21] shadow-lg focus:outline-none z-10 py-1">
        {themeOptions.map((option) => {
          const Icon = option.icon;
          return (
            <MenuItem key={option.value}>
              {({ focus }) => (
                <button
                  onClick={() => setThemeMode(option.value)}
                  className={`${
                    focus ? "bg-neutral-50 dark:bg-[#202127]" : ""
                  } ${
                    themeMode === option.value
                      ? "bg-[#8488F5]/10 text-[#8488F5]"
                      : "text-[#1d1d1f] dark:text-gray-300"
                  } w-full flex items-center gap-2 px-4 py-2 text-sm`}
                >
                  <Icon
                    size={18}
                    className={
                      themeMode === option.value
                        ? "text-[#8488F5]"
                        : "text-[#1d1d1f] dark:text-gray-400"
                    }
                  />
                  {option.label}
                </button>
              )}
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
};

export default DarkModeToggle;

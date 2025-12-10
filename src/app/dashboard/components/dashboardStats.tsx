"use client";

import { useState } from "react";
import KPICard, { KPIData } from "@/app/dashboard/components/KPICard";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";

const initialKPIData: KPIData[] = [
  {
    id: "tasks",
    label: "Task completed",
    value: 128,
    trend: {
      value: 12.5,
      isPositive: true,
      label: "vs yesterday",
    },
  },
  {
    id: "users",
    label: "Active users",
    value: 24,
    trend: {
      value: 4.5,
      isPositive: true,
      label: "vs yesterday",
    },
  },
  {
    id: "uptime",
    label: "Uptime",
    value: "14%",
    trend: {
      value: -2.5,
      isPositive: false,
      label: "vs yesterday",
    },
  },
];

type SortOption =
  | "default"
  | "value-asc"
  | "value-desc"
  | "trend-asc"
  | "trend-desc";

const DashboardStats = () => {
  const [kpiData, setKpiData] = useState<KPIData[]>(initialKPIData);
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const handleSort = (option: SortOption) => {
    setSortOption(option);
    let sorted = [...initialKPIData];

    switch (option) {
      case "value-asc":
        sorted.sort((a, b) => {
          const aVal =
            typeof a.value === "number"
              ? a.value
              : parseFloat(a.value.toString().replace("%", ""));
          const bVal =
            typeof b.value === "number"
              ? b.value
              : parseFloat(b.value.toString().replace("%", ""));
          return aVal - bVal;
        });
        break;
      case "value-desc":
        sorted.sort((a, b) => {
          const aVal =
            typeof a.value === "number"
              ? a.value
              : parseFloat(a.value.toString().replace("%", ""));
          const bVal =
            typeof b.value === "number"
              ? b.value
              : parseFloat(b.value.toString().replace("%", ""));
          return bVal - aVal;
        });
        break;
      case "trend-asc":
        sorted.sort((a, b) => a.trend.value - b.trend.value);
        break;
      case "trend-desc":
        sorted.sort((a, b) => b.trend.value - a.trend.value);
        break;
      default:
        sorted = initialKPIData;
    }

    setKpiData(sorted);
  };

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-4">
        <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white">
          Key Performance Indicators
        </h2>
        <Menu as="div" className="relative">
          <MenuButton className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-[#202127] border border-[#e5e5e7] dark:border-gray-800 text-[#1d1d1f] dark:text-gray-300 transition-colors bg-neutral-50 dark:bg-[#202127]">
            <span className="text-xs sm:text-sm">Sort by</span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              className="shrink-0"
            >
              <path
                d="M3 4.5L6 7.5L9 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </MenuButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg shadow-lg border border-[#e5e5e7] dark:border-gray-800 bg-white dark:bg-[#1a1b21] focus:outline-none z-10 py-1">
              <div className="py-1">
                {[
                  { value: "default", label: "Default" },
                  { value: "value-desc", label: "Value: High to Low" },
                  { value: "value-asc", label: "Value: Low to High" },
                  { value: "trend-desc", label: "Trend: High to Low" },
                  { value: "trend-asc", label: "Trend: Low to High" },
                ].map((option) => (
                  <MenuItem key={option.value}>
                    {({ focus }) => (
                      <button
                        className={`${
                          focus
                            ? "bg-neutral-50 dark:bg-[#202127]"
                            : ""
                        } ${
                          sortOption === option.value
                            ? "bg-[#8488F5]/10 text-[#8488F5]"
                            : "text-[#1d1d1f] dark:text-gray-300"
                        } block w-full text-left px-4 py-2 text-sm`}
                        onClick={() => handleSort(option.value as SortOption)}
                      >
                        {option.label}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.id} data={kpi} />
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;

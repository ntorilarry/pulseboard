"use client";

import { chartData } from "@/data/dashboardData";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import React, { Fragment, useState } from "react";
import Card from "@/components/Card";

const ProductivityChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("This week");

  return (
    <Card>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white">
          Productivity Trends
        </h2>

        <Menu as="div" className="relative">
          <MenuButton className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-[#202127] border border-[#e5e5e7] dark:border-gray-800 text-[#1d1d1f] dark:text-gray-300 transition-colors bg-neutral-50 dark:bg-[#202127]">
            {selectedPeriod}
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
            <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right rounded-lg shadow-lg border border-[#e5e5e7] dark:border-gray-800 bg-white dark:bg-[#1a1b21] focus:outline-none z-10 py-1">
              <div className="py-1">
                {["Today", "This week", "This month", "This year"].map(
                  (period) => (
                    <MenuItem key={period}>
                      {({ focus }) => (
                        <button
                          className={`${
                            focus
                              ? "bg-neutral-50 dark:bg-[#202127]"
                              : ""
                          } ${
                            selectedPeriod === period
                              ? "bg-[#8488F5]/10 text-[#8488F5]"
                              : "text-[#1d1d1f] dark:text-gray-300"
                          } block w-full text-left px-4 py-2 text-sm`}
                          onClick={() => setSelectedPeriod(period)}
                        >
                          {period}
                        </button>
                      )}
                    </MenuItem>
                  )
                )}
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>

      {/* Chart */}
      <div className="relative h-64">
        <svg
          className="w-full h-full"
          viewBox="0 0 700 200"
          preserveAspectRatio="none"
        >
          <path
            d="M 0,150 Q 50,100 100,120 T 200,70 T 300,90 T 400,110 T 500,80 T 600,90 L 700,120"
            fill="none"
            stroke="#5856d6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* X-axis labels */}
        <div className="flex justify-between mt-4 px-2 overflow-x-auto">
          {chartData.map((data, index) => (
            <span
              key={index}
              className="text-xs text-[#86868b] dark:text-neutral-400 shrink-0"
            >
              {data.day}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default ProductivityChart;

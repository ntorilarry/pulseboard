"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { HiMiniXMark, HiChevronDown, HiChevronUp, HiMagnifyingGlass } from "react-icons/hi2";
import { LuChevronsRightLeft } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navigationData } from "@/data/sidebarData";
import { Logo, Monogram } from "../../public";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  isCollapsed,
  setIsCollapsed,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isCollapsed?: boolean;
  setIsCollapsed?: (collapsed: boolean) => void;
}) => {
  const pathname = usePathname();

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 flex z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-neutral-900/80"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex w-full max-w-[250px] flex-1 flex-col bg-white dark:bg-neutral-800">
            <button
              className="absolute top-4 right-4 text-neutral-700 dark:text-white z-10"
              onClick={() => setSidebarOpen(false)}
            >
              <HiMiniXMark className="h-6 w-6" />
            </button>

            {/* Search Bar - Mobile */}
            <div className="mt-6 mb-4 px-6">
              <label htmlFor="mobile-sidebar-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <HiMagnifyingGlass
                    className="w-5 h-5 text-[#86868b] dark:text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="search"
                  id="mobile-sidebar-search"
                  name="search"
                  className="block w-full py-2 pl-10 pr-3 bg-neutral-50 dark:bg-[#202127] border border-[#e5e5e7] dark:border-gray-800 rounded-lg text-sm text-[#1d1d1f] dark:text-gray-300 placeholder-[#86868b] dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8488F5] focus:border-[#8488F5] dark:focus:border-[#8488F5]"
                  placeholder="Type to search"
                />
              </div>
            </div>

            <nav className="flex flex-1 flex-col px-6 overflow-y-auto">
              <ul role="list" className="flex flex-1 flex-col gap-y-2">
                {navigationData.map((item) => {
                  const isSubActive = item.subItems?.some(
                    (sub) => pathname === sub.href
                  );
                  return (
                    <li key={item.name}>
                      {item.subItems ? (
                        <Disclosure defaultOpen={isSubActive}>
                          {({ open }) => (
                            <>
                              <DisclosureButton
                                className={classNames(
                                  "group flex justify-between items-center w-full rounded-lg p-3 text-sm font-medium hover:bg-[#8488F5]/10",
                                  pathname === item.href || isSubActive
                                    ? "bg-[#8488F5]/10 text-[#8488F5]"
                                    : "text-neutral-600 dark:text-white"
                                )}
                              >
                                <div className="flex gap-x-3 items-center">
                                  <item.icon className="h-5 w-5" />
                                  {item.name}
                                </div>
                                <span>
                                  {open ? (
                                    <HiChevronUp className="h-5 w-5" />
                                  ) : (
                                    <HiChevronDown className="h-5 w-5" />
                                  )}
                                </span>
                              </DisclosureButton>

                              <DisclosurePanel className="mt-1 space-y-1">
                                {item.subItems?.map((subItem) => (
                                  <Link
                                    key={subItem.name}
                                    href={subItem.href}
                                    className={classNames(
                                      "flex items-center gap-x-3 rounded-lg p-2 text-sm hover:bg-[#8488F5]/10",
                                      pathname === subItem.href
                                        ? "bg-[#8488F5]/10 text-[#8488F5]"
                                        : "text-neutral-600 dark:text-white"
                                    )}
                                  >
                                    <subItem.icon className="h-5 w-5" />
                                    {subItem.name}
                                  </Link>
                                ))}
                              </DisclosurePanel>
                            </>
                          )}
                        </Disclosure>
                      ) : (
                        <Link
                          href={item.href}
                          className={classNames(
                            "group flex justify-between items-center w-full rounded-lg p-3 text-sm font-medium hover:bg-[#8488F5]/10",
                            pathname === item.href
                              ? "bg-[#8488F5]/10 text-[#8488F5]"
                              : "text-neutral-600 dark:text-white"
                          )}
                        >
                          <div className="flex gap-x-3 items-center">
                            <item.icon className="h-5 w-5" />
                            {item.name}
                          </div>
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* ===== Desktop Sidebar ===== */}
      <div
        className={`hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:flex-col transition-all duration-300 group ${
          isCollapsed ? "lg:w-20" : "lg:w-[250px]"
        }`}
      >
        <div 
          className={`flex grow flex-col overflow-y-auto bg-white border border-r border-neutral-200 dark:border-neutral-700 dark:bg-[#12131A] px-3 lg:px-6 pb-4 ${
            isCollapsed ? "cursor-pointer" : ""
          }`}
          onClick={(e) => {
            if (isCollapsed && setIsCollapsed && (e.target as HTMLElement).closest('a, button') === null) {
              setIsCollapsed(false);
            }
          }}
        >
          <div className="flex items-center justify-between pt-6 shrink-0 relative group/logo">
            {!isCollapsed && (
              <Link href="/dashboard" className="flex gap-x-2 items-center">
                <Image
                  className="w-32 mx-auto"
                  src={Logo}
                  alt="logo"
                  width={128}
                  height={40}
                />
              </Link>
            )}
            {isCollapsed && (
              <div className="flex gap-x-2 items-center justify-center w-full cursor-pointer">
                <Link href="/dashboard" className="flex gap-x-2 items-center justify-center w-full">
                  <Image
                    className="w-10 h-10"
                    src={Monogram}
                    alt="logo"
                    width={40}
                    height={40}
                  />
                </Link>
              </div>
            )}
            {setIsCollapsed && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCollapsed(!isCollapsed);
                }}
                className={`absolute -right-3 top-6 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all z-10 rounded-full p-1 bg-white dark:bg-[#12131A] border border-neutral-200 dark:border-neutral-700 shadow-md ${
                  isCollapsed
                    ? "opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
                    : "opacity-100"
                }`}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              >
                <LuChevronsRightLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
              </button>
            )}
          </div>

          {/* Search Bar */}
          {!isCollapsed && (
            <div className="mt-6 mb-4">
              <label htmlFor="sidebar-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <HiMagnifyingGlass
                    className="w-5 h-5 text-[#86868b] dark:text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="search"
                  id="sidebar-search"
                  name="search"
                  className="block w-full py-2 pl-10 pr-3 bg-neutral-50 dark:bg-[#202127] border border-[#e5e5e7] dark:border-gray-800 rounded-lg text-sm text-[#1d1d1f] dark:text-gray-300 placeholder-[#86868b] dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8488F5] focus:border-[#8488F5] dark:focus:border-[#8488F5]"
                  placeholder="Type to search"
                />
              </div>
            </div>
          )}

          <nav className="mt-4 flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-2">
              {navigationData.map((item) => {
                const isSubActive = item.subItems?.some(
                  (sub) => pathname === sub.href
                );
                return (
                  <li key={item.name}>
                    {item.subItems ? (
                      <Disclosure defaultOpen={isSubActive && !isCollapsed}>
                        {({ open }) => (
                          <>
                            {isCollapsed && item.href ? (
                              <Link
                                href={item.href}
                                className={classNames(
                                  "group flex justify-between items-center w-full rounded-lg p-2 text-sm font-medium hover:bg-[#8488F5]/10",
                                  pathname === item.href || isSubActive
                                    ? "bg-[#8488F5]/10 text-[#8488F5]"
                                    : "text-neutral-600 dark:text-white"
                                )}
                                title={item.name}
                              >
                                <div className="flex gap-x-3 items-center min-w-0 justify-center w-full">
                                  <item.icon className="h-5 w-5 shrink-0" />
                                </div>
                              </Link>
                            ) : (
                              <>
                                <DisclosureButton
                                  className={classNames(
                                    "group flex justify-between items-center w-full rounded-lg p-2 text-sm font-medium hover:bg-[#8488F5]/10",
                                    pathname === item.href || isSubActive
                                      ? "bg-[#8488F5]/10 text-[#8488F5]"
                                      : "text-neutral-600 dark:text-white"
                                  )}
                                  title={isCollapsed ? item.name : undefined}
                                >
                                  <div className="flex gap-x-3 items-center min-w-0">
                                    <item.icon className="h-5 w-5 shrink-0" />
                                    {!isCollapsed && <span className="truncate">{item.name}</span>}
                                  </div>
                                  {!isCollapsed && (
                                    <span>
                                      {open ? (
                                        <HiChevronUp className="h-5 w-5 shrink-0" />
                                      ) : (
                                        <HiChevronDown className="h-5 w-5 shrink-0" />
                                      )}
                                    </span>
                                  )}
                                </DisclosureButton>

                                {!isCollapsed && (
                                  <DisclosurePanel className="mt-1 space-y-1">
                                    {item.subItems?.map((subItem) => (
                                      <Link
                                        key={subItem.name}
                                        href={subItem.href}
                                        className={classNames(
                                          "flex items-center gap-x-3 rounded-lg p-2 text-sm hover:bg-[#8488F5]/10",
                                          pathname === subItem.href
                                            ? "bg-[#8488F5]/10 text-[#8488F5]"
                                            : "text-neutral-600 dark:text-white"
                                        )}
                                      >
                                        <subItem.icon className="h-5 w-5 shrink-0" />
                                        <span className="truncate">{subItem.name}</span>
                                      </Link>
                                    ))}
                                  </DisclosurePanel>
                                )}
                              </>
                            )}
                          </>
                        )}
                      </Disclosure>
                    ) : (
                      <Link
                        href={item.href}
                        className={classNames(
                          "group flex justify-between items-center w-full rounded-lg p-2 text-sm font-medium hover:bg-[#8488F5]/10 ",
                          pathname === item.href
                            ? "bg-[#8488F5]/10 text-[#8488F5]"
                            : "text-neutral-600 dark:text-white"
                        )}
                        title={isCollapsed ? item.name : undefined}
                      >
                        <div className={`flex gap-x-3 items-center min-w-0 ${isCollapsed ? "justify-center w-full" : ""}`}>
                          <item.icon className={isCollapsed ? "h-6 w-6 shrink-0" : "h-5 w-5 shrink-0"} />
                          {!isCollapsed && <span className="truncate">{item.name}</span>}
                        </div>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

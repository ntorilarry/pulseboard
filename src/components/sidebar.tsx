"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { HiMiniXMark, HiChevronDown, HiChevronUp } from "react-icons/hi2";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navigationData } from "@/data/sidebarData";
import { Logo } from "../../public";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
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
          <div className="relative flex w-full max-w-[250px] flex-1 bg-white dark:bg-neutral-800">
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setSidebarOpen(false)}
            >
              <HiMiniXMark className="h-6 w-6" />
            </button>

            <nav className="mt-6 flex flex-1 flex-col px-6">
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
                                  "group flex justify-between items-center w-full rounded-lg p-3 text-sm font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700",
                                  pathname === item.href || isSubActive
                                    ? "bg-[#2563EB]/10 dark:bg-neutral-700 text-[#2563EB] dark:text-white"
                                    : "text-neutral-600 dark:text-white"
                                )}
                              >
                                <div className="flex gap-x-3 items-center">
                                  <item.icon className="h-4 w-4" />
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
                                      "flex items-center gap-x-3 rounded-lg p-2 text-sm hover:bg-neutral-200 dark:hover:bg-neutral-700",
                                      pathname === subItem.href
                                        ? "bg-[#2563EB]/10 dark:bg-neutral-700 text-[#2563EB] dark:text-white"
                                        : "text-neutral-600 dark:text-white"
                                    )}
                                  >
                                    <subItem.icon className="h-4 w-4" />
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
                            "group flex justify-between items-center w-full rounded-lg p-3 text-sm font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700",
                            pathname === item.href
                              ? "bg-[#2563EB]/10 dark:bg-neutral-700 text-[#2563EB] dark:text-white"
                              : "text-neutral-600 dark:text-white"
                          )}
                        >
                          <div className="flex gap-x-3 items-center">
                            <item.icon className="h-4 w-4" />
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
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-30 lg:flex lg:flex-col lg:w-[250px]">
        <div className="flex grow flex-col overflow-y-auto bg-white border border-r border-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 px-6 pb-4">
          <div className="flex items-center justify-between pt-6 shrink-0">
            <Link href="/dashboard" className="flex gap-x-2 items-center">
              <Image
                className=" w-28 mx-auto"
                src={Logo}
                alt="logo"
                width={128}
                height={40}
              />
            </Link>
          </div>

          <nav className="mt-6 flex flex-1 flex-col">
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
                                "group flex justify-between items-center w-full rounded-lg p-2 text-sm font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700",
                                pathname === item.href || isSubActive
                                  ? "bg-[#2563EB]/10 dark:bg-neutral-700 text-[#2563EB] dark:text-white"
                                  : "text-neutral-600 dark:text-white"
                              )}
                            >
                              <div className="flex gap-x-3 items-center">
                                <item.icon className="h-4 w-4" />
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
                                    "flex items-center gap-x-3 rounded-lg p-2 text-sm hover:bg-neutral-200 dark:hover:bg-neutral-700",
                                    pathname === subItem.href
                                      ? "bg-[#2563EB]/10 dark:bg-neutral-700 text-[#2563EB] dark:text-white"
                                      : "text-neutral-600 dark:text-white"
                                  )}
                                >
                                  <subItem.icon className="h-4 w-4" />
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
                          "group flex justify-between items-center w-full rounded-lg p-2 text-sm font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700",
                          pathname === item.href
                            ? "bg-[#2563EB]/10 dark:bg-neutral-700 text-[#2563EB] dark:text-white"
                            : "text-neutral-600 dark:text-white"
                        )}
                      >
                        <div className="flex gap-x-3 items-center">
                          <item.icon className="h-4 w-4" />
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
    </>
  );
};

export default Sidebar;

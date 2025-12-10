"use client";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { useState } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    // Only access localStorage on the client side
    if (typeof window === "undefined") {
      return false;
    }
    try {
      const savedCollapsedState = localStorage.getItem("sidebarCollapsed");
      return savedCollapsedState !== null ? JSON.parse(savedCollapsedState) : false;
    } catch {
      return false;
    }
  });

  const handleCollapseChange = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("sidebarCollapsed", JSON.stringify(collapsed));
      } catch {
        // Ignore localStorage errors
      }
    }
  };

  return (
    <div className="dark:bg-[#12131A] min-h-screen bg-neutral-100">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        isCollapsed={isCollapsed}
        setIsCollapsed={handleCollapseChange}
      />
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "lg:pl-20" : "lg:pl-[250px]"
        }`}
      >
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="py-10 dark:bg-[#12131A] bg-neutral-100">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

"use client";

import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

import { useState } from "react";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dark:bg-neutral-900 min-h-screen bg-neutral-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="lg:pl-[250px]">
        <Header setSidebarOpen={setSidebarOpen} />
        <main className="py-10 dark:bg-neutral-900 bg-neutral-100">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;

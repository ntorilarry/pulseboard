"use client";

import MainLayout from "@/shared/mainLayout";
import DashboardStats from "./components/dashboardStats";
import RecentActivity from "./components/recentActivity";
import ProductivityChart from "./components/productivityChart";

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="flex-1 min-h-screen flex flex-col overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 sm:mb-8 text-[#1d1d1f] dark:text-white">
            Dashboard Overview
          </h1>
          <DashboardStats />

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
            <div className="xl:col-span-2">
              <ProductivityChart />
            </div>
            <div>
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

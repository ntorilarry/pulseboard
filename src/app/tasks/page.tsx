"use client";

import { useState } from "react";
import MainLayout from "@/shared/mainLayout";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { FiSearch, FiChevronDown } from "react-icons/fi";
import TaskList from "./components/taskList";
import CreateTask from "./components/createTask";
import { tasks } from "@/data/taskData";

const Tasks = () => {
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);

  const handleTaskEdit = (taskId: number) => {
    console.log("Edit task:", taskId);
  };

  const handleTaskDelete = (taskId: number) => {
    console.log("Delete task:", taskId);
  };

  const handleCreateTask = (taskData: {
    title: string;
    description: string;
    priority: "High" | "Medium" | "Low";
    status: "In Progress" | "Completed" | "To do";
  }) => {
    console.log("Create task:", taskData);

  };
  return (
    <MainLayout>
      <div className="flex-1 min-h-screen overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-[#1d1d1f] dark:text-white mb-1">
              Tasks
            </h1>
            <p className="text-[#86868b] dark:text-gray-400 text-sm">
              Manage your team&apos;s workload and priorities
            </p>
          </div>

          {/* Filters Bar */}
          <div className="bg-white dark:bg-[#1a1b21] border border-[#e5e5e7] dark:border-gray-800 rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="flex-1 relative">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#86868b] dark:text-gray-500"
                size={16}
              />
              <input
                type="text"
                placeholder="search for customer by name or number"
                className="w-full bg-neutral-50 dark:bg-[#202127] border border-[#e5e5e7] dark:border-gray-800 rounded-lg pl-9 pr-3 py-2 text-sm text-[#1d1d1f] dark:text-gray-300 placeholder-[#86868b] dark:placeholder-gray-600 focus:outline-none focus:border-[#8488F5] dark:focus:border-gray-700"
              />
            </div>

            <Menu as="div" className="relative">
              <MenuButton className="flex items-center gap-2 px-4 py-2 bg-neutral-50 dark:bg-[#202127] border border-[#e5e5e7] dark:border-gray-800 rounded-lg text-[#1d1d1f] dark:text-gray-300 text-sm hover:border-[#8488F5] dark:hover:border-gray-700 transition-colors w-full sm:w-auto justify-between sm:justify-start">
                All Status
                <FiChevronDown size={16} />
              </MenuButton>
              <MenuItems className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a1b21] border border-[#e5e5e7] dark:border-gray-800 rounded-lg shadow-lg py-1 z-10">
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={`${
                        focus
                          ? "bg-neutral-50 dark:bg-[#202127]"
                          : ""
                      } w-full text-left px-4 py-2 text-sm text-[#1d1d1f] dark:text-gray-300`}
                    >
                      All Status
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={`${
                        focus
                          ? "bg-neutral-50 dark:bg-[#202127]"
                          : ""
                      } w-full text-left px-4 py-2 text-sm text-[#1d1d1f] dark:text-gray-300`}
                    >
                      In Progress
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={`${
                        focus
                          ? "bg-neutral-50 dark:bg-[#202127]"
                          : ""
                      } w-full text-left px-4 py-2 text-sm text-[#1d1d1f] dark:text-gray-300`}
                    >
                      Completed
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>

            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-2 px-4 py-2 bg-neutral-50 dark:bg-[#202127] border border-[#e5e5e7] dark:border-gray-800 rounded-lg text-[#1d1d1f] dark:text-gray-300 text-sm hover:border-[#8488F5] dark:hover:border-gray-700 transition-colors w-full sm:w-auto justify-between sm:justify-start">
                All Priority
                <FiChevronDown size={16} />
              </Menu.Button>
              <MenuItems className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a1b21] border border-[#e5e5e7] dark:border-gray-800 rounded-lg shadow-lg py-1 z-10">
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={`${
                        focus
                          ? "bg-neutral-50 dark:bg-[#202127]"
                          : ""
                      } w-full text-left px-4 py-2 text-sm text-[#1d1d1f] dark:text-gray-300`}
                    >
                      All Priority
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={`${
                        focus
                          ? "bg-neutral-50 dark:bg-[#202127]"
                          : ""
                      } w-full text-left px-4 py-2 text-sm text-[#1d1d1f] dark:text-gray-300`}
                    >
                      High
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ focus }) => (
                    <button
                      className={`${
                        focus
                          ? "bg-neutral-50 dark:bg-[#202127]"
                          : ""
                      } w-full text-left px-4 py-2 text-sm text-[#1d1d1f] dark:text-gray-300`}
                    >
                      Medium
                    </button>
                  )}
                </MenuItem>
              </MenuItems>
            </Menu>

            <button
              onClick={() => setIsCreateTaskOpen(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#4A38C2] hover:bg-[#6d72d4] dark:bg-indigo-600 dark:hover:bg-indigo-700 rounded-lg text-white text-sm font-medium transition-colors"
            >
              + Create Task
            </button>
          </div>

          {/* Tasks List */}
          <TaskList
            tasks={tasks}
            onTaskEdit={handleTaskEdit}
            onTaskDelete={handleTaskDelete}
          />
        </div>
      </div>

      {/* Create Task Slide-over */}
      <CreateTask
        isOpen={isCreateTaskOpen}
        onClose={() => setIsCreateTaskOpen(false)}
        onSubmit={handleCreateTask}
      />
    </MainLayout>
  );
};

export default Tasks;

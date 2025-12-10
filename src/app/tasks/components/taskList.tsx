"use client";

import { Menu } from "@headlessui/react";
import {
  FiTag,
  FiCalendar,
  FiAlertCircle,
  FiMoreVertical,
} from "react-icons/fi";

type Priority = "High" | "Medium" | "Low";
type Status = "In Progress" | "Completed" | "To do";

interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: string;
  tags: string[];
}

interface TaskListProps {
  tasks: Task[];
  onTaskEdit?: (taskId: number) => void;
  onTaskDelete?: (taskId: number) => void;
}

export default function TaskList({
  tasks,
  onTaskEdit,
  onTaskDelete,
}: TaskListProps) {
  const getStatusColor = (status: Status) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-500/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "Completed":
        return "bg-green-500/10 dark:bg-green-500/10 text-green-600 dark:text-green-400";
      case "To do":
        return "bg-gray-500/10 dark:bg-gray-500/10 text-gray-600 dark:text-gray-400";
    }
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "High":
        return "text-red-600 dark:text-red-400";
      case "Medium":
        return "text-orange-600 dark:text-orange-400";
      case "Low":
        return "text-gray-600 dark:text-gray-400";
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white dark:bg-[#1a1b21] border border-[#e5e5e7] dark:border-gray-800 rounded-lg p-6 hover:border-[#8488F5] dark:hover:border-gray-700 transition-colors relative"
        >
          {/* Action Menu - Top Right (Mobile) */}
          <div className="absolute top-4 right-4 sm:hidden">
            <Menu as="div" className="relative">
              <Menu.Button className="text-[#86868b] dark:text-gray-400 hover:text-[#1d1d1f] dark:hover:text-gray-300 transition-colors">
                <FiMoreVertical size={20} />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a1b21] border border-[#e5e5e7] dark:border-gray-800 rounded-lg shadow-lg py-1 z-10">
                <Menu.Item>
                  {({ focus }) => (
                    <button
                      onClick={() => onTaskEdit?.(task.id)}
                      className={`${
                        focus
                          ? "bg-neutral-50 dark:bg-[#202127]"
                          : ""
                      } w-full text-left px-4 py-2 text-sm text-[#1d1d1f] dark:text-gray-300`}
                    >
                      Edit
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ focus }) => (
                    <button
                      onClick={() => onTaskDelete?.(task.id)}
                      className={`${
                        focus
                          ? "bg-neutral-50 dark:bg-[#202127]"
                          : ""
                      } w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400`}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>

          <div className="flex flex-col sm:flex-row items-start justify-between mb-3 gap-4">
            <div className="flex-1 min-w-0 pr-8 sm:pr-0">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h3 className="text-[#1d1d1f] dark:text-white font-semibold text-lg">
                  {task.title}
                </h3>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </div>
              <p className="text-[#86868b] dark:text-gray-400 text-sm mb-4">
                {task.description}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 px-2 py-1 bg-neutral-100 dark:bg-gray-800 rounded text-[#86868b] dark:text-gray-400 text-xs"
                  >
                    <FiTag size={12} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 sm:ml-6 w-full sm:w-auto">
              <div className="text-right">
                <div className="text-xs text-[#86868b] dark:text-gray-500 mb-1">
                  Priority
                </div>
                <div
                  className={`flex items-center gap-1 text-sm font-medium ${getPriorityColor(
                    task.priority
                  )}`}
                >
                  <FiAlertCircle size={14} />
                  {task.priority}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-[#86868b] dark:text-gray-500 mb-1">
                  Due Date
                </div>
                <div className="flex items-center gap-1 text-sm text-[#1d1d1f] dark:text-gray-300">
                  <FiCalendar size={14} />
                  {task.dueDate}
                </div>
              </div>
              {/* Action Menu - Desktop */}
              <div className="hidden sm:block">
                <Menu as="div" className="relative">
                  <Menu.Button className="text-[#86868b] dark:text-gray-400 hover:text-[#1d1d1f] dark:hover:text-gray-300 transition-colors">
                    <FiMoreVertical size={20} />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a1b21] border border-[#e5e5e7] dark:border-gray-800 rounded-lg shadow-lg py-1 z-10">
                    <Menu.Item>
                      {({ focus }) => (
                        <button
                          onClick={() => onTaskEdit?.(task.id)}
                          className={`${
                            focus
                              ? "bg-neutral-50 dark:bg-[#202127]"
                              : ""
                          } w-full text-left px-4 py-2 text-sm text-[#1d1d1f] dark:text-gray-300`}
                        >
                          Edit
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ focus }) => (
                        <button
                          onClick={() => onTaskDelete?.(task.id)}
                          className={`${
                            focus
                              ? "bg-neutral-50 dark:bg-[#202127]"
                              : ""
                          } w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400`}
                        >
                          Delete
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export type { Task, Priority, Status, TaskListProps };

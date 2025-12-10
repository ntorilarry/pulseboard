"use client";

import { Fragment, useState } from "react";
import { Dialog, DialogPanel, DialogTitle, MenuButton, MenuItem, MenuItems, Transition, TransitionChild } from "@headlessui/react";
import { HiXMark } from "react-icons/hi2";
import { Menu } from "@headlessui/react";
import { FiChevronDown } from "react-icons/fi";

type Priority = "High" | "Medium" | "Low";
type Status = "In Progress" | "Completed" | "To do";

interface CreateTaskProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: {
    title: string;
    description: string;
    priority: Priority;
    status: Status;
  }) => void;
}

const CreateTask = ({ isOpen, onClose, onSubmit }: CreateTaskProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [status, setStatus] = useState<Status>("To do");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      priority,
      status,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setStatus("To do");
    onClose();
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setStatus("To do");
    onClose();
  };

  const priorityOptions: Priority[] = ["High", "Medium", "Low"];
  const statusOptions: Status[] = ["To do", "In Progress", "Completed"];

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

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-900/50 dark:bg-neutral-900/80 transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white dark:bg-[#12131A] shadow-xl">
                    <div className="px-4 py-6 sm:px-6 border-b border-[#e5e5e7] dark:border-gray-800">
                      <div className="flex items-center justify-between">
                        <div>
                        <DialogTitle className="text-xl font-bold text-[#1d1d1f] dark:text-white">
                          Create New Task
                        </DialogTitle>
                        <p className="text-[#1d1d1f] dark:text-white text-sm">Create a task</p>
                        </div>
                        <button
                          type="button"
                          className="rounded-lg p-2 text-[#86868b] dark:text-gray-400 hover:bg-neutral-100 dark:hover:bg-[#202127] focus:outline-none focus:ring-2 focus:ring-[#8488F5]"
                          onClick={handleClose}
                        >
                          <span className="sr-only">Close</span>
                          <HiXMark className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="flex-1">
                      <div className="px-4 py-6 sm:px-6 space-y-6">
                        {/* Task Title */}
                        <div>
                          <label
                            htmlFor="task-title"
                            className="block text-sm font-medium text-[#1d1d1f] dark:text-white mb-2"
                          >
                            Task Title <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="task-title"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="block w-full rounded-lg border border-[#e5e5e7] dark:border-gray-800 bg-white dark:bg-[#202127] px-3 py-2 text-sm text-[#1d1d1f] dark:text-gray-300 placeholder-[#86868b] dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8488F5] focus:border-[#8488F5]"
                            placeholder="Enter task title"
                          />
                        </div>

                        {/* Description */}
                        <div>
                          <label
                            htmlFor="task-description"
                            className="block text-sm font-medium text-[#1d1d1f] dark:text-white mb-2"
                          >
                            Description
                          </label>
                          <textarea
                            id="task-description"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="block w-full rounded-lg border border-[#e5e5e7] dark:border-gray-800 bg-white dark:bg-[#202127] px-3 py-2 text-sm text-[#1d1d1f] dark:text-gray-300 placeholder-[#86868b] dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#8488F5] focus:border-[#8488F5] resize-none"
                            placeholder="Enter task description"
                          />
                        </div>

                        {/* Priority */}
                        <div>
                          <label
                            htmlFor="task-priority"
                            className="block text-sm font-medium text-[#1d1d1f] dark:text-white mb-2"
                          >
                            Priority
                          </label>
                          <Menu as="div" className="relative">
                            <MenuButton className="flex items-center justify-between w-full rounded-lg border border-[#e5e5e7] dark:border-gray-800 bg-white dark:bg-[#202127] px-3 py-2 text-sm text-[#1d1d1f] dark:text-gray-300 hover:border-[#8488F5] dark:hover:border-gray-700 transition-colors">
                              <span className={getPriorityColor(priority)}>
                                {priority}
                              </span>
                              <FiChevronDown
                                size={16}
                                className="text-[#86868b] dark:text-gray-400"
                              />
                            </MenuButton>
                            <MenuItems className="absolute z-10 mt-2 w-full origin-top-right rounded-lg border border-[#e5e5e7] dark:border-gray-800 bg-white dark:bg-[#1a1b21] shadow-lg focus:outline-none">
                              <div className="py-1">
                                {priorityOptions.map((option) => (
                                  <MenuItem key={option}>
                                    {({ focus }) => (
                                      <button
                                        type="button"
                                        onClick={() => setPriority(option)}
                                        className={`${
                                          focus
                                            ? "bg-neutral-50 dark:bg-[#202127]"
                                            : ""
                                        } ${
                                          priority === option
                                            ? "bg-[#8488F5]/10 text-[#8488F5]"
                                            : ""
                                        } w-full text-left px-4 py-2 text-sm text-[#1d1d1f] dark:text-gray-300`}
                                      >
                                        <span className={getPriorityColor(option)}>
                                          {option}
                                        </span>
                                      </button>
                                    )}
                                  </MenuItem>
                                ))}
                              </div>
                            </MenuItems>
                          </Menu>
                        </div>

                        {/* Status */}
                        <div>
                          <label
                            htmlFor="task-status"
                            className="block text-sm font-medium text-[#1d1d1f] dark:text-white mb-2"
                          >
                            Status
                          </label>
                          <Menu as="div" className="relative">
                            <MenuButton className="flex items-center justify-between w-full rounded-lg border border-[#e5e5e7] dark:border-gray-800 bg-white dark:bg-[#202127] px-3 py-2 text-sm text-[#1d1d1f] dark:text-gray-300 hover:border-[#8488F5] dark:hover:border-gray-700 transition-colors">
                              <span
                                className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                                  status
                                )}`}
                              >
                                {status}
                              </span>
                              <FiChevronDown
                                size={16}
                                className="text-[#86868b] dark:text-gray-400"
                              />
                            </MenuButton>
                            <MenuItems className="absolute z-10 mt-2 w-full origin-top-right rounded-lg border border-[#e5e5e7] dark:border-gray-800 bg-white dark:bg-[#1a1b21] shadow-lg focus:outline-none">
                              <div className="py-1">
                                {statusOptions.map((option) => (
                                  <MenuItem key={option}>
                                    {({ focus }) => (
                                      <button
                                        type="button"
                                        onClick={() => setStatus(option)}
                                        className={`${
                                          focus
                                            ? "bg-neutral-50 dark:bg-[#202127]"
                                            : ""
                                        } ${
                                          status === option
                                            ? "bg-[#8488F5]/10 text-[#8488F5]"
                                            : ""
                                        } w-full text-left px-4 py-2 text-sm`}
                                      >
                                        <span
                                          className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(
                                            option
                                          )}`}
                                        >
                                          {option}
                                        </span>
                                      </button>
                                    )}
                                  </MenuItem>
                                ))}
                              </div>
                            </MenuItems>
                          </Menu>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="border-t border-[#e5e5e7] dark:border-gray-800 px-4 py-4 sm:px-6 mt-auto">
                        <div className="flex justify-between gap-3">
                          <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 text-sm font-medium text-[#1d1d1f] dark:text-gray-300 bg-white dark:bg-[#202127] border border-[#e5e5e7] dark:border-gray-800 rounded-lg hover:bg-neutral-50 dark:hover:bg-[#1a1b21] transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 text-sm font-medium text-white bg-[#4A38C2] hover:bg-[#6d72d4] dark:bg-indigo-600 dark:hover:bg-indigo-700 rounded-lg transition-colors"
                          >
                            Create Task
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateTask;


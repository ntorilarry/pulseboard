import { Task } from "@/app/tasks/components/taskList";

export const tasks: Task[] = [
  {
    id: 1,
    title: "Design System Audit",
    description: "Review current components and identify inconsistencies.",
    status: "In Progress",
    priority: "High",
    dueDate: "2023-11-20",
    tags: ["Design", "Core"],
  },
  {
    id: 2,
    title: "User Research Analysis",
    description: "Compile findings from user interviews and usability tests.",
    status: "Completed",
    priority: "Low",
    dueDate: "2023-10-15",
    tags: ["Research", "Insights"],
  },
  {
    id: 3,
    title: "Accessibility Improvements",
    description: "Audit current interfaces for compliance with WCAG standards.",
    status: "To do",
    priority: "Medium",
    dueDate: "2023-12-01",
    tags: ["Development", "Core"],
  },
  {
    id: 4,
    title: "Feature Prioritization",
    description: "Assess user feedback to prioritize future features.",
    status: "In Progress",
    priority: "Medium",
    dueDate: "2023-11-10",
    tags: ["Product", "Planning"],
  },
  {
    id: 5,
    title: "Marketing Strategy Review",
    description: "Evaluate the effectiveness of current marketing campaigns.",
    status: "In Progress",
    priority: "Low",
    dueDate: "2023-11-30",
    tags: ["Marketing", "Strategy"],
  },
];

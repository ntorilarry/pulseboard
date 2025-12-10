import { MdOutlineDashboard } from "react-icons/md";
import { LuSquareCheckBig } from "react-icons/lu";

export type NavigationSubItem = {
  name: string;
  href: string;
  icon: React.ElementType;
};

export type NavigationItem = {
  name: string;
  href: string;
  icon: React.ElementType;
  subItems?: NavigationSubItem[];
};

export const navigationData: NavigationItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: MdOutlineDashboard,
  },

   {
    name: "Tasks",
    href: "/tasks",
    icon: LuSquareCheckBig,
  },
];

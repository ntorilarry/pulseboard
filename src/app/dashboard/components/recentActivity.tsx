"use client";

import { activities } from "@/data/dashboardData";
import Image from "next/image";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { HiChevronDown, HiChevronUp } from "react-icons/hi2";
import Card from "@/components/Card";

interface Activity {
  name: string;
  action: string;
  task: string;
  time: string;
  avatar: string;
  details?: string;
}

const RecentActivity = () => {
  const activitiesWithDetails: Activity[] = activities.map(
    (activity) => ({
      ...activity,
      details: `This activity was performed by ${activity.name} who ${activity.action} the task "${activity.task}". The action was completed ${activity.time}. This represents an important milestone in the project timeline.`,
    })
  );

  return (
    <Card>
      <h2 className="text-xl font-bold mb-6 text-[#1d1d1f] dark:text-white">
        Recent Activity
      </h2>

      <div className="space-y-3">
        {activitiesWithDetails.map((activity, index) => (
          <Disclosure key={index}>
            {({ open }) => (
              <div className="border-b border-[#e5e5e7] dark:border-gray-800 last:border-b-0 pb-3 last:pb-0">
                <DisclosureButton className="w-full">
                  <div className="flex items-start gap-3 hover:bg-neutral-50 dark:hover:bg-[#202127] rounded-lg p-2 -m-2 transition-colors">
                    <Image
                      src={activity.avatar || "/placeholder.svg"}
                      alt={activity.name}
                      className="w-9 h-9 rounded-full shrink-0"
                      width={36}
                      height={36}
                    />
                    <div className="flex-1 min-w-0 text-left">
                      <div className="text-sm leading-relaxed">
                        <span className="font-semibold text-[#1d1d1f] dark:text-white">
                          {activity.name}
                        </span>{" "}
                        <span className="text-[#86868b] dark:text-gray-400">
                          {activity.action}
                        </span>{" "}
                        <span className="font-medium text-[#1d1d1f] dark:text-white">
                          &quot;{activity.task}&quot;
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="text-xs text-[#86868b] dark:text-gray-400">
                          {activity.time}
                        </div>
                        <div className="flex items-center gap-1 text-xs text-[#86868b] dark:text-gray-400">
                          <span>{open ? "Less" : "More"}</span>
                          {open ? (
                            <HiChevronUp className="h-4 w-4" />
                          ) : (
                            <HiChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </DisclosureButton>

                <DisclosurePanel className="mt-2 pl-12">
                  <div className="text-sm text-[#86868b] dark:text-gray-400 leading-relaxed bg-neutral-50 dark:bg-[#202127] rounded-lg p-3">
                    {activity.details}
                  </div>
                </DisclosurePanel>
              </div>
            )}
          </Disclosure>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivity;

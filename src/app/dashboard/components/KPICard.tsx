"use client";

import { MdTrendingDown, MdTrendingUp } from "react-icons/md";
import Card from "../../../components/Card";

export interface KPIData {
  id: string;
  label: string;
  value: string | number;
  trend: {
    value: number;
    isPositive: boolean;
    label: string;
  };
}

interface KPICardProps {
  data: KPIData;
  className?: string;
}

const KPICard = ({ data, className = "" }: KPICardProps) => {
  return (
    <Card className={className}>
      <div className="text-sm mb-2 text-[#86868b] dark:text-gray-400">
        {data.label}
      </div>
      <div className="text-4xl font-bold mb-2 text-[#1d1d1f] dark:text-white">
        {data.value}
      </div>
      <div className="flex items-center gap-1 text-sm">
        {data.trend.isPositive ? (
          <MdTrendingUp size={16} className="text-[#34c759]" />
        ) : (
          <MdTrendingDown size={16} className="text-[#ff3b30]" />
        )}
        <span
          className={
            data.trend.isPositive ? "text-[#34c759]" : "text-[#ff3b30]"
          }
        >
          {data.trend.value > 0 ? "+" : ""}
          {data.trend.value}%
        </span>
        <span className="text-[#86868b] dark:text-gray-400">
          {data.trend.label}
        </span>
      </div>
    </Card>
  );
};

export default KPICard;

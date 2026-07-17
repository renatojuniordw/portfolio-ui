import { memo } from "react";
import { ArrowUpRight } from "lucide-react";

export const ArrowCta = memo(function ArrowCta() {
  return (
    <div className="w-10 h-10 rounded-full bg-[#111111] dark:bg-white flex items-center justify-center text-white dark:text-[#111111] group-hover:scale-110 transition-transform duration-300 shrink-0">
      <ArrowUpRight className="w-4 h-4" />
    </div>
  );
});

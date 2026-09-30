import { memo } from "react";
import { ArrowUpRight } from "lucide-react";

export const ArrowCta = memo(function ArrowCta() {
  return (
    <div
      aria-hidden="true"
      className="w-10 h-10 rounded-full bg-text text-bg flex items-center justify-center group-hover:scale-110 motion-reduce:group-hover:scale-100 transition-transform duration-300 shrink-0"
    >
      <ArrowUpRight className="w-4 h-4" />
    </div>
  );
});

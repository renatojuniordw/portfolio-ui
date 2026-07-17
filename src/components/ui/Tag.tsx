import { memo } from "react";

interface TagProps {
  children: React.ReactNode;
}

export const Tag = memo(function Tag({ children }: TagProps) {
  return (
    <span className="tag-pill">
      {children}
    </span>
  );
});

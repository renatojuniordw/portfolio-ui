interface TagProps {
  children: React.ReactNode;
}

export function Tag({ children }: TagProps) {
  return (
    <span className="tag-pill">
      {children}
    </span>
  );
}

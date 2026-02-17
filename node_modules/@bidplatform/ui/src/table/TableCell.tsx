export function TableCell({
  children,
  header = false
}: {
  children: React.ReactNode;
  header?: boolean;
}) {
  const Tag = header ? "th" : "td";
  return (
    <Tag className="px-4 py-2 text-left">
      {children}
    </Tag>
  );
}

export const StatusChip = ({ status }: { status: string }) => {
  const map: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    approved: "bg-green-100 text-green-700",
    rejected: "bg-red-100 text-red-700",
    in_progress: "bg-blue-100 text-blue-700"
  };

  return (
    <span className={`px-2 py-1 text-xs rounded ${map[status] || "bg-gray-200 text-gray-700"}`}>
      {status.replace("_", " ").toUpperCase()}
    </span>
  );
};

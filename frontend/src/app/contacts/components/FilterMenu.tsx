interface FilterMenuProps {
  statusFilter: string | null;
  setStatusFilter: (value: string | null) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  limit: number;
  setLimit: (value: number) => void;
  statusOptions: { value: string | null; label: string }[];
}

export default function FilterMenu({
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  limit,
  setLimit,
  statusOptions,
}: FilterMenuProps) {
  return (
    <div className="bg-white p-4 mb-4 rounded shadow-md">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            className="w-full p-2 border rounded"
            value={statusFilter || ""}
            onChange={(e) => setStatusFilter(e.target.value || null)}
          >
            {statusOptions.map((option) => (
              <option key={option.label} value={option.value || ""}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort By
          </label>
          <select
            className="w-full p-2 border rounded"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="-createdAt">Newest First</option>
            <option value="createdAt">Oldest First</option>
            <option value="fullName">Name (A-Z)</option>
            <option value="-fullName">Name (Z-A)</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Items Per Page
          </label>
          <select
            className="w-full p-2 border rounded"
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
    </div>
  );
}
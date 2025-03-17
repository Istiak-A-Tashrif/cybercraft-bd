interface PaginationProps {
  page: number;
  totalPages: number;
  setPage: (value: number) => void;
}

export default function Pagination({ page, totalPages, setPage }: PaginationProps) {
  return (
    <div className="flex justify-between items-center mt-4 bg-white p-4 rounded-lg">
      <button
        className="px-4 py-2 border rounded text-sm disabled:opacity-50 cursor-pointer"
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
      >
        Previous
      </button>
      <div className="text-sm">
        Page {page} of {totalPages}
      </div>
      <button
        className="px-4 py-2 border rounded text-sm disabled:opacity-50 cursor-pointer"
        onClick={() => setPage(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
  showInfo?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  totalItems,
  showInfo = true,
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots.filter((v, i, a) => a.indexOf(v) === i);
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-lg px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Info */}
        {showInfo && (
          <div className="text-sm text-gray-600">
            Showing <span className="font-semibold text-gray-900">{startItem}</span> to{" "}
            <span className="font-semibold text-gray-900">{endItem}</span> of{" "}
            <span className="font-semibold text-gray-900">{totalItems}</span> results
          </div>
        )}

        {/* Pagination Controls */}
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-105"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {getVisiblePages().map((page, index) => {
              if (page === "...") {
                return (
                  <span key={`dots-${index}`} className="px-3 py-2 text-gray-500">
                    ...
                  </span>
                );
              }

              const pageNumber = page as number;
              const isActive = pageNumber === currentPage;

              return (
                <button
                  key={pageNumber}
                  onClick={() => onPageChange(pageNumber)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 hover:text-purple-600"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>

          {/* Next Button */}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              currentPage === totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl hover:scale-105"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

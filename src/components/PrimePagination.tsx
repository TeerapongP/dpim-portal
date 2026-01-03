'use client';

import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';

interface PrimePaginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  showFirstLast?: boolean;
  maxVisiblePages?: number;
  showPageInfo?: boolean;
  itemsPerPage?: number;
  totalItems?: number;
}

export default function PrimePagination({
  currentPage = 1,
  totalPages = 25,
  onPageChange = () => {},
  showFirstLast = true,
  maxVisiblePages = 5,
  showPageInfo = true,
  itemsPerPage = 10,
  totalItems = 250
}: PrimePaginationProps) {
  const [activePage, setActivePage] = useState(currentPage);

  // Sync with external currentPage prop
  useEffect(() => {
    setActivePage(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setActivePage(page);
      onPageChange(page);
    }
  };

  const getVisiblePages = (): (number | string)[] => {
    if (totalPages <= maxVisiblePages) {
      // If total pages is less than max visible, show all pages
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    // Always show first page
    pages.push(1);

    let startPage: number;
    let endPage: number;

    if (activePage <= halfVisible + 1) {
      // Near the beginning
      startPage = 2;
      endPage = maxVisiblePages - 1;
    } else if (activePage >= totalPages - halfVisible) {
      // Near the end
      startPage = totalPages - maxVisiblePages + 2;
      endPage = totalPages - 1;
    } else {
      // In the middle
      startPage = activePage - halfVisible + 1;
      endPage = activePage + halfVisible - 1;
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push('ellipsis-start');
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      if (i > 1 && i < totalPages) {
        pages.push(i);
      }
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push('ellipsis-end');
    }

    // Always show last page (if more than 1 page)
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-gradient-to-br from-gray-50 to-white">
      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* First Page Button */}
        {showFirstLast && activePage > 1 && (
          <Button
            icon="pi pi-angle-double-left"
            onClick={() => handlePageChange(1)}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600 hover:shadow-xl hover:scale-105 active:scale-95 shadow-lg transition-all duration-300"
            text={false}
            tooltip="หน้าแรก"
            tooltipOptions={{ position: 'top', className: 'bg-emerald-600 text-white text-xs px-2 py-1 rounded-lg' }}
          />
        )}

        {/* Previous Button */}
        <Button
          label="Previous"
          icon="pi pi-chevron-left"
          onClick={() => handlePageChange(activePage - 1)}
          disabled={activePage === 1}
          className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg ${
            activePage === 1
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-teal-400 to-teal-500 text-white hover:from-teal-500 hover:to-teal-600 hover:shadow-xl hover:scale-105 active:scale-95'
          }`}
          text={false}
        />

        {/* Page Numbers and Ellipsis */}
        {visiblePages.map((page, index) => {
          if (typeof page === 'string') {
            return (
              <div key={`ellipsis-${index}`} className="flex items-center justify-center w-12 h-12 mx-1">
                <span className="text-emerald-600 font-bold text-xl">⋯</span>
              </div>
            );
          }
          
          return (
            <Button
              key={page}
              label={page.toString()}
              onClick={() => handlePageChange(page)}
              className={`w-12 h-12 rounded-xl font-bold text-sm transition-all duration-300 shadow-lg ${
                page === activePage
                  ? 'bg-gradient-to-br from-emerald-600 to-green-700 text-white shadow-emerald-300 hover:shadow-emerald-400 hover:shadow-xl transform hover:scale-110'
                  : 'bg-gradient-to-br from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 hover:shadow-xl hover:scale-105 active:scale-95'
              }`}
              text={false}
            />
          );
        })}

        {/* Next Button */}
        <Button
          label="Next"
          icon="pi pi-chevron-right"
          iconPos="right"
          onClick={() => handlePageChange(activePage + 1)}
          disabled={activePage === totalPages}
          className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 shadow-lg ${
            activePage === totalPages
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600 hover:shadow-xl hover:scale-105 active:scale-95'
          }`}
          text={false}
        />

        {/* Last Page Button */}
        {showFirstLast && activePage < totalPages && (
          <Button
            icon="pi pi-angle-double-right"
            onClick={() => handlePageChange(totalPages)}
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 text-white hover:from-teal-600 hover:to-emerald-600 hover:shadow-xl hover:scale-105 active:scale-95 shadow-lg transition-all duration-300"
            text={false}
            tooltip="หน้าสุดท้าย"
            tooltipOptions={{ position: 'top', className: 'bg-emerald-600 text-white text-xs px-2 py-1 rounded-lg' }}
          />
        )}
      </div>

      {/* Enhanced Page Info */}
      {showPageInfo && (
        <div className="flex items-center gap-6">
          {/* Page Info */}
          <div className="flex items-center gap-3 px-4 py-2 bg-white rounded-full shadow-md border border-gray-100">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <i className="pi pi-file text-emerald-600 text-sm"></i>
            <span className="text-gray-700 font-medium text-sm">
              หน้า {activePage} จาก {totalPages}
            </span>
          </div>

          {/* Total Items */}
          <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full shadow-md border border-emerald-100">
            <i className="pi pi-list text-emerald-600 text-sm"></i>
            <span className="text-emerald-700 font-semibold text-sm">
              รายการทั้งหมด {totalItems.toLocaleString()} รายการ
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
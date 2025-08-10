"use client";

import React, { useState, useCallback } from "react";

interface TableColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  onRowClick?: (row: T, index: number) => void;
  rowKey: keyof T | ((row: T) => string);
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  hoverable?: boolean;
}

function Table<T>({
  data,
  columns,
  onRowClick,
  rowKey,
  loading = false,
  emptyMessage = "No data available",
  className = "",
  hoverable = true,
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const getRowKey = (row: T): string => {
    if (typeof rowKey === "function") {
      return rowKey(row);
    }
    return String(row[rowKey]);
  };

  const getValue = useCallback((row: T, key: keyof T | string): unknown => {
    if (typeof key === "string" && key.includes(".")) {
      return key.split(".").reduce((obj: unknown, k) => (obj as Record<string, unknown>)?.[k], row);
    }
    return row[key as keyof T];
  }, []);

  const handleSort = (columnKey: string) => {
    const column = columns.find((col) => col.key === columnKey);
    if (!column?.sortable) return;

    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === columnKey && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: columnKey, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;

    return [...data].sort((a, b) => {
      const aValue = getValue(a, sortConfig.key);
      const bValue = getValue(b, sortConfig.key);

      // Convert unknown values to comparable strings for sorting
      const aString = String(aValue ?? '');
      const bString = String(bValue ?? '');

      if (aString < bString) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aString > bString) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [data, sortConfig, getValue]);

  const SortIcon = ({ column }: { column: TableColumn<T> }) => {
    if (!column.sortable) return null;
    
    const isActive = sortConfig?.key === column.key;
    const direction = sortConfig?.direction;
    
    return (
      <span className="ml-2 inline-flex flex-col">
        <svg
          className={`w-3 h-3 ${
            isActive && direction === "asc" ? "text-purple-600" : "text-gray-400"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" />
        </svg>
        <svg
          className={`w-3 h-3 -mt-1 ${
            isActive && direction === "desc" ? "text-purple-600" : "text-gray-400"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
        </svg>
      </span>
    );
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${className}`}>
        <div className="animate-pulse">
          <div className="bg-gray-50 px-6 py-4">
            <div className="flex space-x-4">
              {columns.map((_, index) => (
                <div key={index} className="h-4 bg-gray-200 rounded flex-1"></div>
              ))}
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="px-6 py-4">
                <div className="flex space-x-4">
                  {columns.map((_, colIndex) => (
                    <div key={colIndex} className="h-4 bg-gray-100 rounded flex-1"></div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${className}`}>
        <div className="px-6 py-16 text-center">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Data</h3>
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${className}`}>
      <div className="w-full">
        <table className="w-full table-fixed divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className={`px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${
                    column.sortable ? "cursor-pointer hover:bg-gray-200 transition-colors duration-200" : ""
                  }`}
                  style={{ width: column.width }}
                  onClick={() => handleSort(String(column.key))}
                >
                  <div className="flex items-center">
                    {column.label}
                    <SortIcon column={column} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedData.map((row, index) => (
              <tr
                key={getRowKey(row)}
                className={`${
                  hoverable
                    ? "hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
                    : ""
                } ${onRowClick ? "cursor-pointer" : ""}`}
                onClick={() => onRowClick?.(row, index)}
              >
                {columns.map((column) => (
                  <td key={String(column.key)} className="px-4 py-4">
                    <div className="overflow-hidden text-ellipsis">
                      {column.render
                        ? column.render(getValue(row, column.key), row, index)
                        : String(getValue(row, column.key) ?? "")}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;

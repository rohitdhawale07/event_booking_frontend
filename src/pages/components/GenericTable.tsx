import React from "react";
import { Pencil, Trash2 } from "lucide-react"; // Lucide icons for edit/delete

// Export TableColumn so other files can import it
export interface TableColumn<T> {
  label: string;
  accessor: keyof T;
  render?: (row: T) => React.ReactNode;
}

export interface TableOption<T> {
  icon: React.ReactNode;
  label: string;
  onClick: (row: T) => void;
}

interface GenericTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  options?: TableOption<T>[]; // New: option buttons for each row
}

function GenericTable<T extends { [key: string]: any }>({
  columns,
  data,
  options = [],
}: GenericTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg bg-white/90 border border-blue-100">
      <table className="min-w-full text-sm text-gray-700">
        <thead>
          <tr className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
            {columns.map((col) => (
              <th
                key={String(col.accessor)}
                className="px-4 py-3 font-semibold text-left tracking-wide border-b border-blue-200"
              >
                {col.label}
              </th>
            ))}
            {options.length > 0 && (
              <th className="px-3 py-3 font-semibold text-center border-b border-blue-200 w-24">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (options.length > 0 ? 1 : 0)}
                className="text-center p-8 text-gray-400 italic"
              >
                No data available
              </td>
            </tr>
          )}
          {data.map((row, idx) => (
            <tr
              key={idx}
              className="border-b border-blue-50 hover:bg-blue-50/60 transition"
            >
              {columns.map((col) => (
                <td key={String(col.accessor)} className="px-4 py-3">
                  {typeof row[col.accessor] === "string" && col.accessor === "date"
                    ? new Date(row[col.accessor] as string).toLocaleDateString()
                    : String(row[col.accessor])}
                </td>
              ))}
                {options.length > 0 && (
                <td className="px-1 py-3">
                    <div className="flex justify-center items-center gap-3">
                    {options.map((opt, i) => (
                        <button
                        key={i}
                        type="button"
                        className="p-2 rounded-full bg-white shadow hover:bg-blue-100 hover:text-blue-700 transition outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                        title={opt.label}
                        onClick={() => opt.onClick(row)}
                        >
                        {opt.icon}
                        </button>
                    ))}
                    </div>
                </td>
                )}

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GenericTable;
"use client";

// Imports
import {
  Table,
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
} from "@tanstack/react-table";
import { useSelector } from "react-redux";
import { useState } from "react";

// Types
import { EmployeeType, EmployeesType } from "@customTypes/employeeType";
import { StateType } from "@store/index";

/**
 * @name Table
 * @component
 * @description Custom table.
 *
 * @returns
 */
function Table() {
  // Data
  const employees: EmployeesType = useSelector(
    (state: StateType) => state.employees
  );

  // Formatting
  const formatDate = (date: Date | null) => {
    return date !== null && date !== undefined && typeof date === "object"
      ? date.toLocaleDateString("fr-FR")
      : "--/--/----";
  };

  /*
    Table Options
  */
  // Columns
  const columnHelper = createColumnHelper<EmployeeType>();
  const customColumns = [
    columnHelper.accessor((row) => row.firstname, {
      id: "firstname",
      header: () => <span>First Name</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.lastname, {
      id: "lastname",
      header: () => <span>Last Name</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => formatDate(row.startDate), {
      id: "startDate",
      header: () => <span>Start Date</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.department, {
      id: "department",
      header: () => <span>Department</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => formatDate(row.birthdate), {
      id: "birthdate",
      header: () => <span>Date of Birth</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.address.street, {
      id: "street",
      header: () => <span>Street</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.address.city, {
      id: "city",
      header: () => <span>City</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.address.state?.abbreviation, {
      id: "state",
      header: () => <span>State</span>,
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor((row) => row.address.code, {
      id: "code",
      header: () => <span>Zip Code</span>,
      cell: (info) => info.getValue(),
    }),
  ];

  // Table
  const customTable = useReactTable({
    columns: customColumns,
    data: employees,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {customTable.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : (
                    <div>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </div>
                  )}
                </th>
              );
            })}
          </tr>
        ))}
      </thead>

      <tbody>
        {customTable.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;

"use client";

// Imports
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import {
  Table,
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";

// Components
import CustomInput from "../Input";

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
  const [tableData, setTableData] = useState(employees);

  // Formatting
  const formatDate = (date: Date | null) => {
    return !!date && typeof date === "object"
      ? date.toLocaleDateString("fr-FR")
      : "--/--/----";
  };

  /*
    Table Options
  */

  // Sorting Feature
  const [sorting, setSorting] = useState<SortingState>([]);

  // Filtering Feature
  const [userSearchKeywords, setUserSearchKeywords] = useState<string | null>(
    null
  );
  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const userEnteredSearchKeywords = event.target.value;

    // Save or Reset user search values
    if (
      !!userEnteredSearchKeywords &&
      userEnteredSearchKeywords.trim().length > 0
    ) {
      setUserSearchKeywords(userEnteredSearchKeywords.trim().toLowerCase());
    } else {
      // Reset all search-related elements
      setUserSearchKeywords(null);
      event.target.value = "";

      setTableData(employees);
    }
  };
  const searchHandler = () => {
    // Search feature
    if (!!userSearchKeywords && userSearchKeywords.trim().length > 0) {
      const filteredData = employees.filter((employee) => {
        // Check if any field in the employee data matches the user input
        return Object.values(employee).some((value) => {
          if (
            typeof value === "string" &&
            value.toLowerCase().includes(userSearchKeywords)
          ) {
            return true;
          } else if (typeof value === "object" && value !== null) {
            // Check nested objects (like address)
            return Object.values(value).some((nestedValue) => {
              return (
                typeof nestedValue === "string" &&
                nestedValue.toLowerCase().includes(userSearchKeywords)
              );
            });
          }
          return false;
        });
      });

      // Populate the table with filtered data
      setTableData(filteredData);
    } else {
      // Populate the table with the initial data
      setTableData(employees);
    }
  };

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
    data: tableData,
    state: {
      sorting,
    },
    getCoreRowModel: getCoreRowModel(),
    enableSorting: true,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
  });

  return (
    <>
      <CustomInput
        idName={"searchInput"}
        type={"text"}
        placeholder={"Search among all columns..."}
        value={userSearchKeywords ?? ""}
        onChangeHandler={inputChangeHandler}
        onClickHandler={searchHandler}
        stylingInputGroup={"w-auto h-auto flex justify-end items-center mb-4"}
        stylingInput={
          "w-56 font-lg placeholder-opacity-50 shadow border border-block rounded-l-md px-4 py-2"
        }
        hasButton={true}
        stylingButton={
          "w-10 h-10 group flex justify-center items-center bg-primary shadow rounded-r-md hover:text-2xl hover:bg-blue-800"
        }
        iconName={"magnifier"}
        stylingIcon={"text-white"}
      />

      <table>
        <thead>
          {customTable.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder ? null : (
                      <div
                        onClick={header.column.getToggleSortingHandler()}
                        className={
                          header.column.getCanSort() ? "cursor-pointer" : ""
                        }
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {{
                          asc: " 🔼",
                          desc: " 🔽",
                        }[header.column.getIsSorted().toString()] ?? (
                          <span className="text-xs">🔼🔽</span>
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
                    <td key={cell.id} className="text-center">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default Table;

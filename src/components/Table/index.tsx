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
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";

// Components
import CustomInput from "../Input";

// Routing
import routes from "@router/routes";

// Types
import { EmployeeType, EmployeesType } from "@customTypes/employeeType";
import { StateType } from "@store/index";
import Link from "next/link";

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
  // Pagination Feature
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const paginationPageNumberOptions = [10, 20, 30, 40, 50];

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
      pagination,
    },
    getCoreRowModel: getCoreRowModel(),
    enableSorting: true,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  // Redirection
  const pathToRedirect = routes.newEmployee.path;
  const toNewEmployeePage =
    typeof pathToRedirect === "function" ? pathToRedirect() : pathToRedirect;

  return (
    <section
      aria-label="Everything related to the list of current employees."
      className="flex flex-col justify-between px-8"
    >
      {/* Modify the content of the section based on the size of the store state */}
      {employees.length === 0 ? (
        <div
          aria-label="Content displayed when no employees are found or created."
          className="flex flex-col justify-center items-center italic"
        >
          <>
            <p>
              From our knowledge, your company does not have any employees...
            </p>
            <p>But... Please free to add new employees when the time comes !</p>
          </>

          <Link
            href={toNewEmployeePage}
            aria-label="Go to 'New Employee' page to create a new employee"
            className="w-fit text-white bg-primary rounded-lg shadow py-2 px-4 mt-4 hover:text-lg hover:font-bold hover:bg-blue-800"
          >
            Create a New Employee
          </Link>
        </div>
      ) : (
        <>
          <section
            aria-label="Contains a setting to change the number of results to display per page and the global search bar."
            className="flex justify-between items-center"
          >
            <p>
              Show{" "}
              <select
                value={customTable.getState().pagination.pageSize}
                onChange={(e) => {
                  customTable.setPageSize(Number(e.target.value));
                }}
              >
                {paginationPageNumberOptions.map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>{" "}
              results per page
            </p>

            <CustomInput
              idName={"searchInput"}
              type={"text"}
              placeholder={"Search among all columns..."}
              value={userSearchKeywords ?? ""}
              onChangeHandler={inputChangeHandler}
              onClickHandler={searchHandler}
              stylingInputGroup={
                "w-auto h-auto flex justify-end items-center mb-4"
              }
              stylingInput={
                "w-56 font-lg placeholder-opacity-50 shadow-inner border border-block rounded-l-md px-4 py-2"
              }
              hasButton={true}
              stylingButton={
                "w-10 h-10 group flex justify-center items-center bg-primary rounded-r-md hover:text-lg hover:font-bold hover:bg-blue-800"
              }
              iconName={"magnifier"}
              stylingIcon={"text-white"}
            />
          </section>

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

          <section
            aria-label="Pagination action buttons & indicators."
            className="flex justify-between items-center mt-2 mb-8"
          >
            <div
              aria-label="Action buttons to move back and forth across the table pages."
              className="flex gap-4"
            >
              <button
                onClick={() => customTable.firstPage()}
                disabled={!customTable.getCanPreviousPage()}
                className="border rounded p-1 hover:text-white hover:font-bold hover:bg-blue-800 disabled:invisible"
              >
                {"<<"}
              </button>
              <button
                onClick={() => customTable.previousPage()}
                disabled={!customTable.getCanPreviousPage()}
                className="border rounded p-1 hover:text-white hover:font-bold hover:bg-blue-800 disabled:invisible"
              >
                {"<"}
              </button>
              <button
                onClick={() => customTable.nextPage()}
                disabled={!customTable.getCanNextPage()}
                className="border rounded p-1 hover:text-white hover:font-bold hover:bg-blue-800 disabled:invisible"
              >
                {">"}
              </button>
              <button
                onClick={() => customTable.lastPage()}
                disabled={!customTable.getCanNextPage()}
                className="border rounded p-1 hover:text-white hover:font-bold hover:bg-blue-800 disabled:invisible"
              >
                {">>"}
              </button>
            </div>

            {customTable.getPageCount() > 1 && (
              <>
                <div className="flex items-center gap-1">
                  <p>
                    Page{" "}
                    <strong>
                      {customTable.getState().pagination.pageIndex + 1} of{" "}
                      {customTable.getPageCount().toString()}
                    </strong>
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <p>Go to page: </p>
                  <CustomInput
                    idName={"pageNumber"}
                    type={"number"}
                    value={customTable.getState().pagination.pageIndex + 1}
                    onChangeHandler={(e) => {
                      const page = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;

                      customTable.setPageIndex(page);
                    }}
                    stylingInput="w-12 border shadow rounded p-1"
                    hasButton={false}
                  />
                </div>
              </>
            )}
          </section>
        </>
      )}
    </section>
  );
}

export default Table;

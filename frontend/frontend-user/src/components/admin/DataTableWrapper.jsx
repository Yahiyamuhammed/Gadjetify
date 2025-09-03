import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table"; // your reusable DataTable

const DataTableWrapper = ({
  title,
  data,
  columns,
  onAdd,
  filterFn,
  addButton = "",
  dropdownFilter,
  pagination,
  onPageChange,
}) => {
  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>

        <div className="flex gap-2 items-center">
          <Input
            placeholder="Search..."
            onChange={(e) => filterFn(e.target.value)}
            className="max-w-xs"
          />
          {dropdownFilter && (
            <select
              className="px-1 py-2 border border-gray-300 rounded-md dark:bg-darkBackground"
              value={dropdownFilter.value}
              onChange={(e) => dropdownFilter.onChange(e.target.value)}
            >
              {dropdownFilter.options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          )}
          {addButton && <Button onClick={onAdd}>{addButton}</Button>}
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data}
        pagination={pagination}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default DataTableWrapper;

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
          {addButton && <Button onClick={onAdd}>{addButton}</Button>}
        </div>
      </div>

      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default DataTableWrapper;

import { DataTable } from "@/components/ui/data-table";

const DataTableWrapper = ({ columns, data, title }) => {
  return (
    <div className="p-4">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default DataTableWrapper;

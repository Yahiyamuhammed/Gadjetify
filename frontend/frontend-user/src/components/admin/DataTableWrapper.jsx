import { DataTable } from "../ui/data-table";

const DataTableWrapper = ({ columns, data, title }) => {
  console.log("this is inside the table", columns, data, title);
  return (
    <div className="p-4">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      <DataTable key={title} columns={columns} data={data} />
    </div>
  );
};

export default DataTableWrapper;

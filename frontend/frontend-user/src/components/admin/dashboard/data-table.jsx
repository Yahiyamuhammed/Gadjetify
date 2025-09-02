import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { IconLayoutColumns, IconChevronDown, IconPlus } from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import { useFetchTopProducts, useFetchTopBrand } from "@/hooks/queries/useAdminDashboardQueries";

import { brandColumns, productColumns } from "./tableColumns";
import { GenericTable } from "../common/GenericTable";
import { useState } from "react";


export function DataTable() {
  const { data: products = [] } = useFetchTopProducts();
  const { data: brands = [] } = useFetchTopBrand();
  const [tabValue, setTabValue] = useState("Best Selling Products")

  const productDataIds = React.useMemo(
    () => products.map((row) => `${row.product}-${row.variant}-${row.brand}`),
    [products]
  );
  const brandDataIds = React.useMemo(
    () => brands.map((row) => `${row.brand}`),
    [brands]
  );

  const productTable = useReactTable({
    data: products,
    columns: productColumns,
    getRowId: (row) => `${row.product}-${row.variant}-${row.brand}`,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const brandTable = useReactTable({
    data: brands,
    columns: brandColumns,
    getRowId: (row) => row.brand,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <Tabs defaultValue="Best Selling Products" value={tabValue} onValueChange={setTabValue} className="w-full flex-col gap-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <Label htmlFor="view-selector" className="sr-only">View</Label>
        <Select value={tabValue} onValueChange={setTabValue} defaultValue="Best Selling Products">
          <SelectTrigger id="view-selector" className="flex w-fit" size="sm">
            <SelectValue placeholder="Select a view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Best Selling Products">Best Selling Products</SelectItem>
            <SelectItem value="Top Brands">Top Brands</SelectItem>
          </SelectContent>
        </Select>

        <TabsList className="hidden @4xl/main:flex">
          <TabsTrigger value="Best Selling Products">Best Selling Products</TabsTrigger>
          <TabsTrigger value="Top Brands">Top Brands</TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">Customize Columns</span>
                <span className="lg:hidden">Columns</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {productTable
                .getAllColumns()
                .filter((col) => col.getCanHide())
                .map((col) => (
                  <DropdownMenuCheckboxItem
                    key={col.id}
                    checked={col.getIsVisible()}
                    onCheckedChange={(value) => col.toggleVisibility(!!value)}
                    className="capitalize"
                  >
                    {col.id}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Add Section</span>
          </Button>
        </div>
      </div>

      <TabsContent value="Best Selling Products" className="px-4 lg:px-6">
        <GenericTable table={productTable} columns={productColumns} dataIds={productDataIds} enableDnD />
      </TabsContent>

      <TabsContent value="Top Brands" className="px-4 lg:px-6">
        <GenericTable table={brandTable} columns={brandColumns} dataIds={brandDataIds} />
      </TabsContent>
    </Tabs>
  );
}

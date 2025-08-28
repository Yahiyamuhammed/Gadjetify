import { useState } from "react";
// import { useSalesReport } from "@/mutations/useSalesReport";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Loader2, Download } from "lucide-react";
import { useSalesReport } from "@/hooks/queries/useReportQueries";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
// import "jspdf-autotable";
import autoTable from "jspdf-autotable";


export default function SalesReportPage() {
  const [period, setPeriod] = useState("day");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useSalesReport({
    period,
    startDate,
    endDate,
    page,
    limit: 10,
  });

  const summary = data?.summary || {};
  const orders = data?.orders || [];

  // Excel download
  const handleDownloadExcel = () => {
    if (!orders.length) return;

    const worksheet = XLSX.utils.json_to_sheet(
      orders.map((order) => ({
        OrderID: order._id,
        Date: new Date(order.createdAt).toLocaleDateString(),
        Status: order.status,
        FinalTotal: order.finalTotal,
        Discount: order.summary?.totalDiscount || 0,
        CouponDiscount: order.summary?.customDiscount || 0,
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "SalesReport");
    XLSX.writeFile(workbook, "sales_report.xlsx");
  };

  // PDF download
  const handleDownloadPDF = () => {
  if (!orders.length) return;

  const doc = new jsPDF();
  doc.text("Sales Report", 14, 15);

  const tableData = orders.map((order) => [
    order._id,
    new Date(order.createdAt).toLocaleDateString(),
    order.status,
    "₹" + order.finalTotal,
    "₹" + (order.summary?.totalDiscount || 0),
    "₹" + (order.summary?.customDiscount || 0),
  ]);

  autoTable(doc, {
    head: [["Order ID", "Date", "Status", "Final Total", "Discount", "Coupon Discount"]],
    body: tableData,
    startY: 25,
  });

  doc.save("sales_report.pdf");
};

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Sales Report</h1>
        {/* <Button variant="outline" className="flex items-center gap-2">
          <Download className="w-4 h-4" />
          Download Report
        </Button> */}
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownloadExcel}>
            Download Excel
          </Button>
          <Button variant="outline" onClick={handleDownloadPDF}>
            Download PDF
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-4 gap-4 items-end">
          {/* Period Selector */}
          <Select onValueChange={(val) => setPeriod(val)} defaultValue={period}>
            <SelectTrigger>
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Daily</SelectItem>
              <SelectItem value="week">Weekly</SelectItem>
              <SelectItem value="month">Monthly</SelectItem>
              <SelectItem value="year">Yearly</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>

          {/* Show only if Custom */}
          {period === "custom" && (
            <>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <Button
                variant="outline"
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                }}
              >
                Reset Date
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Orders</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {isLoading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              summary.totalOrders
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Sales Amount</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {isLoading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              `₹${summary.totalAmount || 0}`
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Discount</CardTitle>
          </CardHeader>
          <CardContent className="text-2xl font-semibold">
            {isLoading ? (
              <Loader2 className="animate-spin w-5 h-5" />
            ) : (
              `₹${summary.totalDiscount || 0}`
            )}
          </CardContent>
        </Card>
      </div>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-6">
              <Loader2 className="animate-spin w-6 h-6" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Final Total</TableHead>
                  <TableHead>Discount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>₹{order.finalTotal}</TableCell>
                      <TableCell>
                        ₹{order.summary?.totalDiscount || 0}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center py-4 text-muted-foreground"
                    >
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </Button>
        <Button variant="outline" onClick={() => setPage((p) => p + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
}

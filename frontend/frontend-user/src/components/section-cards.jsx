import { SummaryCard } from "./admin/dashboard/SummaryCard";

export function SectionCards({ summary, loading }) {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <SummaryCard
        title="Total Revenue"
        data={summary?.totalRevenue}
        footerNote="Revenue for the last 6 months"
        loading={loading}
      />
      <SummaryCard
        title="Total Orders"
        data={summary?.totalOrders}
        footerNote="Acquisition needs attention"
        loading={loading}
      />
      <SummaryCard
        title="Active Customers"
        data={summary?.activeCustomers}
        footerNote="Engagement exceed targets"
        loading={loading}
      />
      <SummaryCard
        title="Refunds/Returns"
        data={summary?.refunds}
        footerNote="Meets growth projections"
        loading={loading}
      />
    </div>
  );
}

import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards({ summary }) {
  console.log(summary);
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {summary?.totalRevenue?.value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {summary?.totalRevenue?.trend === "up" ? (
                <IconTrendingUp className="mr-1 size-4" />
              ) : (
                <IconTrendingDown className="mr-1 size-4" />
              )}
              {summary?.totalRevenue?.change}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {summary?.totalRevenue?.description}
            {summary?.totalRevenue?.trend === "up" ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Orders</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {summary?.totalOrders?.value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {summary?.totalOrders?.trend === "up" ? (
                <IconTrendingUp className="mr-1 size-4" />
              ) : (
                <IconTrendingDown className="mr-1 size-4" />
              )}
              {summary?.totalOrders?.change}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {summary?.totalOrders?.description}
            {summary?.totalOrders?.trend === "up" ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">
            Acquisition needs attention
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Active Customers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {summary?.activeCustomers?.value}
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {summary?.activeCustomers?.trend === "up" ? (
                <IconTrendingUp className="mr-1 size-4" />
              ) : (
                <IconTrendingDown className="mr-1 size-4" />
              )}
              {summary?.activeCustomers?.change}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {summary?.activeCustomers?.description}

            {summary?.activeCustomers?.trend === "up" ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}
          </div>
          <div className="text-muted-foreground">Engagement exceed targets</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Refunds/Returns</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {summary?.refunds?.value}%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              {summary?.refunds?.trend === "up" ? (
                <IconTrendingUp className="mr-1 size-4" />
              ) : (
                <IconTrendingDown className="mr-1 size-4" />
              )}
              {summary?.refunds?.change}
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            {summary?.refunds?.description}
            {summary?.refunds?.trend === "up" ? (
              <IconTrendingUp className="size-4" />
            ) : (
              <IconTrendingDown className="size-4" />
            )}{" "}
          </div>
          <div className="text-muted-foreground">Meets growth projections</div>
        </CardFooter>
      </Card>
    </div>
  );
}

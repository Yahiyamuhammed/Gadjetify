import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/shadcn-io/spinner";

export function SummaryCard({ title, data, footerNote, loading }) {
  const TrendIcon = data?.trend === "up" ? IconTrendingUp : IconTrendingDown;

  if (loading) {
    return (
      <Card className="@container/card flex items-center justify-center">
        <Spinner />
      </Card>
    );
  }

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
          {data?.value}
          {title === "Refunds/Returns" && "%"}
        </CardTitle>
        <CardAction>
          <Badge variant="outline">
            <TrendIcon className="mr-1 size-4" />
            {data?.change}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-1.5 text-sm">
        <div className="line-clamp-1 flex gap-2 font-medium">
          {data?.description} <TrendIcon className="size-4" />
        </div>
        <div className="text-muted-foreground">{footerNote}</div>
      </CardFooter>
    </Card>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function OrderSummary() {
  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <h2 className="text-lg font-semibold">Order Summary</h2>
        {[1, 2].map((item) => (
          <div key={item} className="flex justify-between items-center border-b pb-3">
            <div>
              <div className="font-medium">Samsung S22 (8GB RAM, 128GB)</div>
              <div className="text-sm text-gray-500">Qty: 1</div>
            </div>
            <div className="font-semibold">₹59,999</div>
          </div>
        ))}
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>₹1,19,998</span>
        </div>
        <Button className="w-full">Place Order</Button>
      </CardContent>
    </Card>
  );
}
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function PaymentMethod({value, onChange }) {
  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
        <RadioGroup defaultValue="Online Payment" value={value} onValueChange={onChange} className="space-y-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="od">Cash on Delivery</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Online Payment" id="Online Payment" />
            <Label htmlFor="card">Online Payment</Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
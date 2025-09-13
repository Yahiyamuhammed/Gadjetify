import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useFetchWalletBalance } from "@/hooks/queries/useWalletQueries";


export default function PaymentMethod({ value, onChange, subtotal }) {
  const {data, isLoading} = useFetchWalletBalance()
  const walletBalance = data?.balance || 0;
  const isCODDisabled = subtotal > 1000;
  const isWalletDisabled = walletBalance < subtotal;

  return (
    <Card className="mt-4">
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-4">Payment Method</h2>
        <RadioGroup value={value} onValueChange={onChange} className="space-y-4">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="cod" id="cod" disabled={isCODDisabled} />
            <Label htmlFor="cod" className={isCODDisabled ? "text-gray-400" : ""}>
              Cash on Delivery {isCODDisabled && "(Not available for orders above ₹1000)"}
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Online Payment" id="onlinePayment" />
            <Label htmlFor="onlinePayment">Online Payment</Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem value="wallet" id="wallet" disabled={isWalletDisabled} />
            <Label htmlFor="wallet" className={isWalletDisabled ? "text-gray-400" : ""}>
              Wallet ({isLoading ? "Loading..." : `₹${walletBalance}`}){" "}
              {isWalletDisabled && "- Not enough balance"}
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}

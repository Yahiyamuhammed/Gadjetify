import AddressList from "@/components/user/checkout/AddressList";
import OrderSummary from "@/components/user/checkout/OrderSummary";
import PaymentMethod from "@/components/user/checkout/PaymentMethod";

export default function CheckoutPage() {
  return (
    <div className="checkout-page p-6 md:p-10 grid md:grid-cols-2 gap-10">
      <div>
        <AddressList />
        {/* <AddressForm /> */}
        <PaymentMethod />
      </div>
      <div>
        <OrderSummary />
      </div>
    </div>
  );
}
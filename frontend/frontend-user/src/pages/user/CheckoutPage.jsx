import AddressList from "@/components/user/checkout/AddressList";
import OrderSummary from "@/components/user/checkout/OrderSummary";
import PaymentMethod from "@/components/user/checkout/PaymentMethod";
import { getAddresses } from "@/hooks/queries/useAddressQueries";
import { useState } from "react";

export default function CheckoutPage() {

    const {data:addresses}=getAddresses()
    

  const [selectedAddressId, setSelectedAddressId] = useState(null);

  const handleAddAddress = () => {
    // Show modal or navigate to AddAddressPage
  };

  const handleEditAddress = (addressId) => {
    console.log(addressId)
    // Open modal with address data or navigate to edit page
};

const handleSelectAddress = (addressId) => {
      console.log(addressId)
    setSelectedAddressId(addressId);
  };

  return (
    <div className="checkout-page p-6 md:p-10 grid md:grid-cols-2 gap-10">
      <div>
        <AddressList
          addresses={addresses}
          selectedAddressId={selectedAddressId}
          onAdd={handleAddAddress}
          onEdit={handleEditAddress}
          onSelect={handleSelectAddress}
        />
        {/* <AddressForm /> */}
        <PaymentMethod />
      </div>
      <div>
        <OrderSummary />
      </div>
    </div>
  );
}

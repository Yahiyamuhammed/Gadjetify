import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export default function AddressList({
  addresses = [],
  onSelect = () => {},
  onAdd = () => {},
  onEdit = (address) => {},
}) {
  const primaryAddress = addresses.find((addr) => addr.isPrimary);
  const [selectedAddressId, setSelectedAddressId] = useState(
    primaryAddress?._id
  );

  useEffect(() => {
    // If addresses change, re-set primary
    if (primaryAddress?._id) {
      setSelectedAddressId(primaryAddress._id);
    }
  }, [primaryAddress?._id]);


  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Saved Addresses</h2>
        <Button size="sm" onClick={onAdd}>
          Add Address
        </Button>
      </div>

      <RadioGroup
        value={selectedAddressId}
        onValueChange={(val) => {
          onSelect(val)
          setSelectedAddressId(val)}}
        className="space-y-2 max-h-64 overflow-y-auto pr-1"
      >
        {addresses.map((address) => (
          <Card
            key={address._id}
            className="border border-gray-200 group relative"
          >
            <CardContent className="p-4">
              <label className="flex items-start gap-4 cursor-pointer">
                <RadioGroupItem value={address._id} className="mt-1" />
                <div className="space-y-1 flex-1">
                  <div className="font-medium flex justify-between">
                    <span>{address.name}</span>
                    <span className="capitalize text-xs text-gray-500">
                      {address.addressType}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 leading-snug">
                    {address.address}, {address.locality}, {address.district},{" "}
                    {address.state} - {address.pincode}
                  </div>
                  <div className="text-sm text-gray-500">
                    Phone: {address.phone}
                    {address.alternatePhone &&
                      ` | Alt: ${address.alternatePhone}`}
                  </div>
                  {address.landmark && (
                    <div className="text-sm text-gray-500">
                      Landmark: {address.landmark}
                    </div>
                  )}
                  {address.isPrimary && (
                    <div className="text-xs text-green-600 font-medium">
                      Primary Address
                    </div>
                  )}
                </div>
              </label>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => onEdit(address)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </RadioGroup>
    </div>
  );
}

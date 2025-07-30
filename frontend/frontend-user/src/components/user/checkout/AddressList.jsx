import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export default function AddressList({
  addresses = [],
  selectedAddressId,
  onSelect = () => {},
  onAdd = () => {},
  onEdit = (address) => {},
}) {
  addresses = [
    {
      _id: "1a2b3c4d5e",
      name: "Home",
      street: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
    },
    {
      _id: "6f7g8h9i0j",
      name: "Office",
      street: "456 Business Rd",
      city: "Pune",
      state: "Maharashtra",
      pincode: "411001",
    },
    {
      _id: "k1l2m3n4o5",
      name: "Parents' Home",
      street: "789 Old St",
      city: "Nagpur",
      state: "Maharashtra",
      pincode: "440001",
    },
  ];

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
        onValueChange={(val) => onSelect(val)}
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
                  </div>
                  <div className="text-sm text-gray-500">
                    {address.street}, {address.city}, {address.state} -{" "}
                    {address.pincode}
                  </div>
                  {address._id === selectedAddressId && (
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

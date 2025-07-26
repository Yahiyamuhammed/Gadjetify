import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const mockAddresses = [
  {
    id: 1,
    name: "John Doe",
    phone: "1234567890",
    address: "123 Main St, City, State, 123456",
    isPrimary: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "9876543210",
    address: "456 Another Rd, City, State, 654321",
    isPrimary: false,
  },
];

export default function AddressTab() {
  const [addresses, setAddresses] = useState(mockAddresses);

  const handleDelete = (id) => {
    setAddresses(addresses.filter((a) => a.id !== id));
  };

  const handleSetPrimary = (id) => {
    setAddresses(addresses.map((a) => ({ ...a, isPrimary: a.id === id })));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Saved Addresses</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Address</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Address</DialogTitle>
            </DialogHeader>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Full Name" />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="Phone Number" />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Address" />
              </div>
              <Button type="submit" className="w-full">Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Separator />

      <div className="grid md:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <Card key={addr.id} className="relative">
            <CardContent className="pt-4 pb-6">
              <div className="space-y-1">
                <p className="font-medium">{addr.name}</p>
                <p className="text-sm text-muted-foreground">{addr.phone}</p>
                <p className="text-sm text-muted-foreground">{addr.address}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(addr.id)}>
                    Delete
                  </Button>
                </div>
                {!addr.isPrimary && (
                  <Button size="sm" onClick={() => handleSetPrimary(addr.id)}>Set as Primary</Button>
                )}
                {addr.isPrimary && (
                  <span className="text-sm font-medium text-green-600">Primary</span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

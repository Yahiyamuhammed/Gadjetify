import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AddressList() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-2">Saved Addresses</h2>
      {[1, 2].map((item) => (
        <Card key={item} className="border border-gray-200">
          <CardContent className="p-4 space-y-1">
            <div className="font-medium">John Doe</div>
            <div className="text-sm text-gray-500">123 Main Street, City, State - 000000</div>
            <div className="flex gap-4 mt-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="outline" size="sm">Delete</Button>
              <Button size="sm">Set as Primary</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
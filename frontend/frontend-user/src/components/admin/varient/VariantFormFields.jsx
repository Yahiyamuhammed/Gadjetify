import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const VariantFormFields = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    const newValue = type === "number" ? parseInt(value) || null : value;

    setFormData({ ...formData, [name]: newValue });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Product ID</Label>
        <Input name="productId" value={formData.productId} onChange={handleChange} />
      </div>
      <div>
        <Label>RAM (in GB)</Label>
        <Input
          type="number"
          name="ram"
          value={formData.ram}
          onChange={handleChange}
          placeholder="Enter RAM size (e.g. 8)"
        />
      </div>
      <div>
        <Label>Storage (in GB)</Label>
        <Input
          type="number"
          name="storage"
          value={formData.storage}
          onChange={handleChange}
          placeholder="Enter storage size (e.g. 128)"
        />
      </div>
      <div>
        <Label>Price</Label>
        <Input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label>Stock</Label>
        <Input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default VariantFormFields;

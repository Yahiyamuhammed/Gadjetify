import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const VariantFormFields = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Product ID</Label>
        <Input name="productId" value={formData.productId} onChange={handleChange} />
      </div>
      <div>
        <Label>RAM</Label>
        <Input name="ram" value={formData.ram} onChange={handleChange} />
      </div>
      <div>
        <Label>Storage</Label>
        <Input name="storage" value={formData.storage} onChange={handleChange} />
      </div>
      <div>
        <Label>Price</Label>
        <Input type="number" name="price" value={formData.price} onChange={handleChange} />
      </div>
      <div>
        <Label>Stock</Label>
        <Input type="number" name="stock" value={formData.stock} onChange={handleChange} />
      </div>
    </div>
  );
};

export default VariantFormFields;

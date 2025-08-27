import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CouponFormFields = ({ formData, setFormData, errors }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label>Coupon Code</Label>
        <Input name="code" value={formData.code} onChange={handleChange} />
        {errors.code && <p className="text-red-500 text-sm">{errors.code}</p>}
      </div>
      <div>
        <Label>Discount Type</Label>
        <select
          name="discountType"
          value={formData.discountType}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option value="percentage">Percentage</option>
          <option value="fixed">Fixed</option>
        </select>
        {errors.discountType && <p className="text-red-500 text-sm">{errors.discountType}</p>}
      </div>
      <div>
        <Label>Discount Value</Label>
        <Input type="number" name="discountValue" value={formData.discountValue} onChange={handleChange} />
        {errors.discountValue && <p className="text-red-500 text-sm">{errors.discountValue}</p>}
      </div>
      <div>
        <Label>Minimum Purchase</Label>
        <Input type="number" name="minPurchase" value={formData.minPurchase} onChange={handleChange} />
      </div>
      <div>
        <Label>Expiry Date</Label>
        <Input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
        {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
      </div>
    </div>
  );
};

export default CouponFormFields;

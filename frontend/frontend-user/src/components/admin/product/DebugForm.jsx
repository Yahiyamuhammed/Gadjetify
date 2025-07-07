import React, { useState } from "react";

// Simple debug form to test if the issue is with your Form component
const DebugForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.price || formData.price <= 0) {
      newErrors.price = 'Valid price is required';
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🔥 Form submit handler called");
    console.log("Form data:", formData);
    
    if (!validateForm()) {
      console.log("❌ Validation failed:", errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      console.log("🚀 Calling onSubmit with:", formData);
      await onSubmit(formData);
      console.log("✅ onSubmit completed successfully");
      
      // Reset form
      setFormData({ name: '', price: '', category: '' });
      onClose();
      
    } catch (error) {
      console.error("❌ onSubmit failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleButtonClick = (e) => {
    console.log("🎯 Button clicked", e.type);
    // Don't prevent default here - let the form handle it
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Debug Form</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter product name"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter price"
            min="0"
            step="0.01"
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-400"
          >
            <option value="">Select category</option>
            <option value="c1">Smartphones</option>
            <option value="c2">Laptops</option>
            <option value="c3">Accessories</option>
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            onClick={handleButtonClick}
            disabled={isSubmitting}
            className="flex-1 bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
          >
            {isSubmitting ? 'Adding...' : 'Add Product'}
          </button>
          
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
      
      {/* Debug Info */}
      <div className="mt-4 p-2 bg-gray-100 rounded text-xs">
        <p><strong>Debug Info:</strong></p>
        <p>Submitting: {isSubmitting.toString()}</p>
        <p>Form Data: {JSON.stringify(formData)}</p>
        <p>Errors: {JSON.stringify(errors)}</p>
      </div>
    </div>
  );
};

export default DebugForm;
import React, { useState, useEffect } from "react";
import Form from "@/components/common/Form";
import { getProductFields } from "../product/productFields.js";
import { productValidation } from "@/utils/validation/productSchema";
import { useFetchBrands } from "@/hooks/queries/useBrandQueries";
import ImageCropperModal from "./ImageCropperModal";
import toast from "react-hot-toast";

const ProductAddForm = ({
  isModalFormOpen,
  onClose,
  onSubmit,
  serverError,
  initialValues,
  mode = "add",
}) => {
  const [rawImages, setRawImages] = useState([]);
  const [croppedImages, setCroppedImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [imagesToDelete, setImagesToDelete] = useState([]);
  const backendUrl = "http://localhost:5000";

  // Reset all image states when modal closes or mode changes
  useEffect(() => {
    if (!isModalFormOpen) {
      setCroppedImages([]);
      setImagesToDelete([]);
      setCurrentImage(null);
    }
  }, [isModalFormOpen]);

  useEffect(() => {
    if (mode === "edit" && initialValues?.images) {
      setExistingImages(initialValues.images);
    }
  }, [initialValues, mode]);

  const transformedInitialValues = {
    ...initialValues,
    brand: initialValues?.brand?._id || initialValues?.brand || "",
  };

  const { data: brandData = [] } = useFetchBrands({ search: "", limit: "" });
  const brands = (brandData?.brands || []).filter((b) => !b.isDeleted);
  const categoryOptions = brands.map((brands) => ({
    label: brands.name,
    value: brands._id,
  }));

  if (!isModalFormOpen) return null;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setCurrentImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (blob) => {
    setCroppedImages((prev) => [...prev, blob]);
    setCurrentImage(null);
  };

  const handleDeleteExistingImage = (index) => {
    const imageToDelete = existingImages[index];
    // setExistingImages(existingImages.filter((_, i) => i !== index));
    setImagesToDelete([...imagesToDelete, imageToDelete]);
  };

  const handleFinalSubmit = async (formData) => {
    // Calculate remaining existing images (not marked for deletion)
    const remainingExistingImages = existingImages.filter(
      (img) => !imagesToDelete.includes(img)
    );

    const totalImages = remainingExistingImages.length + croppedImages.length;

    if (isBelowMinimum) {
      return toast.error("Minimum 3 images required");
    }

    const submission = new FormData();

    // Append regular form data
    for (let key in formData) {
      submission.append(key, formData[key]);
    }

    // Append new cropped images
    croppedImages.forEach((img) => submission.append("images", img));

    // Append images to delete (for edit mode)
    if (mode === "edit" && imagesToDelete.length > 0) {
      submission.append("imagesToDelete", JSON.stringify(imagesToDelete));
    }

    onSubmit(submission);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const productFields = getProductFields(categoryOptions);

  const totalImages =
    existingImages.length - imagesToDelete.length + croppedImages.length;
  const isBelowMinimum = totalImages < 3;

  return (
    <>
      {currentImage && (
        <ImageCropperModal
          image={currentImage}
          onComplete={handleCropComplete}
          onClose={() => setCurrentImage(null)}
        />
      )}

      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-sm backdrop-saturate-150"
        onClick={handleOverlayClick}
      >
        <div
          className="p-6 w-full max-w-lg rounded-lg shadow-lg h-full overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image upload and display section */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Images
            </label>

            {/* Existing images display (edit mode) */}
            {mode === "edit" && existingImages.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium mb-2">Current Images</h4>
                <div className="flex flex-wrap gap-2">
                  {existingImages.map((img, index) => {
                    // Skip if this image is marked for deletion
                    if (imagesToDelete.includes(img)) return null;

                    return (
                      <div key={index} className="relative">
                        <img
                          src={`${backendUrl}/products/${img}`}
                          alt={`Product ${index + 1}`}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteExistingImage(index)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {/* New image upload */}
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {mode === "edit"
                  ? "Add More Images"
                  : "Upload Product Images (Min 3)"}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
                multiple={mode === "add"}
              />
            </div>

            {/* Cropped images preview */}
            {croppedImages.length > 0 && (
              <div className="mt-2">
                <h4 className="text-sm font-medium mb-1">New Images to Add</h4>
                <div className="flex flex-wrap gap-2">
                  {croppedImages.map((img, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(img)}
                      alt={`New ${index + 1}`}
                      className="w-20 h-20 object-cover rounded"
                    />
                  ))}
                </div>
              </div>
            )}

            <p className="text-xs text-gray-500 mt-1">
              Total images after changes: {totalImages}
              {mode === "add" && " (Minimum 3 required)"}
              {/* {totalImages < 3 && toast.error("Minimum 3 images required")} */}
            </p>
          </div>

          <Form
            fields={productFields}
            title={mode === "edit" ? "Edit Product" : "Add Product"}
            buttonText={mode === "edit" ? "Update Product" : "Add Product"}
            onSubmit={mode === "edit" ? handleFinalSubmit : handleFinalSubmit}
            validationRules={productValidation}
            serverError={serverError}
            initialValues={transformedInitialValues}
          />
        </div>
      </div>
    </>
  );
};

export default ProductAddForm;

import React, { useState, useEffect } from "react";
import Form from "@/components/common/Form";
import { getProductFields } from "../product/productFields.js";
import { productValidation } from "@/utils/validation/productSchema";
import { useFetchBrands } from "@/hooks/queries/useBrandQueries";
import ImageCropperModal from "./ImageCropperModal";
import toast from "react-hot-toast";
import { FiX, FiPlus, FiTrash2 } from "react-icons/fi";

const MIN_IMAGES = 3;

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
  const [isDragging, setIsDragging] = useState(false);

  const max_image = mode === "edit" ? 5 : 3;

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
    } else setExistingImages("");
  }, [initialValues, mode]);

  const transformedInitialValues = {
    ...initialValues,
    brand: initialValues?.brand?._id || initialValues?.brand || "",
  };

  const { data: brandData = [] } = useFetchBrands({ search: "", limit: "" });
  const brands = (brandData?.brands || []).filter((b) => !b.isDeleted);
  const categoryOptions = brands.map((brand) => ({
    label: brand.name,
    value: brand._id,
  }));

  if (!isModalFormOpen) return null;

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
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
    setImagesToDelete([...imagesToDelete, imageToDelete]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      const reader = new FileReader();
      reader.onload = () => setCurrentImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFinalSubmit = async (formData) => {
    const remainingExistingImages = existingImages.filter(
      (img) => !imagesToDelete.includes(img)
    );

    const totalImages = remainingExistingImages.length + croppedImages.length;

    if (totalImages < MIN_IMAGES) {
      return toast.error(`Minimum ${MIN_IMAGES} images required`);
    }

    const submission = new FormData();

    for (let key in formData) {
      submission.append(key, formData[key]);
    }

    croppedImages.forEach((img) => submission.append("images", img));

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

  const isBelowMinimum = totalImages < MIN_IMAGES;

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
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/30 backdrop-blur-sm"
        onClick={handleOverlayClick}
      >
        <div
          className="p-6 w-full max-w-2xl rounded-xl shadow-2xl max-h-[90vh] overflow-auto bg-white"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">
              {mode === "edit" ? "Edit Product" : "Add New Product"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-full hover:bg-gray-100"
              aria-label="Close modal"
            >
              <FiX size={24} />
            </button>
          </div>

          {/* Image Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <label className="block text-lg font-semibold text-gray-800">
                Product Images
              </label>
              <span
                className={`text-sm font-medium ${
                  isBelowMinimum ? "text-red-500" : "text-green-600"
                }`}
              >
                {totalImages}/{max_image} images
              </span>
            </div>

            {/* Existing Images */}
            {mode === "edit" && existingImages.length > 0 && (
              <div className="mb-6">
                <h4 className="text-md font-medium mb-3 text-gray-700">
                  Current Images
                </h4>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                  {existingImages.map((img, index) => {
                    if (imagesToDelete.includes(img)) return null;
                    return (
                      <div key={index} className="relative group">
                        <img
                          src={img.url}
                          alt={`Product ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border border-gray-200 shadow-sm"
                        />
                        <button
                          type="button"
                          onClick={() => handleDeleteExistingImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-600"
                          aria-label="Delete image"
                        >
                          <FiTrash2 size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Image Upload Area */}
            <div
              className={`border-2 border-dashed rounded-xl p-6 text-center mb-4 transition-all ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400 bg-gray-50"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <FiPlus className="text-gray-400 text-2xl" />
                </div>
                <div>
                  <p className="font-medium text-gray-700">
                    Drag & drop images here
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    or click to browse files
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                  multiple={mode === "add"}
                />
                <label
                  htmlFor="image-upload"
                  className={`mt-2 px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 transition-colors shadow-sm 
  ${
    totalImages >= max_image
      ? "opacity-50 cursor-not-allowed "
      : "hover:bg-gray-50 cursor-pointer"
  }`}
                >
                  Select Images
                </label>
                <p className="text-xs text-gray-500 mt-2">
                  Minimum {MIN_IMAGES} images required • JPG, PNG up to 5MB
                </p>
              </div>
            </div>

            {/* New Images Preview */}
            {croppedImages.length > 0 && (
              <div className="mt-4">
                <h4 className="text-md font-medium mb-3 text-gray-700">
                  Images to be Added
                </h4>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                  {croppedImages.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(img)}
                        alt={`New ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border border-gray-200 shadow-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Form */}
          <div className="border-t border-gray-200 pt-6">
            <Form
              fields={productFields}
              title=""
              buttonText={mode === "edit" ? "Update Product" : "Create Product"}
              onSubmit={handleFinalSubmit}
              validationRules={productValidation}
              serverError={serverError}
              initialValues={transformedInitialValues}
              buttonClass="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-md"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductAddForm;

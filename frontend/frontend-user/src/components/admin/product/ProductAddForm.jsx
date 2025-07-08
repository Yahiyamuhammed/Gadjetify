import React, { useState } from "react";
// import Form from ".../common/Form";
import Form from "@/components/common/Form";
import { getProductFields } from "../product/productFields.js";
// import { productValidation } from "../../validationSchemas.js";
import { productValidation } from "@/utils/validation/productSchema";
import { useFetchBrands } from "@/hooks/queries/useBrandQueries";
import ImageCropperModal from "./ImageCropperModal";

// import { useGetAllCategoryQuery } from "../../redux/slices/categoryApiSlices.js";

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

  const transformedInitialValues = {
    ...initialValues,
    brand: initialValues?.brand?._id || initialValues?.brand || "",
  };

  const {
    data: brandData = [],
    isLoading,
    isError,
  } = useFetchBrands({ search: "",limit:'' });

  console.log('this is the brands',brandData)
  // const brands = brandData.brands
  // .filter((b) => !b.isDeleted)
  const brands = (brandData?.brands || []).filter((b) => !b.isDeleted);

  console.log('this is the filtered brand',brands )

  if (!isModalFormOpen) return null;

  const categoryOptions = brands.map((brands) => ({
    label: brands.name,
    value: brands._id,
  }));

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

  const handleFinalSubmit = async (formData) => {
    if (croppedImages.length < 3) {
      return alert("Minimum 3 images required");
    }

    const submission = new FormData();
    for (let key in formData) {
      submission.append(key, formData[key]);
    }

    croppedImages.forEach((img) => submission.append("images", img));
    onSubmit(submission);
  };

  const productFields = getProductFields(categoryOptions);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // {
  //   isLoading && (
  //     <div className="h-screen w-full absolute top-0 z-50 left-0 backdrop-blur-sm bg-black/30 flex justify-center items-center">
  //       <RotatingLines
  //         visible={true}
  //         height="50"
  //         width="50"
  //         color="grey"
  //         strokeColor="#fff"
  //         strokeWidth="2"
  //         animationDuration="8"
  //         ariaLabel="rotating-lines-loading"
  //       />
  //     </div>
  //   );
  // }
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
          {/* Manual image upload field */}
          {mode !== "edit" && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Upload Product Images (Min 3)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
              <p className="text-xs text-gray-500 mt-1">
                Cropped images: {croppedImages.length}
              </p>
            </div>
          )}

          <Form
            fields={productFields}
            title={mode === "edit" ? "Edit Product" : "Add Product"}
            buttonText={mode === "edit" ? "Update Product" : "Add Product"}
            onSubmit={mode === "edit" ?onSubmit:handleFinalSubmit}
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

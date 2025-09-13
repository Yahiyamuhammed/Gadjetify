import React from "react";
import Form from "@/components/common/Form";
import { brandValidationSchema } from "@/utils/validation/brandSchema";
const BrandForm = ({
  isModalFormOpen,
  onClose,
  onSubmit,
  serverError,
  initialValues = null,
  mode = "add",
}) => {
  const brandFields = [
    {
      name: "name",
      label: "Brand Name",
      placeholder: "Enter brand name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Brand Description",
      placeholder: "Enter brand description",
      type: "text",
      required: true,
    },
    {
      name: "website",
      label: "Website",
      placeholder: "Enter brand website URL",
      type: "text",
      required: true,
    },
    {
    name: "offerPercentage",
    label: "Offer Percentage",
    placeholder: "Enter offer percentage (0-100)",
    type: "number",
    required: false,
  },
  ];
  if (!isModalFormOpen) return null;
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-sm backdrop-saturate-150"
      onClick={handleOverlayClick}
    >
      <div
        className="p-6 w-full max-w-lg rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <Form
          fields={brandFields}
          title={mode === "edit" ? "Edit Brand" : "Add Brand"}
          buttonText={mode === "edit" ? "Update Brand" : "Add Brand"}
          onSubmit={onSubmit}
          validationRules={brandValidationSchema}
          serverError={serverError}
          initialValues={initialValues}
        />
      </div>
    </div>
  );
};

export default BrandForm;

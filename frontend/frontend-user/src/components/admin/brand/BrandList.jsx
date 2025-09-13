import React from "react";
import ListItem from "../ListItem";

const BrandList = ({ brands, getBrandControles, icon }) => {
  const brandColumns = [
    { key: "name", label: "Brand Name", render: (value) => value },
    { key: "description", label: "Description", render: (value) => value },
    { key: "website", label: "Website", render: (value) => value },
    {
      key: "offerPercentage",
      label: "Offer",
      render: (value) =>
        value && value > 0 ? (
          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {value}% OFF
          </span>
        ) : (
          <span className="text-gray-400 text-sm">No Offer</span>
        ),
    },
    {
      key: "isDeleted",
      label: "Status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-sm ${
            !value ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          }`}
        >
          {!value ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  return (
    <ListItem
      items={brands || []}
      columns={brandColumns}
      controles={getBrandControles}
    />
  );
};

export default BrandList;

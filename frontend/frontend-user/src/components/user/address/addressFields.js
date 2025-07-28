const addressFields = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "phone", label: "Phone Number", type: "text" },
  { name: "pincode", label: "Pincode", type: "text" },
  { name: "locality", label: "Locality", type: "text" },
  { name: "address", label: "Full Address", type: "textarea" },
  { name: "landmark", label: "Landmark (Optional)", type: "text" },
  { name: "district", label: "District", type: "text" },
  { name: "state", label: "State", type: "text" },
  {
    name: "addressType",
    label: "Address Type",
    type: "select",
    options: ["home", "office"], // must match enum
  },
  {
    name: "isPrimary",
    label: "Set as Primary Address",
    type: "checkbox",
  },
  { name: "alternatePhone", label: "Alternate Phone Number (Optional)", type: "text" },
];

export default addressFields;

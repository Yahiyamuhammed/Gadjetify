const addressFields = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "streetAddress", label: "Street Address", type: "text" },
  { name: "city", label: "City", type: "text" },
  { name: "state", label: "State", type: "text" },
  { name: "zipCode", label: "Zip Code", type: "text" },
  { name: "country", label: "Country", type: "text" },
  { name: "phone", label: "Phone", type: "text" },
  {
    name: "addressType",
    label: "Address Type",
    type: "select",
    options: ["Home", "Office"],
  },
];

export default addressFields;

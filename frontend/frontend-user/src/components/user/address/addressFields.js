export const statesAndDistricts = {
  "Andhra Pradesh": [
    "Anantapur",
    "Chittoor",
    "East Godavari",
    "Guntur",
    "Krishna",
    "Kurnool",
    "Prakasam",
    "Srikakulam",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
  ],
  Karnataka: [
    "Bengaluru Urban",
    "Bengaluru Rural",
    "Mysuru",
    "Mangaluru",
    "Belagavi",
    "Hubli-Dharwad",
  ],
  Kerala: [
    "Thiruvananthapuram",
    "Kollam",
    "Alappuzha",
    "Kottayam",
    "Idukki",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasaragod",
  ],
};

const addressFields = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "phone", label: "Phone Number", type: "text" },
  { name: "pincode", label: "Pincode", type: "text" },
  { name: "locality", label: "Locality", type: "text" },
  { name: "address", label: "Full Address", type: "textarea" },
  { name: "landmark", label: "Landmark (Optional)", type: "text" },
  {
    name: "state",
    label: "State",
    type: "select",
    options: Object.keys(statesAndDistricts),
  },
  {
    name: "district",
    label: "District",
    type: "select",
    options: [],
  },
  {
    name: "addressType",
    label: "Address Type",
    type: "select",
    options: ["home", "office"],
  },
  {
    name: "alternatePhone",
    label: "Alternate Phone Number (Optional)",
    type: "text",
  },
];

export default addressFields;

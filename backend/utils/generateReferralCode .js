const generateReferralCode = (name) => {
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${name.split(" ")[0]}_${random}`;
};
module.exports=generateReferralCode
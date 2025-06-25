const {fetchAllUsers}=require('../helpers/adminUserHelpers')

exports.getAllUsers=async (req,res)=>{
    try{
        const {search='',limit=10,page=1}=req.query
        const data=await fetchAllUsers(search,page,limit)
        res.status(200).json(data)
    }catch(err){
        res.status(500).json({message:"Error Fetching Users",error:err.message})
    }
}
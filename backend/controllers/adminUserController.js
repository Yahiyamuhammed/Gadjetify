const {fetchAllUsers,toggleUserBlockStatus}=require('../helpers/adminUserHelpers')

exports.getAllUsers=async (req,res)=>{
    try{
        const {search='',limit=3,page=1}=req.query
        const data=await fetchAllUsers(search,page,limit)
        res.status(200).json(data)
    }catch(err){
        res.status(500).json({message:"Error Fetching Users",error:err.message})
    }
}
exports.blockUnblockUser =async (req,res)=>{
    try {
        const userId=req.params.id
        console.log(userId);
        
        const {isBlocked,name}=await toggleUserBlockStatus(userId)
        res.status(200).json({message:(isBlocked)?`user Blocked ${name}`:`user Unblocked ${name}`})
    } catch (err) {
        console.log(err.message)
        res.status(err.status || 500).json({ message: 'Error toggling block', error: err.message });
    }
  
}
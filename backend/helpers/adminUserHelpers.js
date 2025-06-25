const User=require('../models/userModal')
exports.fetchAllUsers=async (search,page,limit)=>{
    const skip=(page-1)*limit
    const query={
        isVerified:true,
        $or:[
            {email:{$regex:search,$options:'i'}},
            {name:{$regex:search,$options:'i'}}
        ]
    }

    const totalUsers=await User.countDocuments(query)
    const users=await User.find(query).sort({createdAt:-1}).skip(skip).limit(limit)

    return {users,totalUsers}
}
const User=require('../models/userModal')
const mongoose = require('mongoose');

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

    return {totalUsers,users}
}
exports.toggleUserBlockStatus=async (userId)=>{

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw { status: 400, message: 'Invalid user ID format' };
    }
    const user = await User.findById(userId)
    // console.log(user,'this is user');
    if (!user)
        throw { status: 404, message: 'User not found' }

    // console.log(user);
    
    user.isBlocked=!user.isBlocked
    await user.save()
    return({isBlocked:user.isBlocked,name:user.name})
}
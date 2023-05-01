const db = require ('../models/index');
const User = db.users;

const createNewUser = async(userToInsert)=>{
    return await User.create(userToInsert);
}

const getUserById = async(id)=>{
    return await User.findOne({ where: { identity: id } });
}

const getUsers = async()=>{
    return await User.findAll();
}

const getEmailUsers = async()=>{
    return await User.findAll({attributes:['email']});
}

// const getUsersByFamily = async(_familyId)=>{
//     return await User.findAll({ include:[{model:db.permit_users,attributes:['firstName','identity','permitId']}],where: { familyId: _familyId } });
// }

// const getUsersByFamily = async(_familyId)=>{
//     return await User.findAll({ where: { familyId: _familyId } });
// 

const getHeadUsers= async()=>{
    return await User.findAll({include:[{model:db.families,attributes:['idfamily','familyName']}],where:{familyHead:1},attributes:['city','pelephone','email']});
}

const getUsersByFamily = async(_familyId)=>{
    return await User.findAll({where: { familyId: _familyId } ,attributes:['firstName','birthdate']});
}

const getCities = async(_familyId)=>{
    return await User.findAll({where:{familyHead:1},attributes:['city']});
}

const getBirthdate = async(_familyId)=>{
    return await User.findAll({where:{familyHead:1},attributes:['birthdate']});
}

const updateUserById = async(body,id)=>{
    return await User.update(body,{ where: { identity: id } });
}

const deleteUser = async(id)=>{
    return await User.destroy({ where: { identity: id } });
}

const login= async(id)=>{
    return await User.findOne({include:[{model:db.families,attributes:['password','familyName']}],where:{identity:id}});
}

const getUsersPermission = async(_familyId)=>{
    return await User.findAll({ include:[{model:db.permissions,attributes:['permissionName']}],where: { familyId: _familyId ,familyHead:0},attributes:['firstName','identity']});
}

module.exports={createNewUser,getHeadUsers,getUsersByFamily,getUserById,getUsers,getCities,getBirthdate,updateUserById,deleteUser,login,getEmailUsers,getUsersPermission};

const db = require ('../models/index');
const Permission = db.permissions;

const createNewPermission = async(permissionToInsert)=>{
    return await Permission.create(permissionToInsert);
}

const getPermissions = async()=>{
    return await Permission.findAll();
}

const deletePermission = async(id)=>{
    return await Permission.destroy({ where: { idpermission: id } });
}

module.exports={createNewPermission,getPermissions,deletePermission}
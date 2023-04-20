const db = require ('../models/index');
const Permission_process = db.permissions_processes;

const createNewPermission_process = async(permission_processToInsert)=>{
    return await Permission_process.create(permission_processToInsert);
}

const getPermissionsProcesses = async(id)=>{
    return await Permission_process.findAll({include:[{model:db.permissions,attributes:['idpermission','permissionName']},
                                                      {model:db.processes,attributes:['idprocess','processDescription']}],
                                                      attributes:['permissionId'],group: ['permissionId']});
}

// const getPermissionByIdProcess = async(id)=>{
//     return await Permission_process.findOne({where:{permissionId:id}});
// },getPermissionByIdProcess

const deletePermission_process = async(id)=>{
    return await Permission_process.destroy({ where: { idpermissionprocess: id } });
}

module.exports={createNewPermission_process,getPermissionsProcesses,deletePermission_process};
const PermissionDB = require("../dal/permission_dal")

//create - post
exports.createNewPermission = async(req,res)=>{
    const permissionToInsert = req.body;
    if(!permissionToInsert) 
      return res.status(400).json({message: 'not entried data'});
    const newPermission = await PermissionDB.createNewPermission(permissionToInsert);
    if(newPermission) 
      res.status(201).json({message:'created Permission'});
    //   res.send(newPermission)
    else 
      res.status(400).json({message:'error'});
};

//get all permissions
exports.getPermissions = async(req, res) => {
const permissions = await PermissionDB.getPermissions();
if(permissions) 
    res.send(permissions);
else 
    res.status(400).json({message:'error'});
};

//delete
exports.deletePermission = async(req, res) => {
const id = req.params.id;
if(!id) 
    return res.status(400).json({message: 'not entried id'});
const flagDeletePermission = await PermissionDB.deletePermission(id);
if(flagDeletePermission) 
    res.status(200).json({message:"Deleted successfully"}); 
else 
    res.status(400).json({message:'error'});
};
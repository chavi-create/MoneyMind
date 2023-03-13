const Permission_processDB = require("../dal/permission_process_dal");
const UserDB = require("../dal/user_dal");

//create - post
exports.createNewPermission_process = async(req,res)=>{
    const permission_processToInsert = req.body;
    if(!permission_processToInsert) 
      return res.status(400).json({message: 'not entried data'});
    const newPermission_process = await Permission_processDB.createNewPermission_process(permission_processToInsert);
    if(newPermission_process) 
      res.status(201).json({message:'created permission_process'});
    //   res.send(newPermission_process)
    else 
      res.status(400).json({message:'error'});
};

exports.getPermissionsProcesses = async(req,res)=>{
  const permissions_processes = await Permission_processDB.getPermissionsProcesses();
  if(permissions_processes) 
    res.send(permissions_processes)
  else 
    res.status(400).json({message:'error'});
};


// exports.getPermitByIdUser = async(req,res)=>{
//   const userId = req.params.id;
//   if(!userId) 
//     return res.status(400).json({message: 'not entried data'});
//   const newPermit_user = await Permit_userDB.getPermitByIdUser(userId);
//   if(newPermit_user) 
//     res.send(newPermit_user)
//   else 
//     res.status(400).json({message:'error'});
// };

exports.deletePermission_process = async(req, res) => {
  const id = req.params.id;
  if(!id) 
      return res.status(400).json({message: 'not entried id'});
  const flag = await Permission_processDB.deletePermission_process(id);
  if(flag) 
      res.status(200).json({message:"Deleted successfully"}); 
  else 
      res.status(400).json({message:'error'});
  };
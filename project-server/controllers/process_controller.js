const ProcessDB = require("../dal/process_dal")

//create - post
exports.createNewProcess = async(req,res)=>{
    const processToInsert = req.body;
    if(!processToInsert) 
      return res.status(400).json({message: 'not entried data'});
    const newProcess = await ProcessDB.createNewProcess(processToInsert);
    if(newProcess) 
      res.status(201).json({message:'created process'});
    //   res.send(processToInsert)
    else 
      res.status(400).json({message:'error'});
};

//get all processes
exports.getProcesses = async(req, res) => {
const processes = await ProcessDB.getProcesses();
if(processes) 
    res.send(processes);
else 
    res.status(400).json({message:'error'});
};

//delete
exports.deleteProcess = async(req, res) => {
const id = req.params.id;
if(!id) 
    return res.status(400).json({message: 'not entried id'});
const flagDeleteProcess = await ProcessDB.deleteProcess(id);
if(flagDeleteProcess) 
    res.status(200).json({message:"Deleted successfully"}); 
else 
    res.status(400).json({message:'error'});
};
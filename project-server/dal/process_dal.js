const db = require ('../models/index');
const Process = db.processes;

const createNewProcess = async(processToInsert)=>{
    return await Process.create(processToInsert);
}

const getProcesses = async()=>{
    return await Process.findAll();
}

const deleteProcess = async(id)=>{
    return await Process.destroy({ where: { idprocess: id } });
}

module.exports={createNewProcess,getProcesses,deleteProcess}
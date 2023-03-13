const db = require ('../models/index');
const Family = db.families;

const createNewFamily = async(familyToInsert)=>{
    return await Family.create(familyToInsert);
}
const getFamilyById = async(id)=>{
    return await Family.findByPk(id);
}

const getFamilies = async()=>{
    return await Family.findAll();
}

const updateFamilyById = async(body,id)=>{
    return await Family.update(body,{ where: { idfamily: id } });
}

const deleteFamily = async(id)=>{
    return await Family.destroy({ where: { idfamily: id } });
}


module.exports={createNewFamily,getFamilyById,getFamilies,updateFamilyById,deleteFamily}
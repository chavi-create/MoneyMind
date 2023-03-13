const db = require ('../models/index');
const Category = db.categories;

const createNewCategory = async(categoryToInsert)=>{
    return await Category.create(categoryToInsert);
}

const getCategories = async()=>{
    return await Category.findAll();
}

const getCategoryId = async(name)=>{
    return await Category.findOne({where:{categoryName:name},attributes:['idcategory']});
}

const deleteCategory = async(id)=>{
    return await Category.destroy({ where: { idcategory: id } });
}

module.exports={createNewCategory,getCategories,getCategoryId,deleteCategory}
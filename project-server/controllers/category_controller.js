const CategoryDB = require("../dal/category_dal")

//create - post
exports.createNewCategory = async(req,res)=>{
    const categoryToInsert = req.body;
    if(!categoryToInsert) 
      return res.status(400).json({message: 'not entried data'});
    const newCategory = await CategoryDB.createNewCategory(categoryToInsert);
    if(newCategory) 
      res.status(201).json({message:'created category'});
    //   res.send(categoryToInsert)
    else 
      res.status(400).json({message:'error'});
};

//get all categories
exports.getCategories = async(req, res) => {
const categories = await CategoryDB.getCategories();
if(categories) 
    res.send(categories);
else 
    res.status(400).json({message:'error'});
};

//delete
exports.deleteCategory = async(req, res) => {
const id = req.params.id;
if(!id) 
    return res.status(400).json({message: 'not entried id'});
const flagDeleteCategory = await CategoryDB.deleteCategory(id);
if(flagDeleteCategory) 
    res.status(200).json({message:"Deleted successfully"}); 
else 
    res.status(400).json({message:'error'});
};
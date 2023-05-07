const CategoryDB = require("../dal/category_dal");
const ExpenseDB = require("../dal/expense_dal");

//create - post
exports.createNewCategory = async (req, res) => {
    console.log("req.body ", req.body);
    // req.body  {
    //     CategoryName: 'aa',
    //     Charity: 0,
    //     namedReplace: [ 'park','excersize' ]
    //   }
    // res.send();
    const categoryN = req.body.categoryName;
    const charity = req.body.charity;
    const categoryToInsert = { categoryName: categoryN, charity: charity };
    if (!categoryToInsert)
        return res.status(400).json({ message: 'not entried data' });
    const newCategory = await CategoryDB.createNewCategory(categoryToInsert);
    if (newCategory) {
        catId = newCategory.dataValues.idcategory;
        const result = await ExpenseDB.updateCategoryId(catId, req.body.namesReplace);
        if (result) {
            res.send(newCategory)
        }
        else {
            await CategoryDB.deleteCategory(catId);
            res.status(400).json({ message: 'error update expenses' });
        }
    }
    //   res.status(201).json({message:'created category'});
    else
        res.status(400).json({ message: 'error create category' });
};

//get all categories
exports.getCategories = async (req, res) => {
    const categories = await CategoryDB.getCategories();
    if (categories)
        res.send(categories);
    else
        res.status(400).json({ message: 'error' });
};

//delete
exports.deleteCategory = async (req, res) => {
    const id = req.params.id;
    if (!id)
        return res.status(400).json({ message: 'not entried id' });
    const flagDeleteCategory = await CategoryDB.deleteCategory(id);
    if (flagDeleteCategory)
        res.status(200).json({ message: "Deleted successfully" });
    else
        res.status(400).json({ message: 'error' });
};
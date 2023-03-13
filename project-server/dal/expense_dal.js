const db = require ('../models/index');
const Expense = db.expenses;

const createNewExpense = async(expenseToInsert)=>{
    return await Expense.create(expenseToInsert);
}

const getExpenseById = async(id)=>{
    return await Expense.findAll({where: { familyId: id } });
}

const getExpense = async(_id,_month,_year)=>{
    return await Expense.findAll({include:[{model:db.categories,attributes:['categoryName']}] ,where: { familyId: _id ,month:_month,year:_year},attributes:['price'] });
}

const getExpenseCategory = async(fid,_month,_year,cid)=>{
    return await Expense.findAll({where: { familyId: fid, month: _month, year: _year, categoryId: cid } ,attributes:['price','generalDescription']});
}

const getExpenseByCategoryId = async(_id)=>{
    return await Expense.findAll({where: { categoryId: _id } });
}

const getCharity = async(_id,_month,_year)=>{
    return await Expense.findAll({include:[{model:db.categories,where:{charity:1},attributes:['categoryName']}],where: { familyId: _id ,month:_month,year:_year},attributes:['price','generalDescription'] });
}

const getExpensesPrice = async(_id,_month,_year)=>{
    return await Expense.findAll({where: { familyId: _id ,month:_month,year:_year},attributes:['price'] });
}

const getExpensesCharity = async(_id,_month,_year)=>{
    return await Expense.findAll({include:[{model:db.categories,where:{charity:1},attributes:[]}],where: { familyId: _id ,month:_month,year:_year},attributes:['price']});
}

const getCategories = async()=>{
    return await Expense.findAll({include:[{model:db.categories,attributes:['categoryName'] }],attributes:[]});
}

const getAnotherCategories = async(cid)=>{
    return await Expense.findAll({where:{categoryId:cid},attributes:['generalDescription']});
}

const deleteExpense = async(id)=>{
    return await Expense.destroy({ where: { idexpense: id } });
}

module.exports={createNewExpense,getExpenseById,getExpense,getExpenseByCategoryId,getExpenseCategory,getCategories,getCharity,getExpensesPrice,getExpensesCharity,getAnotherCategories,deleteExpense};

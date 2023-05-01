const ExpenseDB = require("../dal/expense_dal");
const CategoryDB = require("../dal/category_dal");
const { categories } = require("../models");
const incomeController = require("./income_controller")

//create - post
exports.createNewExpense = async(req,res)=>{
    const expenseToInsert = req.body;
    if(!expenseToInsert) 
      return res.status(400).json({message: 'not entried data'});
    const newExpense = await ExpenseDB.createNewExpense(expenseToInsert);
    if(newExpense) 
      res.status(201).json({message:'created expense'});
      // res.send(expenseToInsert)
    else 
      res.status(400).json({message:'error'});
};
    
//getById-familyId
exports.getExpenseById = async(req, res) => {
  const fid = req.params.id;
  if(!fid) 
    return res.status(400).json({message: 'not entried fid'});
  const thisExpense = await ExpenseDB.getExpenseById(fid);
  if(thisExpense) 
    res.send(thisExpense);
  else 
    res.status(400).json({message:'error'});
};


exports.getExpense = async(req, res) => {
  const fid = req.params.id;
  const month = req.body.month;
  const year = req.body.year;
  if(!fid) 
    return res.status(400).json({message: 'not entried id'});
  const expensesPrice = await ExpenseDB.getExpense(fid,month,year);
  // console.log(expensesPrice);
  var expenseDic = {};
  var totalPrice=0;
  expensesPrice.forEach(e => {
    price = e.dataValues['price'];
    categoryName = e.dataValues['category'].dataValues['categoryName'];
    if(categoryName in expenseDic)
      expenseDic[categoryName]+=price;  
    else
      expenseDic[categoryName]=price;
    totalPrice+=price;
  });
  expenseDic["totalPrice"]=totalPrice;
  // console.log(expenseDic);
  if(expenseDic) 
    res.send(expenseDic);
  else 
    res.status(400).json({message:'error'});
};

exports.getExpenseCategory = async(req, res) => {
  const fid = req.params.id;
  const month = req.body.month;
  const year = req.body.year;
  const categoryName = req.body.categoryName;
  const categoryId = await CategoryDB.getCategoryId(categoryName);
  console.log(categoryId);
  if(!fid) 
    return res.status(400).json({message: 'not entried id'});
  const thisExpense = await ExpenseDB.getExpenseCategory(fid,month,year,categoryId.dataValues['idcategory']);
  if(thisExpense) 
    res.send(thisExpense);
  else 
    res.status(400).json({message:'error'});
};

exports.getExpenseByCategoryId = async(req, res) => {
  const id = req.params.id;
  if(!id) 
    return res.status(400).json({message: 'not entried id'});
  const thisExpense = await ExpenseDB.getExpenseByCategoryId(id);
  if(thisExpense) 
    res.send(thisExpense);
  else 
    res.status(400).json({message:'error'});
};

exports.getCharity = async(req, res) => {
  const f_id = req.params.id;
  const month = req.query.month;
  const year = req.query.year;
  if(!f_id) 
    return res.status(400).json({message: 'not entried id'});
  const expenses = await ExpenseDB.getCharity(f_id,month,year);
  // console.log(expenses);
  var expensesArr = [];
  var totalCharity=0;
  expenses.forEach(e => {
    _price = e.dataValues['price'];
    descript = e.dataValues['generalDescription'];
    category = e.dataValues['category'].dataValues['categoryName'];
    expensesArr.push({price:_price,description:descript,categoryName:category});
    totalCharity+=_price;
  });
  expensesArr.push({'totalCharity':totalCharity});
  // const totalIncomes = (incomeController.getIncomesSum(f_id,month,year))*1.0/10;
  // if (totalCharity<totalIncomes)
  //   alert...
  if(expensesArr) 
    res.send(expensesArr);
  else 
    res.status(400).json({message:'error'});
};

exports.getExpensesPrice = async(req, res) => {
  const fid = req.params.id;cd
  const month = req.body.month;
  const year = req.body.year;
  if(!fid) 
    return res.status(400).json({message: 'not entried id'});
  const incomesSum = await ExpenseDB.getExpensesPrice(fid,month,year);
  var _totalPrice=0;
  incomesSum.forEach(e => {
    _totalPrice+=e.dataValues['price'];
  });
  if(_totalPrice) 
    res.send({totalPrice:_totalPrice});
  else 
    res.status(400).json({message:'error'});
};

exports.getExpensesCharity = async(req, res) => {
  const fid = req.params.id;
  const month = req.body.month;
  const year = req.body.year;
  if(!fid) 
    return res.status(400).json({message: 'not entried id'});
  const incomesSum = await ExpenseDB.getExpensesCharity(fid,month,year);
  var _totalCharity = 0;
  incomesSum.forEach(e => {
    _totalCharity+=e.dataValues['price'];
  });
  if(_totalCharity) 
    res.send({totalCharity:_totalCharity});
  else 
    res.status(400).json({message:'error'});
};

//delete-expenseId
exports.deleteExpense = async(req, res) => {
  const id = req.params.id;
  if(!id) 
    return res.status(400).json({message: 'not entried id'});
  const flagDeleteExpense = await ExpenseDB.deleteExpense(id);
  if(flagDeleteExpense) 
    res.status(200).json({message:"Deleted successfully"}); 
  else 
    res.status(400).json({message:'error'});
};








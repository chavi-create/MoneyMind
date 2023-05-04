const IncomeDB = require("../dal/income_dal");

//create - post
exports.createNewIncome = async(req,res)=>{
    const incomeToInsert = req.body;
    if(!incomeToInsert) 
      return res.status(400).json({message: 'not entried data'});
    const newIncome = await IncomeDB.createNewIncome(incomeToInsert);
    console.log(newIncome);
    if(newIncome) 
      res.status(201).json({message:'created income'});
      // res.send(incomeToInsert)
    else 
      res.status(400).json({message:'error'});
};
    
//getById-familyId
exports.getIncomeById = async(req, res) => {
  const id = req.params.id;
  const month = req.body.month;
  const year = req.body.year;
  if(!id) 
    return res.status(400).json({message: 'not entried id'});
  const thisIncome = await IncomeDB.getIncomeById(id,month,year);
  if(thisIncome) 
    res.send(thisIncome);
  else 
    res.status(400).json({message:'error'});
};

exports.getIncomesSum = async(req, res) => {
  const f_id = req.params.id;
  const month = req.query.month;
  const year = req.query.year;
  if(!f_id) 
    return res.status(400).json({message: 'not entried id'});
  const incomesSum = await IncomeDB.getIncomesSum(f_id,month,year);
  var _totalSum=0;
  incomesSum.forEach(e => {
    _totalSum+=e.dataValues['sumOfMoney'];
  });
  if(_totalSum) 
    res.send({totalSum:_totalSum});
    // return _totalSum;
  else 
    res.status(400).json({message:'error'});
};


//delete-incomeId
exports.deleteIncome = async(req, res) => {
  const id = req.params.id;
  if(!id) 
    return res.status(400).json({message: 'not entried id'});
  const flagDeleteIncome = await IncomeDB.deleteIncome(id);
  if(flagDeleteIncome) 
    res.status(200).json({message:"Deleted successfully"}); 
  else 
    res.status(400).json({message:'error'});
};








const db = require ('../models/index');
const Income = db.incomes;

const createNewIncome = async(incomeToInsert)=>{
    return await Income.create(incomeToInsert);
}

const getIncomeById = async(fid,_month,_year)=>{
    return await Income.findAll({ where: { familyId: fid ,month:_month,year:_year},attributes:['source','sumOfMoney'] });
}

const getIncomesSum = async(id,_month,_year)=>{
    return await Income.findAll({ where: { familyId: id ,month:_month,year:_year},attributes:['sumOfMoney'] });
}

const deleteIncome = async(id)=>{
    return await Income.destroy({ where: { idincome: id } });
}

module.exports={createNewIncome,getIncomeById,getIncomesSum,deleteIncome};

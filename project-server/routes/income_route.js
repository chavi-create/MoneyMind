module.exports = app => {
    const incomeController = require("../controllers/income_controller");
  
    var incomeRouter = require("express").Router();

    incomeRouter.post("/", incomeController.createNewIncome);
    incomeRouter.get("/:id", incomeController.getIncomeById);
    incomeRouter.get("/totalsum/:id", incomeController.getIncomesSum);
    incomeRouter.delete("/:id", incomeController.deleteIncome);
  
    app.use('/incomes', incomeRouter);
  };
module.exports = app => {
    const expenseController = require("../controllers/expense_controller");
  
    var expenseRouter = require("express").Router();

    expenseRouter.post("/", expenseController.createNewExpense);
    expenseRouter.get("/familyid/:id", expenseController.getExpenseById);
    expenseRouter.get("/getexpense/:id", expenseController.getExpense);
    expenseRouter.get("/expense_category/:id", expenseController.getExpenseCategory);
    expenseRouter.get("/expensebycategory/:id", expenseController.getExpenseByCategoryId);
    expenseRouter.get("/charity/:id", expenseController.getCharity);
    expenseRouter.get("/totalprice/:id", expenseController.getExpensesPrice);
    expenseRouter.get("/totalcharity/:id", expenseController.getExpensesCharity);
    expenseRouter.delete("/:id", expenseController.deleteExpense);
  
    app.use('/expenses', expenseRouter);
  };
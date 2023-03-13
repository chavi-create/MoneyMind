module.exports = app => {
    const categoryController = require("../controllers/category_controller");
  
    var categoryRouter = require("express").Router();

    categoryRouter.post("/", categoryController.createNewCategory);
    categoryRouter.get("/", categoryController.getCategories);
    categoryRouter.delete("/:id", categoryController.deleteCategory);
  
    app.use('/categories', categoryRouter);
  };
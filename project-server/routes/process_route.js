module.exports = app => {
    const processController = require("../controllers/process_controller");
  
    var processRouter = require("express").Router();

    processRouter.post("/", processController.createNewProcess);
    processRouter.get("/", processController.getProcesses);
    processRouter.delete("/:id", processController.deleteProcess);
  
    app.use('/processes', processRouter);
  };
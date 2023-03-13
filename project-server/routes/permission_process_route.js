module.exports = app => {
    const permission_processController = require("../controllers/permission_process_controller");
  
    var permission_processRouter = require("express").Router();

    permission_processRouter.post("/", permission_processController.createNewPermission_process);
    // permission_processRouter.get("/:id",permission_processController.getPermitByIdUser);
    permission_processRouter.get("/", permission_processController.getPermissionsProcesses);
    permission_processRouter.delete("/:id", permission_processController.deletePermission_process);
  
    app.use('/permissions_processes', permission_processRouter);
  };
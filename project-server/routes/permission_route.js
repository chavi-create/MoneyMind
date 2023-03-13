module.exports = app => {
    const permissionController = require("../controllers/permission_controller");
  
    var permissionRouter = require("express").Router();

    permissionRouter.post("/", permissionController.createNewPermission);
    permissionRouter.get("/", permissionController.getPermissions);
    permissionRouter.delete("/:id", permissionController.deletePermission);
  
    app.use('/permissions', permissionRouter);
  };
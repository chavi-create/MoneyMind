module.exports = app => {
    const userController = require("../controllers/user_controller");
  
    var userRouter = require("express").Router();

    userRouter.post("/:id", userController.createNewUser);
    userRouter.get("/:id", userController.getUserById);
    userRouter.get("/login/:id", userController.login);
    userRouter.get("/", userController.getUsers);
    userRouter.get("/permissions/:id", userController.getUsersPermission);
    userRouter.put("/:id", userController.updateUser);
    userRouter.delete("/:id", userController.deleteUser);
  
    app.use('/users', userRouter);
  };
 

////option2:
// {  
// const express = require("express");
// const userController = require("../controllers/user_controller");
// const userRouter = express.Router();
// userRouter.post('/', userController.createNewUser);  
// module.exports = userRouter;
// }
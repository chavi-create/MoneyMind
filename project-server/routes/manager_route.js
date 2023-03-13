module.exports = app => {
    const managerController = require("../controllers/manager_controller");
  
    var managerRouter = require("express").Router();

    managerRouter.get("/emails/", managerController.getEmails);
    managerRouter.get("/headusers/", managerController.getUsersHead);
    managerRouter.get("/headusers/users/:id", managerController.getUsersByFamily);
    managerRouter.get("/cities/", managerController.getCities);
    managerRouter.get("/ages/", managerController.getAges);
    managerRouter.get("/categories/", managerController.getCategories);
    managerRouter.get("/categories/another", managerController.getAnotherCategories);
    app.use('/manager', managerRouter);
  };
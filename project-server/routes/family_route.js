module.exports = app => {
    const familyController = require("../controllers/family_controller");
  
    var familyRouter = require("express").Router();

    familyRouter.post("/signup/", familyController.createNewFamily);
    familyRouter.get("/:id", familyController.getFamilyById);
    familyRouter.get("/", familyController.getFamilies);
    familyRouter.put("/:id", familyController.updateFamily);
    familyRouter.delete("/:id", familyController.deleteFamily);
  
    app.use('/families', familyRouter);
  };
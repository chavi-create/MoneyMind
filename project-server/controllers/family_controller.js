const FamilyDB = require("../dal/family_dal")
const userController = require("../controllers/user_controller");

//create - post
exports.createNewFamily = async(req,res)=>{
    const _password = req.body.password;
    const name = req.body.familyName;
    const familyToInsert = {password:_password,familyName:name};
    console.log(familyToInsert);
    if(!familyToInsert) 
    return res.status(400).json({message: 'not entried data'});
    try{
        const newFamily = await FamilyDB.createNewFamily(familyToInsert);
        console.log(newFamily);
        if(newFamily)
            userController.createUserHead(req,res,newFamily.dataValues.idfamily);
        else 
            res.status(400).json({message:'error'});
    }
    catch{
        res.send("password exist")
    }
};

//getById
exports.getFamilyById = async(req, res) => {
const id = req.params.id;
if(!id) 
    return res.status(400).json({message: 'not entried id'});
const thisFamily = await FamilyDB.getFamilyById(id);
if(thisFamily) 
    res.send(thisFamily);
else 
    res.status(400).json({message:'error'});
};
  
//get all families
exports.getFamilies = async(req, res) => {
const families = await FamilyDB.getFamilies();
if(families) 
    res.send(families);
else 
    res.status(400).json({message:'error'});
};
  
//update
exports.updateFamily = async(req, res) => {
const id = req.params.id;
if(!id) 
    return res.status(400).json({message: 'not entried id'});
const body = req.body;
if(!body) 
    return res.status(400).json({message: 'not entried body'});
const flagFamily = await FamilyDB.updateFamilyById(body,id);
if(flagFamily==1) 
    // res.send(flagFamily);
    res.status(201).json({message:'successfully update family'});
else 
    res.status(400).json({message:'error'});
};

//delete
exports.deleteFamily = async(req, res) => {
const id = req.params.id;
if(!id) 
    return res.status(400).json({message: 'not entried id'});
const flagDeleteFamily = await FamilyDB.deleteFamily(id);
if(flagDeleteFamily) 
    res.status(200).json({message:"Deleted successfully"}); 
else 
    res.status(400).json({message:'error'});
};
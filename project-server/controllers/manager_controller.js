const UserDB = require("../dal/user_dal");
const ExpenseDB = require("../dal/expense_dal");
const CategoryDB = require("../dal/category_dal")
const mailer = require("../services/sendEmail");

exports.getEmails = async(req, res) => {
    // const users = await UserDB.getUsers();
    const usersEmail = await UserDB.getEmailUsers();
    if(usersEmail) 
    {
        var usersEmailsArr=[];
        usersEmail.forEach(element => {
            const email = element.dataValues['email']
            if(email!=null)
                usersEmailsArr.push(email)
        });
        console.log(usersEmailsArr);
        usersEmailsArr.forEach(e=>{
            mailer.sendEmailWithAttachment(e,"hello!!!!❤","thanks!!!! - We are so happy to send you a message.",'shutterstock_572553937.jpg','M:\\פרוייקט\\project-server\\shutterstock_572553937.jpg');
        });
        // console.log(usersEmail);
        res.send(usersEmail);
    } 
    else 
      res.status(400).json({message:'error'});
  };

exports.getUsersHead = async(req, res) => {
const usersHead = await UserDB.getHeadUsers();
var usersHeadList = []
usersHead.forEach(e => {
    const _id = e.dataValues['family'].dataValues['idfamily']
    const fName = e.dataValues['family'].dataValues['familyName'];
    const _city = e.dataValues['city'];
    const pele = e.dataValues['pelephone'];
    const _email = e.dataValues['email'];
    usersHeadList.push({id:_id,familyName:fName,city:_city,pelephone:pele,email:_email})
});
if(usersHeadList) 
    // console.log(usersEmail);
    res.send(usersHeadList);
else 
    res.status(400).json({message:'error'});
};

exports.getUsersByFamily = async(req, res) => {   
const fid = req.params.id;
const users = await UserDB.getUsersByFamily(fid);
console.log(users)
var usersList = []
users.forEach(e => {
    const fName = e.dataValues['firstName'];
    const _age = calculateAge(e.dataValues['birthdate']);
    console.log(_age);
    usersList.push({firstName:fName,age:_age});
});
if(usersList) 
    // console.log(usersEmail);
    res.send(usersList);
else 
    res.status(400).json({message:'error'});
};

exports.getCities = async(req, res) => {
const cities = await UserDB.getCities();
// console.log(cities);
var citiesDic = {};
cities.forEach(e => {
    var city = e.dataValues['city'];
    if(city in citiesDic)
    citiesDic[city]+=1;  
    else
    citiesDic[city]=1; 
});
// console.log(expenseDic);
if(citiesDic) 
    res.send(citiesDic);
else 
    res.status(400).json({message:'error'});
};

exports.getAges = async(req, res) => {
const birthdates = await UserDB.getBirthdate();
// console.log(birthdates);
var agesDic = {};
birthdates.forEach(e => { 
    var age = calculateAge(e.dataValues['birthdate']);
    if((Math.round(age/10)) in agesDic)
    agesDic[(Math.round(age/10))]+=1;  
    else
    agesDic[(Math.round(age/10))]=1; 
});
if(agesDic) 
    res.send(agesDic);
else 
    res.status(400).json({message:'error'});
};

exports.getCategories = async(req, res) => {
const categories = await ExpenseDB.getCategories();
console.log(categories);
var categoriesDic = {};
categories.forEach(e => {
    var category = e.dataValues['category'].dataValues['categoryName'];
    if(category in categoriesDic)
    categoriesDic[category]+=1;  
    else
    categoriesDic[category]=1; 
});
// console.log(categoriesDic);
if(categoriesDic) 
    res.send(categoriesDic);
else 
    res.status(400).json({message:'error'});
};

exports.getAnotherCategories = async(req, res) => {
    const categoryId = await CategoryDB.getCategoryId("another");
    const anothers = await ExpenseDB.getAnotherCategories(categoryId.dataValues['idcategory']);
    console.log(anothers);
    var anothersDic = {};
    anothers.forEach(e => {
        var another = e.dataValues['generalDescription'];
        if(another in anothersDic)
        anothersDic[another]+=1;  
        else
        anothersDic[another]=1; 
    });
    // console.log(anothersDic);
    if(anothersDic) 
        res.send(anothersDic);
    else 
        res.status(400).json({message:'error'});
    };

const calculateAge = (birthdate)=>{
    if(birthdate== null)
        return null;
    var today = new Date();
    var birthDate = new Date(birthdate);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

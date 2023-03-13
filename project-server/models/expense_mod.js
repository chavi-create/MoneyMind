const { families,categories } = require(".");

module.exports = (sequelize,DataTypes)=>{
    const Expense = sequelize.define('expenses',{
        idexpense:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
        familyId:{type:DataTypes.INTEGER,references:families,referencesKey:'idfamily',allowNull:false},
        month:{type:DataTypes.INTEGER,allowNull:false},
        year:{type:DataTypes.INTEGER,allowNull:false},
        purchaseDate:{type:DataTypes.DATE},
        paymentNumber:{type:DataTypes.INTEGER},
        mainPayment:{type:DataTypes.FLOAT},
        categoryId:{type:DataTypes.INTEGER,references:categories,referencesKey:'idcategory',allowNull:false},
        productName:{type:DataTypes.STRING},
        price:{type:DataTypes.FLOAT,allowNull:false},
        generalDescription:{type:DataTypes.STRING(1234)}
    },
    {
        freezeTableName:true,
        timestamps: false
    });
    return Expense;
}
const { families } = require(".");

module.exports = (sequelize,DataTypes)=>{
    const Income = sequelize.define('incomes',{
        idincome:{type:DataTypes.INTEGER,primaryKey:true,allowNull:false,autoIncrement:true},
        familyId:{type:DataTypes.INTEGER,references:families,referencesKey:'idfamily'},
        month:{type:DataTypes.INTEGER,allowNull:false},
        year:{type:DataTypes.INTEGER,allowNull:false},
        bankEntryDate:{type:DataTypes.DATE,allowNull:false},
        incomeDate:{type:DataTypes.DATE},
        sumOfMoney:{type:DataTypes.FLOAT,allowNull:false},
        source:{type:DataTypes.STRING}
    },
    {
        freezeTableName:true,
        timestamps: false
    });
    return Income;
}
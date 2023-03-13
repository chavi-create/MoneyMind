module.exports = (sequelize,DataTypes)=>{
    const Family = sequelize.define('families',{
        idfamily:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
        password:{type:DataTypes.STRING,allowNull:false},
        familyName:{type:DataTypes.STRING,allowNull:false}
    },
    {
        freezeTableName:true,
        timestamps: false
    });
    return Family;
}
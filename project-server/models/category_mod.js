module.exports = (sequelize,DataTypes)=>{
    const Category = sequelize.define('categories',{
        idcategory:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
        categoryName:{type:DataTypes.STRING(15),allowNull:false},
        charity:{type:DataTypes.TINYINT,allowNull:false}
    },
    {
        freezeTableName:true,
        timestamps: false
    });
    return Category;
}
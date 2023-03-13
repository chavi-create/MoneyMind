module.exports = (sequelize,DataTypes)=>{
    const Permit_level = sequelize.define('permissions',{
        idpermission:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
        permissionName:{type:DataTypes.STRING(15),allowNull:false}
    },
    {
        freezeTableName:true,
        timestamps: false
    });
    return Permit_level;
}
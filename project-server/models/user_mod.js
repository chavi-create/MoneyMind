const { families, permissions } = require(".");

module.exports = (sequelize,DataTypes)=>{
    const User = sequelize.define('users',{
           iduser:{type: DataTypes.INTEGER, primaryKey: true,autoIncrement:true},
           firstName:{type:DataTypes.STRING(15),allowNull:false},
           familyId:{type:DataTypes.INTEGER,references:families,referencesKey:'idfamily',allowNull:false},
           identity:{type:DataTypes.BIGINT,allowNull:false},
           birthdate:{type:DataTypes.DATE},
           phone:{type:DataTypes.STRING(15)},
           city:{type:DataTypes.STRING(15)},
           email:{type:DataTypes.STRING(20)},
           familyHead:{type:DataTypes.TINYINT,allowNull:false},
           permissionId:{type:DataTypes.INTEGER,references:permissions,referencesKey:'idpermission',allowNull:false}
       },
    {
        freezeTableName:true,
        timestamps: false,
    }
    );
    return User;
}
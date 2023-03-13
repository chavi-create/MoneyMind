const {permissions,processes } = require(".");

module.exports = (sequelize,DataTypes)=>{
    const PermitProcess = sequelize.define('permissions_processes',{
        idpermissionprocess:{type:DataTypes.INTEGER, primaryKey:true,autoIncrement:true},
        permissionId:{type:DataTypes.INTEGER,references:permissions,referencesKey:'idpermission',allowNull:false},
        processId:{type:DataTypes.INTEGER,references:processes,referencesKey:'idprocess',allowNull:false},
    },
    {
        freezeTableName:true,
        timestamps: false
    });
    return PermitProcess;
}
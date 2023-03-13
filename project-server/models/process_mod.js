module.exports = (sequelize,DataTypes)=>{
    const Process = sequelize.define('processes',{
        idprocess:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
        processDescription:{type:DataTypes.STRING(1234),allowNull:false}
    },
    {
        freezeTableName:true,
        timestamps: false
    });
    return Process;
}
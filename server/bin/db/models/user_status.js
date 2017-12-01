module.exports =function(sequelize, DataTypes) {


    return sequelize.define('user_status', {
        id: { type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userstatus:DataTypes.STRING
    }, {
        timestamps: false,
        underscored: true
    });
}
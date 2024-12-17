
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define(
      'Comment',
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        content: { type: DataTypes.TEXT, allowNull: false },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        postId: { type: DataTypes.INTEGER, allowNull: false },
      },
      {
        timestamps: false,
        tableName: 'Comment',
      },
    );
    
    Comment.associate = function (models) {
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
    };

    Comment.associate = function (models) {
      Comment.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
    };

    return Comment;
};  
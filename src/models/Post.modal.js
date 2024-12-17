
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
      'Post',
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        title: { type: DataTypes.STRING, allowNull: false },
        content: { type: DataTypes.TEXT, allowNull: false },
        userId: { type: DataTypes.INTEGER, allowNull: false },
      },
      {
        timestamps: false,
        tableName: 'Post',
      },
    );

    Post.associate = function (models) {
      Post.belongsTo(models.User, {
        foreignKey: 'userId',
        targetKey: 'id',
      });
    };

    return Post;
};  
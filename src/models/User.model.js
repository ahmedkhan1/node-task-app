module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'User',
      {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, unique: true, allowNull: false },
        country: { type: DataTypes.STRING, allowNull: false },
        password: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.ENUM('user', 'admin'), defaultValue: 'user' },
        verified: { type: DataTypes.BOOLEAN, defaultValue: false },
      },
      {
        timestamps: false,
        tableName: 'User',
      },
    );

    return User;
};  
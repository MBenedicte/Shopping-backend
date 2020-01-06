export default (sequelize, DataTypes) => {
  const Shop = sequelize.define(
    'Shop',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },

      shopName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      owner: {
        type: DataTypes.STRING,
        allowNull: false,
        referenceS: {
          model: 'Users',
          key: 'username'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      shopName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {}
  );
  Shop.associate = models => {
    Shop.belongsTo(models.User, { foreignKey: 'owner', as: 'shopOwner' });
    Shop.hasMany(models.Product, {
      foreignKey: 'shopName',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Shop;
};

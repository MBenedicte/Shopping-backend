export default (sequelize, DataTypes) => {
  const Shop = sequelize.define(
    'Shop',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        referenceS: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    Shop.belongsTo(models.User, { foreignKey: 'ownerId', as: 'owner' });
    Shop.hasMany(models.Product, {
      foreignKey: 'shopId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Shop;
};

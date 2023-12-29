const { DataTypes } = require("sequelize");

const tableName = "product";

const Product = (sequelize) =>
  sequelize.define(
    tableName,
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      articleNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      sizes: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "[]",
        // get() {
        //   const sizes = this.getDataValue("sizes");
        //   return sizes ? JSON.parse(sizes) : [];
        // },
        // set(val) {
        //   this.setDataValue("sizes", JSON.stringify(val));
        // },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      subcategory: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      brand: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      productModel: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

module.exports = Product;

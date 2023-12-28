const Sequelize = require("sequelize");
const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USER,
  `${process.env.DB_PASSWORD}`,
  {
    dialect: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialectOptions: {
      socketPath: process.env.DB_SOCKET,
    },
    logging: false,
    define: {
      freezeTableName: true,
    },
  }
);

fs.readdirSync(`${__dirname}/../models/`)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf("index.js") === -1 &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    require(path.join("../models/", file))(sequelize).sync();
  });

function applyExtraSetup(sequelize) {
  const {} = sequelize.models;
}

applyExtraSetup(sequelize);

module.exports = sequelize;

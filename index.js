const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./services/db");
const path = require("path");
const webhookRouter = require("./routes/webhook.routes");

const app = express();
dotenv.config({ path: path.resolve(__dirname, "../.env") });

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
  })
);
app.use(express.static("public"));

const dbConnection = async () => {
  console.log(`Checking database connection...`);

  return sequelize
    .authenticate()
    .then(() => {
      console.log("DB connected success");
      return true;
    })
    .catch((err) => {
      console.error("DB NOT connected", err);
      process.exit(1);
    });
};

app.get("/", (req, res) => res.send("server. Aliens made me do it :)"));
app.use("/api/webhook", webhookRouter);

const serverStart = async () => {
  await dbConnection();

  try {
    app.listen(process.env.SERVER_PORT, () => {
      console.log("server started on port: " + process.env.SERVER_PORT);
    });
  } catch (e) {
    console.log(e);
  }
};

serverStart();

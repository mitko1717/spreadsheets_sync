const { google } = require("googleapis");
const LocalDbService = require("./localdb.service");
const { formatData, formatSizes } = require("../helpers/formatting");

const API_KEY = process.env.API_KEY;
const spreadsheetId = "1HJzKapn438dVT3vws2Ea7zG9FMmoKv8yE3GbQYvS6GU";

class SpreadsheetsService {
  constructor() {
    this.sheets = google.sheets({ version: "v4", auth: API_KEY });
  }

  async get() {
    try {
      const sheetNames = await this.getSheetNames();
      const allData = {};

      for (const sheetName of sheetNames) {
        const rows = await this.getDataFromSheet(spreadsheetId, sheetName);
        const formattedData = formatData(rows);

        allData[sheetName] = formattedData;
      }

      console.log("Formatted data for all sheets");
      return allData;
    } catch (error) {
      console.error("Error retrieving data:", error);
      return {};
    }
  }

  // get tabs names in spreadsheet as string array
  async getSheetNames() {
    try {
      const spreadsheetId = "1HJzKapn438dVT3vws2Ea7zG9FMmoKv8yE3GbQYvS6GU";
      const response = await this.sheets.spreadsheets.get({
        spreadsheetId,
      });

      return response.data.sheets.map((sheet) => sheet.properties.title);
    } catch (error) {
      console.error("Error retrieving sheet names:", error);
      return [];
    }
  }

  async getDataFromSheet(spreadsheetId, sheetName) {
    try {
      const response = await this.sheets.spreadsheets.values.get({
        spreadsheetId,
        range: `${sheetName}!A1:Z1000`,
      });

      return response.data.values || [];
    } catch (error) {
      console.error(`Error retrieving data from ${sheetName}:`, error);
      return [];
    }
  }

  // function for cron, for sync data from spreadsheet with local db
  async processAndCreateProducts() {
    console.log("start sync process");
    const data = await this.get();

    try {
      for (const sheetName in data) {
        const rows = data[sheetName];
        for (const row of rows) {
          const articleNumber = +row["Код товару"];
          console.log({ articleNumber });

          const existingProduct = await LocalDbService.getByArticleNumber(
            articleNumber
          );

          if (!existingProduct) {
            console.log("creating product");
            await LocalDbService.create(row);
          } else {
            console.log("product exists");
            const existingSizes = JSON.parse(existingProduct.sizes);
            const newSizes = formatSizes(row);
            const mergedSizes = { ...existingSizes, ...JSON.parse(newSizes) };
            console.log({ mergedSizes });

            if (JSON.stringify(existingSizes) !== JSON.stringify(mergedSizes)) {
              await LocalDbService.updateSizes(
                articleNumber,
                JSON.stringify(mergedSizes)
              );
              console.log(`Sizes updated for product ${articleNumber}`);
            }
          }
        }
      }
      console.log("Products created successfully!");
    } catch (error) {
      console.error("Error creating products:", error);
    }
  }
}

module.exports = new SpreadsheetsService();

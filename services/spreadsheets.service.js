const { google } = require("googleapis");
const LocalDbService = require("./localdb.service");

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
        const formattedData = this.formatData(rows);

        allData[sheetName] = formattedData;
      }

      await this.processAndCreateProducts(allData);
      console.log("Formatted data for all sheets");
      return allData;
    } catch (error) {
      console.error("Error retrieving data:", error);
      return {};
    }
  }

  formatData(rows) {
    const length = Object.keys(rows[0]).length;
    const formattedData = [];

    // iterate through columns starting from B
    for (let col = 1; col < length; col++) {
      const columnData = {};

      // iterate through rows and assign values using column A as keys
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const keyWithoutSpaces = row[0].trim();
        columnData[keyWithoutSpaces] = row[col];
      }

      formattedData.push(columnData);
    }

    return formattedData;
  }

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

  async processAndCreateProducts(allData) {
    try {
      for (const sheetName in allData) {
        const rows = allData[sheetName];
        for (const row of rows) {
          // extract brand and model from name field
          const modelNameMatches = row["Імя"].match(/Nike|Adidas/gi);
          const brand = modelNameMatches ? modelNameMatches[0] : "";
          const model = row["Імя"].replace(new RegExp(brand, "gi"), "").trim();

          const product = {
            model: model,
            articleNumber: row["Код товару"] || Math.ceil(Math.random() * 1000),
            name: row["Імя"],
            price: parseFloat(row["Ціна"]),
            sizes: this.formatSizes(row),
            category: "",
            subcategory: "",
            brand: brand,
            productModel: model,
          };

          await LocalDbService.create(product);
        }
      }
      console.log("Products created successfully!");
    } catch (error) {
      console.error("Error creating products:", error);
    }
  }

  formatSizes(obj) {
    const sizes = {};

    for (const key in obj) {
      if (typeof key === "string" && !isNaN(parseInt(key))) {
        obj[key] !== undefined && obj[key] !== ""
          ? (sizes[key] = true)
          : (sizes[key] = false);
      }
    }

    return JSON.stringify(sizes);
  }
}

module.exports = new SpreadsheetsService();

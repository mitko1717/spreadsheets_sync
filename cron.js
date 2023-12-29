const cron = require("node-cron");
const SpreadsheetsService = require("./services/spreadsheets.service");

// cron.schedule("0 * * * *", async () => {
//   try {
//     await SpreadsheetsService.processAndCreateProducts();
//     console.log("Cron job executed successfully!");
//   } catch (error) {
//     console.error("Error in cron job:", error);
//   }
// });

const test = async () => {
  await SpreadsheetsService.processAndCreateProducts();
  console.log("test executed successfully!");
};

test();

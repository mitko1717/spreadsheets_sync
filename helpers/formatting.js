const formatData = (rows) => {
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
};

const formatSizes = (obj) => {
  const sizes = {};

  for (const key in obj) {
    if (typeof key === "string" && !isNaN(parseInt(key))) {
      obj[key] !== undefined && obj[key] !== ""
        ? (sizes[key] = true)
        : (sizes[key] = false);
    }
  }

  return JSON.stringify(sizes);
};

module.exports = { formatData, formatSizes };

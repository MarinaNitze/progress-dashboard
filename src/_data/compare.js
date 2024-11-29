const fs = require('fs');
const { parse } = require('csv-parse');

async function importCSV(filePath) {
  let csvData = [];

  fs.createReadStream(filePath)
    .pipe(parse({ 
      columns: true, // Uses first row as headers
      skip_empty_lines: true 
    }))
    .on('data', (data) => csvData.push(data))
    .on('end', () => {
      console.log(csvData); // Output the array of JSON objects
    })
    .on('error', (error) => {
      console.error(error.message); 
    });

  return csvData;
}

module.exports = async () => {
  let allDatasets = {};

  try {
    const awData = await importCSV('src/_data/aw.csv');
    allDatasets['AW'] = awData;

    const statesData = await importCSV('src/_data/states.csv');
    allDatasets['States'] = statesData;

    const practicesData = await importCSV('src/_data/practices.csv');
    allDatasets['Practices'] = practicesData;

    const practicesCACountiesData = await importCSV('src/_data/practices_ca_counties.csv');
    allDatasets['Practices - CA Counties'] = practicesCACountiesData;

    const caCountiesData = await importCSV('src/_data/ca_counties.csv');
    allDatasets['CA Counties'] = caCountiesData;

    return allDatasets;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to load data');
  }
};
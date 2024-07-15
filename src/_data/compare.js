require('dotenv').config();

const Airtable = require('airtable');

let base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);

module.exports = async () => {
  let allDatasets = {};

  try {
    const awData = await base.table('AW').select().all();
    allDatasets['AW'] = awData;

    const statesData = await base.table('States').select().all();
    allDatasets['States'] = statesData;

    const practicesData = await base.table('Practices').select().all();
    allDatasets['Practices'] = practicesData;

    const practicesCACountiesData = await base.table('Practices - CA Counties').select().all();
    allDatasets['Practices - CA Counties'] = practicesCACountiesData;

    const caCountiesData = await base.table('CA Counties').select().all();
    allDatasets['CA Counties'] = caCountiesData;

    return allDatasets;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch data from Airtable');
  }
};
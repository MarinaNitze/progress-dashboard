require('dotenv').config();

const Airtable = require('airtable');

let base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(process.env.AIRTABLE_BASE_ID);
console.log(base);

module.exports = () => {
  /*
  return new Promise((resolve, reject) => {
    let allDatasets = [];
    
    base.table('AW').select().all().then((result) => {
      console.log(result);
    });

    base.table('States').select().all().then((result) => {
      console.log(result);
    });

    base.table('Practices').select().all().then((result) => {
      console.log(result);
    });

    base.table('Practices - CA Counties').select().all().then((result) => {
      console.log(result);
    });

    base.table('CA Counties').select().all().then((result) => {
      console.log(result);
    });
  });
  */
};
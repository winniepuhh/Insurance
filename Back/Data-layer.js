const sql = require('mssql');
const configs = require('./configs');

const pool = new sql.ConnectionPool(configs.dbConfig);
const poolConnect = pool.connect();

const executeQuery = async (query) => {
  await poolConnect;
  try {
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { executeQuery };

const { Pool, Client } = require("pg");
const connectionString =
  "postgres://amorindia:AmorIndia123@amor.c1jojmbr9vbp.us-east-1.rds.amazonaws.com:5432/postgres";

module.exports = {
  connectToDatabase: async function() {
    const client = new Client({
      connectionString
    });
    await client.connect();
    return client;
  },
  getAllCategories: async function(client) {
    const retval = await client.query("SELECT * FROM CATEGORIES;");
    return retval.rows;
  }
};

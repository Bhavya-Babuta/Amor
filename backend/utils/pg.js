const { Client } = require("pg");
const connectionString = process.env.POSTGRES_URI;

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

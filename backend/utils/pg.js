const { Client } = require("pg");
const connectionString = process.env.POSTGRES_URI;

module.exports = {
  connectToDatabase: async function () {
    const client = new Client({
      connectionString,
    });
    await client.connect();
    return client;
  },

  getAllCategories: async function (client) {
    const retval = await client.query("SELECT * FROM CATEGORIES;");
    return retval.rows;
  },

  getFeaturedProducts: async function (client) {
    const retval = await client.query(
      "SELECT * FROM PRODUCTS WHERE FEATURED=1;"
    );
    return retval.rows;
  },
  getCategoryProducts: async function (client, category) {
    const retval = await client.query(
      `SELECT * FROM PRODUCTS WHERE CATEGORY='${category}';`
    );
    return retval.rows;
  },
};

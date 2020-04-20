"use strict";
var response = require("./utils/response.js");
const dbHelper = require("./utils/pg.js");
const { getBannerImages } = require("./utils/s3");
const { orders_all } = require("./data");

module.exports.products = async (event) => {
  try {
    let featured = null;
    let category = null;

    if (event && event.queryStringParameters) {
      if (event.queryStringParameters.featured) {
        featured = Number(event.queryStringParameters.featured);
      }
    }
    if (event && event.queryStringParameters) {
      if (event.queryStringParameters.category) {
        category = event.queryStringParameters.category;
      }
    }
    let retval = [];
    const client = await dbHelper.connectToDatabase();
    if (category) {
      retval = await dbHelper.getCategoryProducts(client, category);
    }
    if (featured && featured === 1) {
      retval = await dbHelper.getFeaturedProducts(client);
    }
    return response.success({
      data: retval,
    });
  } catch (error) {
    return response.failure({ error: error.message });
  }
};

module.exports.categories = async (event, context, callback) => {
  try {
    const categories = await dbHelper
      .connectToDatabase()
      .then(async (client) => await dbHelper.getAllCategories(client));
    return response.success({ data: { categories } });
  } catch (error) {
    return response.failure({ error: error.message });
  }
};

module.exports.homeBanner = async (event, context, callback) => {
  try {
    const retval = await getBannerImages();
    return response.success({ data: { retval } });
  } catch (error) {
    return response.failure({ error: error.message });
  }
};

module.exports.previousOrders = async (event, context, callback) => {
  const orderId =
    (event.queryStringParameters && event.queryStringParameters.orderId) ||
    null;
  return response.success({
    data: orders_all,
  });
};

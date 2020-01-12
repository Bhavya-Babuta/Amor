"use strict";
var response = require("./utils/response.js");
const dbHelper = require("./utils/pg.js");
const uuid = require("uuid/v4");

const availableSizes = ["S", "M", "L", "XL"];
const price = 500;
const desc = "High Quality Tie.";
const { products_all } = require("./data");
const { getSignedUrl } = require("./utils/s3");

module.exports.products = async event => {
  let filterBy = null;
  if (event && event.queryStringParameters) {
    if (event.queryStringParameters.filterBy) {
      filterBy = event.queryStringParameters.filterBy;
    }
  }
  console.log("FilterBy: ", filterBy);
  let retval = [];
  if (filterBy !== "featured") {
    for (const element of products_all) {
      console.log("Element: ", element);
      if (element.category === filterBy) {
        element.availableSizes = availableSizes;
        element.id = uuid();
        element.price = price;
        element.desc = desc;
        retval.push(element);
      }
    }
  } else if (filterBy === "featured") {
    for (const element of products_all) {
      console.log("Element: ", element);

      if (element.featured) {
        element.availableSizes = availableSizes;
        element.id = uuid();
        element.price = price;
        element.desc = desc;
        retval.push(element);
      }
    }
  }
  return response.success({
    data: retval
  });
};

module.exports.categories = async (event, context, callback) => {
  const url = await getSignedUrl("11.jpg");
  const categories = await dbHelper
    .connectToDatabase()
    .then(async client => await dbHelper.getAllCategories(client));
  return response.success({ data: { categories } });
};

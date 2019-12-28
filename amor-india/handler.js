"use strict";
var response = require("./utils/response.js");
const dbHelper = require("./utils/pg.js");

module.exports.products_all = async event => {
  const products_all = [
    {
      name: "Tie",
      desc: "High Quality Tie.",
      item_price: 1500,
      item_discount: 0,
      item_stock_quantity: 54
    },
    {
      name: "Suit",
      desc: "High Quality Tie.",
      item_price: 11500,
      item_discount: 1000,
      item_stock_quantity: 5
    },
    {
      name: "Socks",
      desc: "High Quality Tie.",
      item_price: 100,
      item_discount: 0,
      item_stock_quantity: 4
    },
    {
      name: "Sneakers",
      desc: "High Quality Tie.",
      item_price: 2999,
      item_discount: 0,
      item_stock_quantity: 92
    },
    {
      name: "Boxers",
      desc: "High Quality Tie.",
      item_price: 15500,
      item_discount: 1000,
      item_stock_quantity: 1154
    }
  ];
  return response.success({
    data: products_all
  });
};

module.exports.categories_all = async (event, context, callback) => {
  const client = await dbHelper.connectToDatabase();
  const categories = await dbHelper.getAllCategories(client);
  return response.success({ data: { categories } });
};

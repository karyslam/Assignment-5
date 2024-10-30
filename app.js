var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const hbs = require("hbs");
require("dotenv").config();
const { createConnection } = require("mysql2/promise");

var app = express();

let connection;

async function main() {
  connection = await createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
  });

  // view engine setup
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "hbs");

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  app.get("/", async function (req, res, next) {
    const { name, category } = req.query;

    if (name || category) {
      let [products] = await connection.execute(
        "SELECT * FROM Products JOIN Categories WHERE Products.category_id=Categories.category_id AND Products.name LIKE ? AND Products.category_id = ?;",
        ["%" + name + "%", category]
      );
      res.render("index", { products });
    } else {
      let [products] = await connection.execute(
        "SELECT * FROM Products JOIN Categories WHERE Products.category_id=Categories.category_id;"
      );
      res.render("index", { products });
    }
  });

  app.get("/products/create", async function (req, res, next) {
    let [categories] = await connection.execute("SELECT * FROM Categories;");

    res.render("create", { categories });
  });

  app.get("/products/:id", async function (req, res, next) {
    let [products] = await connection.execute(
      "SELECT * FROM Products JOIN Categories WHERE Products.category_id=Categories.category_id AND Products.product_id= ?;",
      [req.params.id]
    );

    res.render("single", { product: products[0] });
  });

  app.post("/products/create", async function (req, res, next) {
    let { productName, productDescription, productCategory } = req.body;
    let query =
      "INSERT INTO Products (name,description,category_id) VALUES (?, ?, ?)";
    let bindings = [productName, productDescription, productCategory];
    let [result] = await connection.execute(query, bindings);

    res.redirect("/");
  });

  app.get("/products/:id/edit", async function (req, res, next) {
    let [products] = await connection.execute(
      "SELECT * FROM Products JOIN Categories WHERE Products.category_id=Categories.category_id AND Products.product_id= ?;",
      [req.params.id]
    );

    let [categories] = await connection.execute("SELECT * FROM Categories;");

    let selectedCategory = categories.filter(
      (x) => x.category_id == products[0].category_id
    )[0];
    categories = categories.filter(
      (x) => x.category_id != products[0].category_id
    );

    console.log(products[0]);

    res.render("edit", { product: products[0], categories, selectedCategory });
  });

  app.post("/products/:id/edit", async function (req, res, next) {
    console.log(req.body);

    let { productName, productDescription, productCategory } = req.body;
    let query =
      "UPDATE Products SET name=?, description=?, category_id=? WHERE product_id=?";
    let bindings = [
      productName,
      productDescription,
      productCategory,
      req.params.id,
    ];
    await connection.execute(query, bindings);

    res.redirect("/products/" + req.params.id);
  });

  app.get("/products/:id/delete", async function (req, res, next) {
    let [products] = await connection.execute(
      "SELECT * FROM Products JOIN Categories WHERE Products.category_id=Categories.category_id AND Products.product_id= ?;",
      [req.params.id]
    );

    res.render("delete", { product: products[0] });
  });

  app.post("/products/:id/delete", async function (req, res, next) {
    await connection.execute('DELETE FROM Products WHERE product_id = ?', [req.params.id]);

    res.redirect("/");
  });

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });
}

main();

module.exports = app;

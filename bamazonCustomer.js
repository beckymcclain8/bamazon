var mysql = require("mysql");
var inquirer = require("inquirer");
var stock;
var quantityNeeded;
var id;

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Myh2kw2htkw2ft",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  itemsForSale();
  //this is to update my quantity for testing purposes
  // updateQuantity();
});

function itemsForSale() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    else {
      console.log("Items for Sale:");
      for (var i = 0; i < res.length; i++) {
        console.log(
          res[i].id + ". " + res[i].product_name + " | $" + res[i].price
        );
      }
      console.log("-------------------------------------------------");
      promptUser();
    }
  });
}

function promptUser() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What item number would you like to buy?",
        name: "item"
      },
      {
        type: "input",
        message: "How many would you like to buy?",
        name: "quantity"
      }
    ])
    .then(function(answer) {
      connection.query(
        "SELECT stock_quantity FROM products WHERE ? ",
        {
          id: answer.item
        },
        function(err, res) {
          if (err) throw err;
          stock = (res[0].stock_quantity);
          quantityNeeded = parseInt(answer.quantity);
          id = answer.item;

          console.log(
            "how many items in stock: " +
              stock +
              "\nHow many they need: " +
              quantityNeeded
          );
          console.log(quantityNeeded);
          if (quantityNeeded < stock) {
            console.log("place order");
            updateProduct();
            customerTotal();
          } else {
            console.log("I'm sorry, this item is out of stock.");
          }
        }
      );
      // connection.end();
    });
}

function updateProduct() {
  var update = stock - quantityNeeded;
  console.log(update);
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: update
      },
      {
        id: id
      }
    ],
    function(err, results) {
      if (err) throw err;
      //comment this out later
      console.log("updated sql");
    }
  );
}

function customerTotal() {
  connection.query(
    "SELECT price FROM products WHERE ? ",
    {
      id: id
    },
    function(err, res) {
      if (err) throw err;
      var price = res[0].price;
      var total = price * quantityNeeded;
      console.log("Your total is: $" + total);
    }
  );
}

function updateQuantity() {
  var query = connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: 10
      },
      {
        id: 8
      }      
    ],
    function(err, res) {
      if (err) throw err;
      console.log(res.affectedRows + " rows updated!");
    }
  );
}
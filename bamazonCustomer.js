var mysql = require("mysql");
var inquirer = require("inquirer");
//variables needed to store information later
var stock;
var quantityNeeded;
var id;
var id2;

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
});

// Lists the Id, Items, and price of each item
function itemsForSale() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    else {
      console.log("Items for Sale:");
      // id2 is storing the highest id number which I will need later
      id2 = res.length;
      console.log(id2);
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
        name: "item",
        validate: function(itemNum) {
          //this makes sure the user inputs a number that less than or equal to the largest id number.
          if (isNaN(itemNum) === true || itemNum >= id2) {
            console.log("\nYou must enter an item number.");
          } else {
            return true;
          }
        }
      },
      {
        type: "input",
        message: "How many would you like to buy?",
        name: "quantity",
        validate: function(quant) {
          // This makes sure the user inputs a number
          if (isNaN(quant) === true) {
            console.log("\nYou must enter a number.");
          } else {
            return true;
          }
        }
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
          // stock refers to how many items are in stock in the mysql database
          stock = (res[0].stock_quantity);
          // quantityNeeded refers to how many items the user wants to purchase
          quantityNeeded = parseInt(answer.quantity);
          // id refers to the item number of the product the user wants to purchase
          id = answer.item;
          if (quantityNeeded < stock) {
            console.log("Your order has been placed!");
            updateProduct();
            customerTotal();
            connection.end();
          } else {
            console.log("I'm sorry, this item is out of stock.");
            backToMenu();
          }
        }
      );
     });
}

function updateProduct() {
  var update = stock - quantityNeeded;
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

// This prompts the user to see if they would like to see the list of products again.  It ends the connection if they say no.
function backToMenu() {
  console.log("-------------------------------------------------");
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to see the list of products again?",
        name: "menu",
        choices: ["yes", "no"]
      }
    ])
    .then(function(answer) {
      if (answer.menu === "yes") {
        itemsForSale();
      } else {
        connection.end();
      }
    });
}
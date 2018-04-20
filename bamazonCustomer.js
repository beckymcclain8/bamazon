var mysql = require("mysql");
var inquirer = require("inquirer");
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
  // promptUser();
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
      // I think I'm having an issue because I have an async function inside another one... (or somehting like that)
      // await?
      connection.query(
        "SELECT stock_quantity FROM products WHERE ? ",
        {
          id: answer.item
        },
        function(err, res) {
            if (err) throw err;
            console.log(answer.item);
          console.log(res);
          // console.log(res.item + ", " + res.quantity)
          if (answer.quantity < res) {
            console.log("place order");
            //update mysql
            updateProduct(res, answer.quantity, answer.item);
            //console.log(customer's total)
            customerTotal(answer.item, answer.quantity);
          } else {
            console.log("I'm sorry, this item is out of stock.");
          }
        }
      );
      connection.end();
    });

  function updateProduct(stock_quantity, num, id) {
    var update = parseFloat(stock_quantity) - parseFloat(num);
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
}

function customerTotal(id, quantity) {
  connection.query(
    "SELECT price FROM products WHERE id = ? ",
    {
      id: id
    },
    function(err, res) {
      if (err) throw err;
      var price = parseFloat(res);
      var total = price * parseFloat(quantity);
      console.log("Your total is: $" + total);
    }
  );
}

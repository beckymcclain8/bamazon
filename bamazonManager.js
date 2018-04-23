var mysql = require("mysql");
var inquirer = require("inquirer");

var lowItemArray = [];

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Myh2kw2htkw2ft",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    menuOptions();
  });

  function menuOptions(){
    inquirer.prompt([
        {
            type: "list",
            message: "Choose an option below",
            name: "options",
            choices: ["View products for sale", "View Low Inventory", "Add to inventory", "Add new product"]
        }
    ])
    .then(function(answer) {
        // console.log(answer.options);
        
        switch(answer.options) {
            
            case "View products for sale":
                productList();
                break;

            case "View Low Inventory":
                lowInventory();
                break;

            case "Add to inventory":
                addToInventory();
                break;

            case "Add new product":
                addNewProduct();
                break;
        }
    })
  }

  function productList() {
      connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        else {
          console.log("Product List:");
          for (var i = 0; i < res.length; i++) {
            console.log(
              res[i].id + ". " + res[i].product_name + " | $" + res[i].price + " | Quantity: " + res[i].stock_quantity
            );
          }
          console.log("-------------------------------------------------");
        }
      });
  }

  function lowInventory(callback) {
    connection.query("SELECT id, product_name FROM products GROUP BY stock_quantity HAVING COUNT(*) <= 5", function(err, res){
        if (err) throw err;
        else if (res){
            console.log("The following products have less than 5 items left in inventory:");
            for (var i = 0; i < res.length; i++) {
                console.log("id: " + res[i].id + " | " + res[i].product_name);
                lowItemArray.push(res[i].id);
            }
        addToInventory();
        } else {
            console.log("All products are well stocked with 5 or more items.");
        }
    });
}

function addToInventory() {
    inquirer.prompt([
        {
            type: "list",
            message: "Would you like to add more inventory?",
            name: "inventory",
            choices: ["yes", "no"]
        }
    ])
    .then(function(answer) {
        if (answer.inventory === "yes") {
            lowInventory(updateQuantity);
        } else {
            menuOptions();
        }
    })
}

function addNewProduct() {
    inquirer.prompt([
        {
            type: "input",
            message: "What product would you like to add?",
            name: "product",
            validate: function(value) {
                // console.log(value);
                if (value) {
                    return true;
                } else {
                console.log("Please enter a new product.");
                // addNewProduct();
                }
            }
        },
        {
            type: "list",
            message: "What department does this item belong in?",
            name: "dept",
            choices: ["Toys", "Books", "Electronics", "Other"]
        },
        {
            type: "input",
            message: "How much does this item cost?",
            name: "cost",
            validate: function(newPrice) {
                // console.log(typeof parseInt(newPrice));
                if (isNaN(newPrice) === true) {
                    console.log("\nYou must enter a number for the price.");
                    // addNewProduct();
                } else {
                    return true;
                }
            }
        }
    ]).then(function(answers) {
        if (answers.dept != "Other") {
            connection.query("INSERT INTO products SET ?",
            {
                product_name: answers.product,
                department_name: answers.dept,
                price: answers.cost,
                stock_quantity: 10
            }, function(err, res) {
                if (err) throw err;
                console.log("New product (" + answers.product + ") added!");
            }
        );
        } else {
            inquirer.prompt([
                {
                    type: "input",
                    message: "Please type in the new department name.",
                    name: "newDept",
                    validate: function(value) {
                        // console.log(value);
                        if (value) {
                            return true;
                        } else {
                        console.log("You must enter a new department name.");
                        // addNewProduct();
                        }
                    }
                }
            ]).then(function(ans) {
                connection.query("INSERT INTO products SET ?",
                {
                    product_name: answers.product,
                    department_name: ans.newDept,
                    price: answers.cost,
                    stock_quantity: 10
                }, function(err, res) {
                    if (err) throw err;
                    console.log("New product (" + answers.product + ") added!");
                }
            );
            connection.end();
            })
        }
    })
}

function updateQuantity() {

    for (var i= 0; i < lowItemArray.length; i++){
    var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
        {
          stock_quantity: 10
        },
        {
          id: lowItemArray[i]
        }      
      ],
      function(err, res) {
        if (err) throw err;
        console.log("Inventory updated!");
      }
        );
}
  }
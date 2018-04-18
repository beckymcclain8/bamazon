var mysql = require('mysql');
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: "Myh2kw2htkw2ft",
    database: 'bamazon'
});
  
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    itemsForSale();
    promptUser();
});

function itemsForSale() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        else {
            console.log("Items for Sale:")
            for (var i = 0; i < res.length; i++) {
                console.log(res[i].id + ". " + res[i].product_name + " | $" + res[i].price);
            }
            console.log("-------------------------------------------------");
        }
    });
    promptUser();
}

function promptUser() {
    inquirer.prompt([
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
    
    .then(function(results) {
        // console.log(res.item + ", " + res.quantity)
        if (results.quantity < res[results.name].quantity) {
            
        }
    });
}
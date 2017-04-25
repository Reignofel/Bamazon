//required NPMs
var mysql = require("mysql");
var inquirer = require("inquirer");

//connection to mySQL database
var hostConnection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "Bamazon"
});

//check for connection
hostConnection.connect(function(err) {
  if (err) throw err;
  console.log("Welcome to Bamazon! Here is our inventory: ");  
});

//display products table
hostConnection.query('SELECT * FROM products' , function (err, res) {
    if(err)
        throw err;
    else {
        for(var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + "\n  Price: " + res[i].price + "\n  In Stock: " + res[i].stock_quantity);
        }
    customerBuy();  
    }
})

//function to ask user what they want to purchase
var customerBuy = function () {
    inquirer.prompt([
        {
            name: "product",
            message: "What is the item number you would like to purchase?"
        },
        {
            name: "quantity",
            message: "How many would you like to buy?"
        }
    ]).then(function(answers){
        var id = answers.product;
        var amount = answers.quantity;
        updateQuantity(id, amount);
    })
}

var updateQuantity = function(item, number) {
    connection.query('SELECT stock_quantity FROM products WHERE item_id = ?', [item], function (err, res) {
        if(err)
            throw err;
        else {
            if(number < res[0].stock_quantity) {
                var newQuantity = (res[0].stock_quantity) - number;

                //update values in table
                connection.query('UPDATE products SET ? WHERE item_id = ?', [{stock_quantity: newQuantity} ,item], function(){
                    console.log("Here are your items, GET OUTTA HERE!");
                });
            }
            else {
                console.log("We dont have that amount..");
                customerBuy();
            }   
        }
    })
}
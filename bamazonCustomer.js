var mysql = require("mysql");
var inquirer = require("inquirer")
var data;
var checkout;
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,
  user: "root",
  password: "Ar1647347",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  queryProducts();
});


function queryProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    for (var i = 0; i < res.length; i++) {

      if (res[i].item_id < 10) {
        console.log("ID: " + res[i].item_id + "  | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price);

      } else {
        console.log("ID: " + res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price);
      }
    }
    console.log("\n-------------------------------------------------------------\n");
    data = res;
    promptCustomer();
    // console.log(data)
  });
  //connection.end();
};


function promptCustomer() {
  inquirer.prompt([
    {
      name: "item",
      message: "What product ID would you like to buy? "
    },
    {
      name: "quantity",
      message: "How many units of this product would you like to buy? "
    }
  ]).then(function (answers) {
    var i = answers.item - 1;
    var newInvetoryInput = data[i].product_quantity - parseInt(answers.quantity);
    
    checkout = parseInt(answers.quantity) * data[i].price;
    if (answers.quantity > data[i].product_quantity) {
      console.log("Insufficient quantity! There are " + data[i].product_quantity + " units left in stock.");
      promptCustomer();
    } else {
      ;
      console.log("\n-------------------------------------------------------------\n");
      console.log("That will be a total of: $" + checkout);
      console.log("\n");
      console.log("This item now has " + newInvetoryInput + " units left in stock.");
      console.log("\n-------------------------------------------------------------\n");
      updateProduct(newInvetoryInput, answers.item)
      
    };

  });
};

function nextProduct() {
  inquirer.prompt([
    {
      type: "confirm",
      message: "Would you like to buy another product? ",
      name: "confirm",
    }
  ]).then(function (question) {
    if (question.confirm === true) {
      console.log("\n-------------------------------------------------------------\n");
      console.log("OK! Choose another ID!");
      console.log("\n");
      promptCustomer();
    } else {
      console.log("\n================================================\n");
      console.log("Your Checkout Total is $" + checkout + "\nCome back soon!");
      console.log("\n================================================\n");
      connection.end();
    }
  });
  
};


function updateProduct(newInventory, id) {
  var query = connection.query(
      "UPDATE products SET ? WHERE ?",
      [
          {
              product_quantity: newInventory
          },
          {
              item_id: id
          }
      ],
      function (err, res) {
          nextProduct();
      }
  );
};





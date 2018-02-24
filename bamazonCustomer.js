var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;

  // run the start function after the connection is made to prompt the user
  start();
});

function start () {
	connection.query("SELECT * FROM products", function(err, results) {
		if (err) throw err;

		// var table = new Table({
		// 	head: ["ID", "Product Name", "Department", "Price", "Stock Quantity"]
		// });

		// for (var i = 0; i<results.lenght; i++) {
		// 	table.push([results[i].id, results[i].productName, results[i].departmentName, results[i].price, results[i].stockQuantity]);
		// }
		// console.log(table.toString());

		for(var i=0; i<results.length; i++){
			console.log("ID: " + results[i].id + " || Product Name: " + results[i].productName + " || Department Name: " + results[i].departmentName + " || Price($): " + results[i].price + " || Stock Quantity: " + results[i].stockQuantity + "\n");
		}
		askUser (results);

	});
};

function askUser(results){

	inquirer.prompt([
	{
		name: "id",
		type: "input",
		message: "What product do you want to buy (enter an ID #)?",
		validate: function(value) {
			if (isNaN(value) === false){
				return true;
			}else {
				return false;
			}
		}
	},
	{
		name: "units",
		type: "input",
		message: "How many units do you want?",
		validate: function(value) {
			if (isNaN(value) === false){
				return true;
			}else {
				return false;
			}
		}
	}]).then(function(answer) {
		var chosenId = answer.id -1;
		var chosenProduct = results[chosenId];
		var chosenUnits = answer.units;

		if (chosenUnits < results[chosenId].stockQuantity) {
			
		var newQuantity = results[chosenId].stockQuantity - chosenUnits;
		connection.query("UPDATE products SET ? WHERE ?",
				[
				{
					stockQuantity: newQuantity
				},
				{
					id: results[chosenId].id
				}
				],
				);	console.log("Your total is: $" + parseFloat(chosenUnits)*parseFloat(results[chosenId].price));
					askUser();


		} 
		else {
			console.log("Insufficient quantity!");
			askUser();
		}
		
	});
};
	

var mariadb = require('mysql');
var mariaUtilities = require('./maria-utilities.js');

var connection = mariadb.createConnection({
    host:     'localhost',
    user:     'root',
    password: '',
    database: 'maria'
});

mariaUtilities.introspection(connection);
mariaUtilities.upgrade(connection);
connection.connect();

// Testing the MariaDB upgrade Functionality 
connection.queryRow('select from users where id = ?', 3, function (err, results) {
    console.log(results);
    console.log(err);
});

 connection.queryCol('select name from users where age > ?', 17, function (err, results) {
    console.log(results);
});

connection.queryValue('select max(age) from users', [], function (err, results) {
    console.log(results);
});

connection.queryHash("select * from users where surname like '%a%'", [], function (err, results) {
    console.log(results);
});

connection.queryKeyValue('select name, age from users where age > ?', 20, function (err, results) {
    console.log(results);
});

console.log(connection.where({
    id: 5,
    year: ">2010",
    price: "100..200",
    level: "<=3",
    sn: "str?",
    label: "str",
    code: "!(1,2,4,10,11)"
}));

connection.select("notable",["name","surname"], {age: ">=18"}, {name:'desc'}, function (err, results) {
    console.log(err);
});

connection.insert("users",{id: "7", name: "Kanye", surname: "Cliv", age: "21"},function (err, results) {
    console.log(results);
});

connection.update("users",{name: "Sanches", surname: "Cast"},  {id: "7"}, function (err, results) {
    console.log(results);
    //console.log(err);
});

connection.upsert("users",{id: "8", name: "Sanches", surname: "True", age: "22"}, function (err, results) {
    console.log(results);
});

connection.delete("users",{id: "8"}, function (err, results) {
    console.log(results);
});

connection.count("users",function (err, results) {
    console.log(results);
});
// Testing the MariaDB upgrade Join Functionality 
connection.innerJoin(['users', 'students'], ['id', 'id'], {users: { age: "<20"}, students: {id: "<6"}}, function (err, results) {
    console.log(results);
});

// Testing the MariaDB introspection Functionality 
connection.primary('users', function (err, results) {
    console.log(results);
});

connection.foreign('users', function (err, results) {
    console.log(results);
});

connection.fields('students', function (err, results) {
    console.log(results);
});

connection.databases(function (err, results) {
    console.log(results);
});

connection.databaseTables('maria', function (err, results) {
    console.log(results);
});

connection.tableInfo('users', function (err, results) {
    console.log(results);
});

connection.users(function (err, results) {
    console.log(results);
});
connection.end();
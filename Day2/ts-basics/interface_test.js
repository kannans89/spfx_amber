var customers = [
    { id: 1, firstName: "John", lastName: "Doe" },
    { id: 3, firstName: "Amber", lastName: "USA" },
    { id: 2, firstName: "Jane", lastName: "Doe", location: "USA" }
];
printDetails(customers);
function printDetails(customers) {
    for (var c in customers) { //index
        console.log(c);
    }
    for (var _i = 0, customers_1 = customers; _i < customers_1.length; _i++) { //value
        var c = customers_1[_i];
        console.log(c);
    }
}

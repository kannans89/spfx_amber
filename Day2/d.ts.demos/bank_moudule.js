var Bank = /** @class */ (function () {
    function Bank(name, location) {
        if (name === void 0) { name = "Citi"; }
        if (location === void 0) { location = "USA"; }
        this.name = name;
        this.location = location;
    }
    return Bank;
}());
export default Bank;
var Customer = /** @class */ (function () {
    function Customer(name) {
        if (name === void 0) { name = "Amber"; }
        this.name = name;
    }
    return Customer;
}());
export { Customer };
var Account = /** @class */ (function () {
    function Account(balance) {
        if (balance === void 0) { balance = 5000; }
        this.balance = balance;
    }
    return Account;
}());
export { Account };
export function sayHello(name) {
    return "hello ".concat(name);
}

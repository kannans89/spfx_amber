System.register([], function (exports_1, context_1) {
    "use strict";
    var Bank, Customer, Account;
    var __moduleName = context_1 && context_1.id;
    function sayHello(name) {
        return "hello ".concat(name);
    }
    exports_1("sayHello", sayHello);
    return {
        setters: [],
        execute: function () {
            Bank = /** @class */ (function () {
                function Bank(name, location) {
                    if (name === void 0) { name = "Citi"; }
                    if (location === void 0) { location = "USA"; }
                    this.name = name;
                    this.location = location;
                }
                return Bank;
            }());
            exports_1("default", Bank);
            Customer = /** @class */ (function () {
                function Customer(name) {
                    if (name === void 0) { name = "Amber"; }
                    this.name = name;
                }
                return Customer;
            }());
            exports_1("Customer", Customer);
            Account = /** @class */ (function () {
                function Account(balance) {
                    if (balance === void 0) { balance = 5000; }
                    this.balance = balance;
                }
                return Account;
            }());
            exports_1("Account", Account);
        }
    };
});

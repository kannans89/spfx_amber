"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bank_moudule_1 = require("./bank_moudule");
var bank = new bank_moudule_1.default();
console.log(bank);
var c = new bank_moudule_1.Customer();
console.log(c);
console.log((0, bank_moudule_1.sayHello)("Amber"));

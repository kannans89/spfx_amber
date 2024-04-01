export default class Bank {
    name: string;
    location: string;
    constructor(name?: string, location?: string);
}
export declare class Customer {
    name: string;
    constructor(name?: string);
}
export declare class Account {
    balance: number;
    constructor(balance?: number);
}
export declare function sayHello(name: string): string;

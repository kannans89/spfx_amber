
export default class Bank {

    constructor(public name="Citi",public location="USA"){

    }
}

export class Customer{
    constructor(public name="Amber"){}
}

export class Account{
    constructor(public balance=5000){

    }
}

export function sayHello(name:string){
    return `hello ${name}`;
}
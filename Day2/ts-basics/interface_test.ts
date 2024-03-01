interface ICutomer{
    id:number,
    firstName:string,
    lastName:string,
    location?:string
}

let customers:Array<ICutomer> = [
    {id:1,firstName:"John",lastName:"Doe"},
    {id:3,firstName:"Amber",lastName:"USA"},
    {id:2,firstName:"Jane",lastName:"Doe",location:"USA"}
];

printDetails(customers);

function printDetails(customers:ICutomer[]){
    
     for(let c in customers){ //index
        console.log(c);
     }

        for(let c of customers){ //value
            console.log(c.firstName);
        }
}

class StudentV1{

    name:string;
    cgpa:number;

    constructor(name:string="Anonymous",cgpa:number=0){
        this.name = name;
        this.cgpa = cgpa;
    }
}
let s1 = new StudentV1();
console.log(s1);
s1.cgpa = 7.5;
s1.name = "John";
console.log(s1);

class StudentV2{
    constructor(public name:string="Anonymous",public cgpa:number=0){}
}
console.log("StudentV2");
let s2 = new StudentV2();
console.log(s2);


class StudentV3{

     constructor(private name:string="Anonymous",private cgpa:number=0){

     }

     setUserName(name:string){
         this.name = name;
     }
        getUserName(){
            return this.name;
        }
}
console.log("StudentV3");
let s3 = new StudentV3();
s3.setUserName("Amber");
console.log(s3.getUserName());
console.log(s3);

//properties in typescript classes ,C# property syntax

class StudentV4{

     constructor(private name="Anonymous",private cgpa=0){

     }
     get UserName(){
         return this.name;
     }
     set UserName(name:string){
         this.name = name;
     }

     set Cgpa(cgpa:number){
         this.cgpa = cgpa;
     }
     get Cpga(){
         return this.cgpa;
     }
}

let s4=new StudentV4();
s4.UserName = "John";
s4.Cgpa = 7.5;
console.log(s4);
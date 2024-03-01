
class Student{

    
    getName(){
        return "Amber";
    }
}

function sayHello(name){
    return "Hello "+name+"!";
}
//module.exports = Student;
module.exports = {Student, sayHello};

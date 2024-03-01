
async function foo(){

    console.log("inside foo function");
    return 10;//async
}

function bar(){

    console.log("inside bar function");
    return new Promise((resolve,reject)=>resolve(20 ));//ayync
}


// foo().then(d=>console.log(d));
// bar().then(d=>console.log(d));

// console.log("end of scirpt")

async function test(){
 console.log("inside test")
 let barResult= await bar();
 console.log(barResult)
 let fooResult = await foo();
 console.log(fooResult)
 console.log("end of test function");//only after resolution of promise

}

test();
console.log("end")
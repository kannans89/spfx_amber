console.log("start of script " )
function getData(){
    return new Promise(function(resolve,reject){
     let no = Math.random()*10;//API calls
        if(no > 5){
            resolve("I keep my promise to you,Success");
        }
        else{
            reject("Sorry, I have failed to keep my promise");
        }



    });
  

}


getData()
   .then(function(resp){
          console.log("inside then block")
         console.log(resp);
   })
   .catch(function(err){
    console.log("inside catch block")
       console.log(err);
   })

console.log("end of script ")
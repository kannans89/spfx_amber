let userName:string,
    cgpa:number,
    isFemale:boolean,
    displayMsg:string;

userName = "Amber";
cgpa =  6.5;
isFemale = true;

displayMsg = `
               ========================
               Displaying Employee Info
               ========================
                Name: ${userName}
                CGPA: ${cgpa}
                gender is :${isFemale ?'FEMALE':'MALE'}
    
         `;

console.log(displayMsg);

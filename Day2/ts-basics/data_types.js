var userName, cgpa, isFemale, displayMsg;
userName = "Amber";
cgpa = 6.5;
isFemale = true;
displayMsg = "\n               ========================\n               Displaying Employee Info\n               ========================\n                Name: ".concat(userName, "\n                CGPA: ").concat(cgpa, "\n                gender is :").concat(isFemale ? 'FEMALE' : 'MALE', "\n    \n         ");
console.log(displayMsg);

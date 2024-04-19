import { NUsers } from "../controllers/types";
const patterns = {
        username: /^[a-z\d]{5,12}$/i,
        fullName: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
        password: /^[\d\w@-]{8,20}$/i,
        email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/
};


export enum regexErrorMassage {
    username = "Username must be between 5 to 12 characters and Have no special characters",
    fullName = "Invalid full name , there should be no special characters and numbers",
    password = "Password must be between 8 to 20 characters and Have no special characters except @ and -",
    email = "Please enter a valid email address,Format is not correct"
}


/*
* @description : This function will check the validation of the data provided by the user
* @param whatData : string
* @param typeOfData : NUsers.TRegexPatterns
* @returns boolean
*/
export const validationCheck = (whatData : string, typeOfData:NUsers.TRegexPatterns ): boolean =>{
  const regexPattern : RegExp = patterns[typeOfData];
  if (regexPattern.test(whatData)) {
    return true;
  }
  else{
    return false; 
  }
}
const isEmail = (email) => {
    const emailRegEx =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(emailRegEx)) return true;
    else return false;
  };
  
  const isEmpty = (str) => {
    if (str.trim() === "") return true;
    else return false;
  };
  
exports.validateSignupData = (data) =>  {
    let errors = {};
  
    //Email validation
    if (isEmpty(data.email)) {
      errors.email = "Must not be empty";
    } else if (!isEmail(data.email)) {
      errors.email = "Must be a valid email adress";
    }
  
    //Password validation
    if (isEmpty(data.password)) errors.password = "Must not be empty";
    if (data.password !== data.confirmPassword)
      errors.confirmPassword = "Passwords must match";
  
    //Handle validation
    if (isEmpty(data.handle)) errors.handle = "Must not be empty";
  

    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false,
    }
}

exports.validateLoginData = (data) => {
    
    let errors = {};
  
    if (isEmpty(data.email)) errors.email = "Must not be empty";
    if (isEmpty(data.password)) errors.password = "Must not be empty";
  
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false,
    }
  
}
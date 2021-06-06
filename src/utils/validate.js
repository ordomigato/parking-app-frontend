// Validate value and return true or false
const checkField = (value, name) => {
  switch (name) {
    case "firstName":
      return value === "" ? false : true;
    case "lastName":
      return value === "" ? false : true;
    case "email":
      const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return regexEmail.test(String(value).toLowerCase());
    case "defaultPhone":
      const regexPhone = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
      return regexPhone.test(value);
    case "vmodel":
      return value === "" ? false : true;
    case "vmake":
      return value === "" ? false : true;
    case "vcolor":
      return value === "" ? false : true;
    case "vplate":
      return value === "" ? false : true;
    case "location":
      return value.name === "" ? false : true;
    case "sublocation":
      return value.name === "" ? false : true;
    case "unit":
      return value === "" ? false : true;
    case "duration":
      return value === "" ? false : true;
    case "sublocationName":
      return value === "" ? false : true;
    default:
      return true;
  }
};

const checkAllFields = fields => {
  let result = true;
  for (const [key, value] of Object.entries(fields)) {
    const valid = checkField(value, key);
    if (valid === false) {
      result = false;
      break;
    }
  }

  return result;
};

export { checkField, checkAllFields };

function checkErrors(errors) {
  Object.keys(errors).forEach((key) => {
    const error = errors[key];
    Object.keys(error).forEach((errorKey) => {
      if (error[errorKey].valid) {
        delete error[errorKey];
      }
    });
    if (Object.keys(error).length === 0) {
      delete errors[key];
    }
  });

  return errors;
}

module.exports = {
  checkErrors,
};

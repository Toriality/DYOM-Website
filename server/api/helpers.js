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

  const errorsArray = Object.values(errors)
    .flatMap((obj) => Object.values(obj))
    .map((obj) => obj.msg);
  return errorsArray;
}

module.exports = {
  checkErrors,
};

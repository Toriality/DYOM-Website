// Must contain 3 to 20 characters or underscores
function isUsernameValid(username) {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

function isUsernameTaken(username) {
  return !!username;
}

function isUsernameForbidden(username) {
  return username === "admin";
}

// Must contain 8 characters or more and contains at least one digit
function isPasswordValid(password) {
  return /^(?=.*\d).{8,}$/.test(password);
}

// Checks for valid email (local@domain)
function isEmailValid(email) {
  return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function isEmailTaken(email, users) {
  return users.some((user) => user.email === email);
}

function isLocationValid(location) {
  return /^[a-zA-Z0-9_]{0,24}$/.test(location);
}

function isAboutMeValid(aboutMe) {
  return /^.{0,1000}$/.test(aboutMe);
}

module.exports = {
  isUsernameValid,
  isUsernameTaken,
  isUsernameForbidden,
  isPasswordValid,
  isEmailValid,
  isEmailTaken,
  isLocationValid,
  isAboutMeValid,
};

function getRandom(object) {
  let rand = Math.floor(Math.random() * object.length);
  return rand;
}

module.exports = {
  getRandom,
};
